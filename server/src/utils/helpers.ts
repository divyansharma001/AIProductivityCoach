import { config } from "../config/index.js";

export const STOPWORDS = new Set([
  "i", "me", "my", "mine", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself",
  "he", "him", "his", "himself", "she", "her", "hers", "herself", "they", "them", "their", "theirs", "themselves",
  "a", "an", "the", "and", "or", "but", "if", "then", "than", "so", "because", "as", "of", "to", "for", "in", "on",
  "at", "by", "from", "with", "about", "into", "over", "after", "before", "between", "during", "without", "within", "up",
  "down", "out", "off", "again", "further", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each",
  "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "too", "very", "can", "will",
  "just", "should", "now", "user"
]);

export const NEGATION_TOKENS = new Set([
  "not", "don't", "dont", "do", "doesn't", "doesnt", "didn't", "didnt", "never", "no",
  "avoid", "avoids", "avoiding", "hate", "hates", "dislike", "dislikes",
  "struggle", "struggles", "struggling", "can't", "cant", "won't", "wont", "prefer not"
]);

export const POSITIVE_TOKENS = new Set([
  "like", "likes", "enjoy", "enjoys", "prefer", "prefers", "love", "loves",
  "works", "effective", "best", "better", "energized", "productive", "focus", "focused"
]);

export function parseTimestampMs(timestamp?: string): number {
  if (!timestamp) return 0;
  const ms = Date.parse(timestamp);
  return Number.isNaN(ms) ? 0 : ms;
}

export function daysSince(timestamp?: string): number {
  const ms = parseTimestampMs(timestamp);
  if (!ms) return Number.MAX_SAFE_INTEGER;
  const diffMs = Date.now() - ms;
  return Math.max(0, diffMs / (1000 * 60 * 60 * 24));
}

export function recencyWeight(timestamp?: string): number {
  const ageDays = daysSince(timestamp);
  if (!Number.isFinite(ageDays)) return 1;
  return Math.pow(0.5, ageDays / config.ai.factHalfLifeDays);
}

export function normalizeKey(text: string): string {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => !STOPWORDS.has(token))
    .filter((token) => !NEGATION_TOKENS.has(token));

  return tokens.slice(0, 4).join(" ") || text.toLowerCase();
}

export function polarityScore(text: string): number {
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
}

export function formatDateLabel(timestamp?: string): string {
  if (!timestamp) return "unknown date";
  const ms = parseTimestampMs(timestamp);
  if (!ms) return "unknown date";
  return new Date(ms).toISOString().split("T")[0];
}

export function recencyLabel(timestamp?: string): string {
  const ageDays = daysSince(timestamp);
  if (ageDays <= 7) return "recent";
  if (ageDays <= 30) return "stable";
  return "old";
}

export function toHeadersInit(headers: Record<string, string | string[] | undefined>): HeadersInit {
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") {
      normalized[key] = value;
    } else if (Array.isArray(value)) {
      normalized[key] = value.join(",");
    }
  }
  return normalized;
}

export const UUID_NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}
