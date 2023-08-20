import type { Application } from "express";
import type { Ansewer, Question } from "../types/globalTypes";

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
  correctAnsewer: Exclude<Ansewer, null | boolean> | 1 | 0;
  media: string;
  type: Question["type"];
  value: number;
  A?: string;
  B?: string;
  C?: string;
}
