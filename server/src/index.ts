import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { toNodeHandler } from "better-auth/node";
import { v4 as uuidv4 } from "uuid";
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


const startServer = async () => {
    await vectorService.initCollection(); 
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();