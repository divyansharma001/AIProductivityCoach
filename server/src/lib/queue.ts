import { Queue } from "bullmq";
import connection from "./redis.js";

export const logQueue = new Queue("log-processing", { connection });

export const addLogJob = async (data: { userId: string; text: string; logId: string }) => {
  return logQueue.add("process-log", data, {
    attempts: 3,             
    backoff: {
      type: "exponential",
      delay: 1000,           
    },
    removeOnComplete: true,  
  });
};