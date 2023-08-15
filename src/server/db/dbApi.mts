import * as XLSX from "xlsx";
import * as fs from "fs";
import { Readable } from "stream";
import { prepareQuestion } from "./dbProcessor.mjs";
import { getDirname } from "../helpers.mjs";
import type { RawQuestionRecord } from "../types.mjs";
import { Question } from "../../types/globalTypes";

XLSX.set_fs(fs);
XLSX.stream.set_readable(Readable);
const workbook = XLSX.readFile(getDirname(import.meta.url) + "/db.ods");
const questionsSheet = workbook.Sheets["questions"];
const questions = XLSX.utils.sheet_to_json(
  questionsSheet
) as RawQuestionRecord[];

const processedQuestions = questions.map((question) => {
  return prepareQuestion(question);
});

export function getQuestionById(id: number) {
  console.log(id);
  const preparedQuestion = processedQuestions.find(
    (question) => question.id === id
  );
  if (preparedQuestion === undefined) {
    throw new Error(
      `Couldn't get quesiton from database. Probably question with id ${id} doesn't exist`
    );
  }

  /* const rawQuestion = getRawQuestionById(id);
  const preparedQuestion = prepareQuestion(rawQuestion); */
  return preparedQuestion;
}

function getRawQuestionById(id: number): RawQuestionRecord {
  const questionRecord = questions.find((el) => el["Numer pytania"] == id);
  if (questionRecord === undefined)
    throw new Error(
      `Couldn't get quesiton from database. Probably question with id ${id} doesn't exist`
    );
  return questionRecord;
}

export function getNextQuestion(currentQuestions: Question[]) {
  const nextQuestionValue = calcNextQuestionValue(currentQuestions);
  const nextQuestionType = getNextQuestionType(currentQuestions);
  const currentIds = currentQuestions.map((question) => question.id);
}

function calcNextQuestionValue(currentQuestions: Question[]) {
  const threePointMaxCount = 16;
  const twoPointMaxCount = 10;

  if (currentQuestions.length + 1 < threePointMaxCount) return 3;
  if (currentQuestions.length + 1 < twoPointMaxCount) return 2;
  else return 1;

  /* const threePointMaxCount = 16;
  const twoPointMaxCount = 10;

  let threePointCount = 0;
  let twoPointCount = 0;
  let onePointCount = 0;

  questions.forEach((question) => {
    const preparedQuestion = prepareQuestion(question);
    const value = preparedQuestion.value;
    switch (value) {
      case 1: {
        onePointCount++;
        break;
      }
      case 2: {
        twoPointCount++;
        break;
      }
      case 3: {
        threePointCount++;
      }
    }
  });

  if(threePointCount<threePointMaxCount) return 3
  if(twoPointCount<twoPointMaxCount)return 2
  else return 1 */
}

function getNextQuestionType(currentQuestions: Question[]): Question["type"] {
  return currentQuestions.length < 20 ? "basic" : "specialized";
}
