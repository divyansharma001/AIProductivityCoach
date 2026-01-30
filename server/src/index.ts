import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { toNodeHandler } from "better-auth/node";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { auth } from "./lib/auth.js";
import { addLogJob } from "./lib/queue.js";
import "./workers/log.worker.js";
import { vectorService } from "./lib/qdrant.js"
import { aiService } from "./lib/gemini.js";
import { db } from "./db/index.js";
import { logEntry } from "./db/schema.js";

const app = express();
const PORT = process.env.PORT || 3000;

const FACT_HALF_LIFE_DAYS = Number(process.env.FACT_HALF_LIFE_DAYS || 45);
const FACT_SCORE_THRESHOLD = Number(process.env.FACT_SCORE_THRESHOLD || 0.12);
const FACT_LIMIT = Number(process.env.FACT_LIMIT || 6);

const STOPWORDS = new Set([
    "i","me","my","mine","myself","we","our","ours","ourselves","you","your","yours","yourself",
    "he","him","his","himself","she","her","hers","herself","they","them","their","theirs","themselves",
    "a","an","the","and","or","but","if","then","than","so","because","as","of","to","for","in","on",
    "at","by","from","with","about","into","over","after","before","between","during","without","within","up",
    "down","out","off","again","further","here","there","when","where","why","how","all","any","both","each",
    "few","more","most","other","some","such","no","nor","not","only","own","same","too","very","can","will",
    "just","should","now","user"
]);

const NEGATION_TOKENS = new Set(["not","don't","dont","do","doesn't","doesnt","didn't","didnt","never","no","avoid","avoids","avoiding","hate","hates","dislike","dislikes","struggle","struggles","struggling","can't","cant","won't","wont","prefer not"]);
const POSITIVE_TOKENS = new Set(["like","likes","enjoy","enjoys","prefer","prefers","love","loves","works","effective","best","better","energized","productive","focus","focused"]);

const parseTimestampMs = (timestamp?: string): number => {
    if (!timestamp) return 0;
    const ms = Date.parse(timestamp);
    return Number.isNaN(ms) ? 0 : ms;
};

const daysSince = (timestamp?: string): number => {
    const ms = parseTimestampMs(timestamp);
    if (!ms) return Number.MAX_SAFE_INTEGER;
    const diffMs = Date.now() - ms;
    return Math.max(0, diffMs / (1000 * 60 * 60 * 24));
};

const recencyWeight = (timestamp?: string): number => {
    const ageDays = daysSince(timestamp);
    if (!Number.isFinite(ageDays)) return 1;
    return Math.pow(0.5, ageDays / FACT_HALF_LIFE_DAYS);
};

const normalizeKey = (text: string): string => {
    const tokens = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .filter((token) => !STOPWORDS.has(token))
        .filter((token) => !NEGATION_TOKENS.has(token));

    return tokens.slice(0, 4).join(" ") || text.toLowerCase();
};

const polarityScore = (text: string): number => {
    const lower = text.toLowerCase();
    let positive = 0;
    let negative = 0;

    for (const token of POSITIVE_TOKENS) {
        if (lower.includes(token)) positive += 1;
    }
    for (const token of NEGATION_TOKENS) {
        if (lower.includes(token)) negative += 1;
    }

    if (positive === negative) return 0;
    return positive > negative ? 1 : -1;
};

const formatDateLabel = (timestamp?: string): string => {
    if (!timestamp) return "unknown date";
    const ms = parseTimestampMs(timestamp);
    if (!ms) return "unknown date";
    return new Date(ms).toISOString().split("T")[0];
};

const recencyLabel = (timestamp?: string): string => {
    const ageDays = daysSince(timestamp);
    if (ageDays <= 7) return "recent";
    if (ageDays <= 30) return "stable";
    return "old";
};

const toHeadersInit = (headers: Record<string, string | string[] | undefined>): HeadersInit => {
    const normalized: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
        if (typeof value === "string") {
            normalized[key] = value;
        } else if (Array.isArray(value)) {
            normalized[key] = value.join(",");
        }
    }
    return normalized;
};

app.use(helmet());

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});


app.post("/api/test-queue", async (req, res) => {
    const { text } = req.body;
    
    await addLogJob({
        userId: "test-user",
        text: text || "Test log entry",
        logId: "test-id"
    });

    res.json({ status: "queued", message: "Job added to queue" });
});


app.post("/api/test-ai", async (req, res) => {
    const { text } = req.body;
    try {
      
        const vector = await aiService.generateEmbedding(text);
        
        const chatResponse = await aiService.generateResponse(`Summarize this in 5 words: ${text}`);

        res.json({
            status: "success",
            vectorSize: vector.length, 
            aiResponse: chatResponse
        });
    } catch (error) {
        res.status(500).json({ error: "AI Service failed" });
    }
});



