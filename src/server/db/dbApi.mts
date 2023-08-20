import * as XLSX from "xlsx";
import * as fs from "fs";
import { Readable } from "stream";
import { prepareQuestion } from "./dbProcessor.mjs";
import { getDirname } from "../helpers.mjs";
import type { RawQuestionRecord } from "../types.mjs";
import { Question } from "../../types/globalTypes";

XLSX.set_fs(fs);
XLSX.stream.set_readable(Readable);
const workbook = XLSX.readFile(getDirname(import.meta.url) + "/extracted.ods");
const questionsSheet = workbook.Sheets["questions"];
const rawQuestions = XLSX.utils.sheet_to_json(
  questionsSheet
) as RawQuestionRecord[];

const questions: Question[] = rawQuestions.map((rawQuestion) => {
  return prepareQuestion(rawQuestion);
});

export function getQuestionById(id: number) {
  const quesiton = questions.find((el) => el.id === id);

  if (quesiton === undefined) {
    throw new Error(
      `Couldn't get quesiton from database. Probably question with id ${id} doesn't exist`
    );
  }
  return quesiton;
}
