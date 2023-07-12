import type { Question } from "./globalTypes";

export function isQuestion(data: unknown): data is Question {
  if (typeof data !== "object" || data === null) return false;
  return "id" in data;
}
