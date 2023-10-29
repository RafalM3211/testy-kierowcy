import type { Answer } from "../../types/globalTypes";

export type SetAnswerFunction = (answer: Exclude<Answer, null>) => void;
