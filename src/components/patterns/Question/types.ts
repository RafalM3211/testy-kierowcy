import type { Ansewer } from "../../../types/globalTypes";

export type QuestionMode = "exam" | "preview";

export type ExcludeUndefined<T> = {
  [key in keyof T]: Exclude<T[key], undefined>;
};
