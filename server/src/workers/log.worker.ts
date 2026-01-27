import { Worker } from "bullmq";
import connection from "../lib/redis.js";

export const logWorker = new Worker(
  "log-processing",
  async (job) => {
    console.log(`[Worker] Processing Job ${job.id} for User ${job.data.userId}`);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log(`[Worker] AI Analysis Complete: "${job.data.text}"`);

    return { success: true, insight: "Simulated insight" };
  },
  { connection }
);

logWorker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed`);
});

logWorker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job!.id} failed: ${err.message}`);
});