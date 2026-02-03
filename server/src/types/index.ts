import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  };
  requestId: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface LogEntry {
  id: string;
  userId: string;
  content: string;
  type: string;
  status: "pending" | "processed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLogInput {
  content: string;
}

export interface Fact {
  id: string;
  text: string;
  userId: string;
  sourceLogId: string;
  timestamp: string;
  type: string;
}

export interface RankedFact extends Fact {
  similarity: number;
  recency: number;
  combinedScore: number;
  polarity: number;
}

export interface ChatInput {
  message: string;
}

export interface ChatResponse {
  success: boolean;
  answer: string;
  debug?: {
    factsUsed: number;
    logsUsed: number;
    hasSummary: boolean;
    verification: string;
    cacheHit?: boolean;
  };
}

export interface DailySummary {
  id: string;
  text: string;
  userId: string;
  date: string;
  lastUpdated: string;
}

export interface LogPayload {
  text: string;
  userId: string;
  timestamp: string;
  type: string;
}

export interface FactPayload {
  text: string;
  sourceLogId: string;
  userId: string;
  timestamp: string;
  type: string;
}

export interface SummaryPayload {
  text: string;
  userId: string;
  date: string;
  type: string;
  lastUpdated: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    errors?: Record<string, string[]>;
  };
}

export interface LogJobData {
  logId: string;
  userId: string;
  text: string;
}
