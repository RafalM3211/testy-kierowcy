import * as XLSX from "xlsx";
import * as fs from "fs";
import { Readable } from "stream";
import dbTranslations from "./dbTranslations.json" assert { type: "json" };
import { hasKey, addPropToObject } from "./helpers.mjs";
import type { Question } from "../types/globalTypes";

interface RawQuestionRecord {
  "Numer pytania": number;
  Pytanie: string;
  "Poprawna odp": string;
  "Odpowiedź A": string | null;
  "Odpowiedź B": string | null;
  "Odpowiedź C": string | null;
  Media: string;
  "Zakres struktury": string;
  "Liczba punktów": number;
  [key: string]: unknown;
}

XLSX.set_fs(fs);
XLSX.stream.set_readable(Readable);
const workbook = XLSX.readFile("./src/server/db/db.ods");
const questionsSheet = workbook.Sheets["questions"];
const questions = XLSX.utils.sheet_to_json(
  questionsSheet
) as RawQuestionRecord[];

export function getQuestionById(id: number) {
  console.log(id);
  const rawQuestion = getQuestionRecordById(id);
  const preparedQuestion = prepareQuestion(rawQuestion);
  console.log("preparedQuestion:", preparedQuestion);
  return preparedQuestion;
}

function getQuestionRecordById(id: number): RawQuestionRecord {
  const questionRecord = questions.find((el) => el["Numer pytania"] == id);
  if (questionRecord === undefined)
    throw new Error(
      `Couldn't get quesiton from database. Probably question with id ${id} doesn't exist`
    );
  return questionRecord;
}

function prepareQuestion(rawQuestion: RawQuestionRecord) {
  const newQuestion = {};
  const translatedPropsQuestion = extractAndTranslateProps(
    newQuestion,
    rawQuestion
  );
  const finalQuestion = translateValues(translatedPropsQuestion);
  return finalQuestion;
}

function extractAndTranslateProps(
  newQuestion: {},
  rawQuestion: RawQuestionRecord
) {
  for (let key in dbTranslations.headers) {
    const typedKey = key as keyof typeof dbTranslations.headers;
    const value = rawQuestion[typedKey];
    const translatedKey = dbTranslations.headers[typedKey];
    addPropToObject(newQuestion, translatedKey, value);
  }

  const translatedQuesiton = newQuestion as Omit<Question, "ansewers">;
  const ansewers = {
    A: rawQuestion["Odpowiedź A"],
    B: rawQuestion["Odpowiedź B"],
    C: rawQuestion["Odpowiedź C"],
  };
  const preparedQuestion = {
    ...translatedQuesiton,
    ansewers:
      translateSingleValue(translatedQuesiton.type) === "specialized"
        ? ansewers
        : undefined,
  };
  return preparedQuestion;
}

function translateValues(
  question: Record<keyof Question, number | string | object | boolean>
) {
  for (let key in question) {
    const typedKey = key as keyof typeof question;
    const originalValue = question[typedKey];
    if (typeof originalValue === "string") {
      const translatedValue = translateSingleValue(originalValue);
      if (translatedValue != undefined) {
        question[typedKey] = translatedValue;
      }
    }
  }
  return question as Question;
}

function translateSingleValue(value: string): string | boolean | undefined {
  if (hasKey(dbTranslations.values, value)) {
    return dbTranslations.values[value];
  } else return undefined;
}
