import type { Application } from "express";

type AppGet = Application["get"];
type AppGetParams = Parameters<AppGet>;
type GetHandler = AppGetParams[1];
type GetHandlerParams = Parameters<GetHandler>;
export type Req = GetHandlerParams[0];
export type Res = GetHandlerParams[1];

export type EndpointHandler = (req: Req, res: Res) => void;

export interface RawQuestionRecord {
  "Numer pytania": number;
  Pytanie: string;
  "Poprawna odp": string;
  "Odpowiedź A": string | null;
  "Odpowiedź B": string | null;
  "Odpowiedź C": string | null;
  Media: string;
  "Zakres struktury": string;
  "Liczba punktów": 1 | 2 | 3;
  [key: string]: unknown;
}