app.post("/api/logs", async (req, res) => {
    const session = await auth.api.getSession({
        headers: toHeadersInit(req.headers)
    });

    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const { content } = req.body;
    if (!content) {
        res.status(400).json({ error: "Content is required" });
        return;
    }

    const logId = uuidv4();
    const userId = session.user.id;

    try {
        await db.insert(logEntry).values({
            id: logId,
            userId: userId,
            content: content,
            status: "pending"
        });

        await addLogJob({
            logId,
            userId,
            text: content
        });

        res.json({ 
            success: true, 
            id: logId, 
            status: "queued",
            message: "Log saved and processing started" 
        });

    } catch (error) {
        console.error("Log creation error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/chat", async (req, res) => {
    const session = await auth.api.getSession({ headers: toHeadersInit(req.headers) });
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const { message } = req.body;
    if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
    }

    const userId = session.user.id;

    try {
        console.log(`[Chat] Processing: "${message}"`);
        
        const vector = await aiService.generateEmbedding(message);
        
        const [factResults, logResults, todaySummary] = await Promise.all([
            // A. Search Facts (Long Term Memory)
            vectorService.search(vectorService.FACTS_COLLECTION, vector, 5, userId),
            
            // B. Search Specific Logs (Episodic Memory)
            vectorService.search(vectorService.LOGS_COLLECTION, vector, 5, userId),

            // C. Get Today's Context (Working Memory)
            (async () => {
                const today = new Date().toISOString().split('T')[0];
                const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; 
                const summaryId = uuidv5(`${userId}_${today}`, NAMESPACE);
                return await vectorService.getPoint(vectorService.SUMMARIES_COLLECTION, summaryId);
            })()
        ]);

        // CONTEXT ENGINEERING (The "ACE" Layer)
        
        type FactEntry = {
            text: string;
            timestamp?: string;
            timestampMs: number;
            similarity: number;
            recency: number;
            combinedScore: number;
            key: string;
            polarity: number;
        };

        const factEntries: FactEntry[] = factResults.reduce<FactEntry[]>((acc, item) => {
            const text = item.payload?.text as string | undefined;
            if (!text) return acc;
            const timestamp = item.payload?.timestamp as string | undefined;
            const similarity = typeof item.score === "number" ? item.score : 0;
            const recency = recencyWeight(timestamp);
            const combinedScore = similarity * recency;
            acc.push({
                text,
                timestamp,
                timestampMs: parseTimestampMs(timestamp),
                similarity,
                recency,
                combinedScore,
                key: normalizeKey(text),
                polarity: polarityScore(text)
            });
            return acc;
        }, []);

        const filteredFacts = factEntries.filter((entry) => entry.combinedScore >= FACT_SCORE_THRESHOLD);

        const conflicts: string[] = [];
        const byKey = new Map<string, FactEntry>();
        const factsByRecency = [...filteredFacts].sort((a, b) => b.timestampMs - a.timestampMs);

        for (const entry of factsByRecency) {
            const existing = byKey.get(entry.key);
            if (!existing) {
                byKey.set(entry.key, entry);
                continue;
            }

            if (entry.polarity !== 0 && existing.polarity !== 0 && entry.polarity !== existing.polarity) {
                conflicts.push(`"${existing.text}" vs "${entry.text}"`);
                if (entry.timestampMs >= existing.timestampMs) {
                    byKey.set(entry.key, entry);
                }
                continue;
            }

            if (entry.combinedScore > existing.combinedScore) {
                byKey.set(entry.key, entry);
            }
        }

        const selectedFacts = Array.from(byKey.values())
            .sort((a, b) => b.combinedScore - a.combinedScore)
            .slice(0, FACT_LIMIT);

        const factsContext = selectedFacts.length
            ? selectedFacts
                .map((entry) => `- (${recencyLabel(entry.timestamp)} | ${formatDateLabel(entry.timestamp)}) ${entry.text}`)
                .join("\n")
            : "No known relevant facts.";

        const logsContext = logResults.map(i => `- ${i.payload?.timestamp}: ${i.payload?.text}`).join("\n") || "No relevant past logs.";
        const currentContext = todaySummary?.payload?.text || "No logs recorded yet today.";
        const conflictsContext = conflicts.length
            ? `\n[CONFLICTS DETECTED]:\n${conflicts.map((conflict) => `- ${conflict}`).join("\n")}\n`
            : "";

        // Combine for the Verifier
        const combinedContextForVerifier = `
        [USER FACTS]:
        ${factsContext}
        
        [TODAY'S SUMMARY]:
        ${currentContext}
        
        [RELEVANT LOGS]:
        ${logsContext}
        ${conflictsContext}
        `;

        const systemPrompt = `
        You are an expert Productivity Coach utilizing an Agentic Cognitive Architecture.
        
        ### USER PROFILE (Long Term Memory)
        ${factsContext}
        ${conflictsContext}
        
        ### CURRENT STATUS (Working Memory - Today)
        ${currentContext}
        
        ### RELEVANT HISTORY (Episodic Memory)
        ${logsContext}
        
        ### USER QUERY
        "${message}"
        
        ### INSTRUCTIONS
        1. Analyze the User Profile to understand their constraints (e.g., "sensitive to caffeine").
        2. Check the Current Status to see if today's actions align with their goals.
        3. Use Relevant History to find patterns.
        4. Answer the query. Be direct. If the user is doing something they previously said affects them negatively, point it out gently.
        `;

        // GENERATION & REFINE (The "Action" Layer)
        // Use Verified Response 
        const answer = await aiService.generateVerifiedResponse(systemPrompt, combinedContextForVerifier);

        res.json({ 
            success: true, 
            answer, 
            debug: {
                factsUsed: factResults.length,
                logsUsed: logResults.length,
                hasSummary: !!todaySummary,
                verification: "Enabled"
            }
        });

    } catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});


const startServer = async () => {
    await vectorService.initCollection(); 
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();