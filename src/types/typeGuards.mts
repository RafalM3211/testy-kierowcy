import type { Question } from "./globalTypes";

export function isQuestion(data: unknown): data is Question {
  if (typeof data !== "object" || data === null) return false;
  return "id" in data;
}

export function hasKey<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, any> {
  return key in obj;
}
