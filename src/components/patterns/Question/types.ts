import type { Ansewer } from "../../../types/globalTypes";

export type QuestionMode<Mode extends "exam" | "preview"> = Mode extends "exam"
  ? "exam"
  : "preview";

export type setAnsewerFunction = (ansewer: Exclude<Ansewer, null>) => void;
