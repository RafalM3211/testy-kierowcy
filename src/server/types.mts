import type { Application } from "express";
import type { Answer, QuestionType } from "../types/globalTypes";

type AppGet = Application["get"];
type AppGetParams = Parameters<AppGet>;
type GetHandler = AppGetParams[1];
type GetHandlerParams = Parameters<GetHandler>;
export type Req = GetHandlerParams[0];
export type Res = GetHandlerParams[1];

export type EndpointHandler = (req: Req, res: Res) => void;

export interface RawQuestionRecord {
  id: number;
  content: string;
  correctanswer: Exclude<Answer, null | boolean> | 1 | 0;
  type: QuestionType;
  value: number;
  media: string | null;
  A: string | null;
  B: string | null;
  C: string | null;
}

export type ABCanswers = {
  A: string;
  B: string;
  C: string;
};
