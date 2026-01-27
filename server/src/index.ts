import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { addLogJob } from "./lib/queue.js";
import "./workers/log.worker.js";

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});