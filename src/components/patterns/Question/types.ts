import type { Ansewer } from "../../../types/globalTypes";

export type QuestionMode<Mode extends "exam" | "preview" = "exam" | "preview"> =
  Mode extends "exam" ? "exam" : "preview";

export type ExcludeUndefined<T> = {
  [key in keyof T]: Exclude<T[key], undefined>;
};
