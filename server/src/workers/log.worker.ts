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

      const logVector = await aiService.generateEmbedding(text);
      await vectorService.upsertPoint(vectorService.LOGS_COLLECTION, logId, logVector, {
        text: text,
        userId: userId,
        timestamp: new Date().toISOString(),
        type: "daily_log"
      });

      console.log(`[Worker] Extracting facts for Log ${logId}...`);
      const facts = await aiService.extractFacts(text);

      if (facts.length > 0) {
        console.log(`[Worker] Found ${facts.length} facts:`, facts);
      
        for (const fact of facts) {
            const factId = uuidv4();
            const factVector = await aiService.generateEmbedding(fact);
            
            await vectorService.upsertPoint(vectorService.FACTS_COLLECTION, factId, factVector, {
                text: fact,
                sourceLogId: logId, 
                userId: userId,
                timestamp: new Date().toISOString(),
                type: "fact"
            });
        }
      } else {
        console.log("[Worker] No facts extracted.");
      }


      console.log(`[Worker] Updating daily summary for user ${userId}...`);
      
    
      const today = new Date().toISOString().split('T')[0];
      const { v5: uuidv5 } = await import('uuid');
      const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; 
      const deterministicId = uuidv5(`${userId}_${today}`, NAMESPACE);

      const existingPoint = await vectorService.getPoint(vectorService.SUMMARIES_COLLECTION, deterministicId);
      const currentSummaryText = existingPoint?.payload?.text as string || null;

      const updatedSummary = await aiService.updateDailySummary(currentSummaryText, text);
      console.log(`[Worker] New Daily Summary: ${updatedSummary}`);

      const summaryVector = await aiService.generateEmbedding(updatedSummary);
      
      await vectorService.upsertPoint(vectorService.SUMMARIES_COLLECTION, deterministicId, summaryVector, {
        text: updatedSummary,
        userId: userId,
        date: today,
        type: "daily_summary",
        lastUpdated: new Date().toISOString()
      });


      
      await db
        .update(logEntry)
        .set({ status: "processed", updatedAt: new Date() })
        .where(eq(logEntry.id, logId));

      return { success: true, factsCount: facts.length };

    } catch (error: any) {
      console.error(`[Worker] Failed to process log ${logId}:`, error);
      await db.update(logEntry).set({ status: "failed" }).where(eq(logEntry.id, logId));
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