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
        headers: req.headers
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
    const session = await auth.api.getSession({ headers: req.headers });
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
        
        const factsContext = factResults.map(i => `- ${i.payload?.text}`).join("\n") || "No known relevant facts.";
        const logsContext = logResults.map(i => `- ${i.payload?.timestamp}: ${i.payload?.text}`).join("\n") || "No relevant past logs.";
        const currentContext = todaySummary?.payload?.text || "No logs recorded yet today.";

        const systemPrompt = `
        You are an expert Productivity Coach utilizing an Agentic Cognitive Architecture.
        
        ### USER PROFILE (Long Term Memory)
        ${factsContext}
        
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
        const answer = await aiService.generateResponse(systemPrompt);

        res.json({ 
            success: true, 
            answer, 
            debug: {
                factsUsed: factResults.length,
                logsUsed: logResults.length,
                hasSummary: !!todaySummary
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