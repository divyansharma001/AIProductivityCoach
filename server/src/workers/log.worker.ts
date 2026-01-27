import { Worker } from "bullmq";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import connection from "../lib/redis.js";
import { aiService } from "../lib/gemini.js";
import { vectorService } from "../lib/qdrant.js";
import { db } from "../db/index.js";
import { logEntry } from "../db/schema.js";

export const logWorker = new Worker(
  "log-processing",
  async (job) => {
    const { logId, userId, text } = job.data;
    
    try {
      console.log(`[Worker] Processing Log ${logId}`);

      const vector = await aiService.generateEmbedding(text);

      await vectorService.upsertPoint(logId, vector, {
        text: text,
        userId: userId,
        timestamp: new Date().toISOString(),
        type: "daily_log"
      });

      await db
        .update(logEntry)
        .set({ status: "processed", updatedAt: new Date() })
        .where(eq(logEntry.id, logId));

      console.log(`[Worker] Log ${logId} fully processed and indexed.`);
      return { success: true, vectorSize: vector.length };

    } catch (error: any) {
      console.error(`[Worker] Failed to process log ${logId}:`, error);
      
      await db
        .update(logEntry)
        .set({ status: "failed" })
        .where(eq(logEntry.id, logId));
      
      throw error;
    }
  },
  { connection }
);


logWorker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed successfully`);
  console.log(`[Metrics] Processed log for userId: ${job.data.userId}`);
});

logWorker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
  console.error(`[Alert] Failed to process log ${job?.data?.logId} for userId: ${job?.data?.userId}`);
  // TODO: Integrate with Sentry or monitoring service
  // Sentry.captureException(err, { extra: { jobId: job?.id, logId: job?.data?.logId } });
});