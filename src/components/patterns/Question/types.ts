import type { Ansewer } from "../../../types/globalTypes";

export type QuestionMode<Mode extends "exam" | "learn"> = Mode extends "exam"
  ? "exam"
  : "learn";

export type setAnsewerFunction = (ansewer: Exclude<Ansewer, null>) => void;
