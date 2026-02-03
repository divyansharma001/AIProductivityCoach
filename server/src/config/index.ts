import "dotenv/config";

export const config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,

  database: {
    url: process.env.DATABASE_URL!,
  },

  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },

  auth: {
    secret: process.env.BETTER_AUTH_SECRET!,
    url: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  },

  gemini: {
    apiKey: process.env.GEMINI_API_KEY!,
    embeddingModel: "gemini-embedding-001",
    chatModel: "gemini-2.5-flash",
  },

  cors: {
    origins: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:5173"],
  },

  ai: {
    factHalfLifeDays: Number(process.env.FACT_HALF_LIFE_DAYS) || 45,
    factScoreThreshold: Number(process.env.FACT_SCORE_THRESHOLD) || 0.12,
    factLimit: Number(process.env.FACT_LIMIT) || 6,
    embeddingCacheTTL: 60 * 60 * 24, // 24 hours in seconds
  },

  rateLimit: {
    chat: {
      windowMs: 60 * 1000, // 1 minute
      max: 10, 
    },
    logs: {
      windowMs: 60 * 1000,
      max: 30, 
    },
    general: {
      windowMs: 60 * 1000,
      max: 100,
    },
  },
} as const;


const requiredEnvVars = ["DATABASE_URL", "BETTER_AUTH_SECRET", "GEMINI_API_KEY"];

export function validateConfig(): void {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}
