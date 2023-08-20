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

export function getNextQuestion(currentQuestions: Question[]) {
  console.log("getquestion");

  const nextQuestionValue = calcNextQuestionValue(currentQuestions);
  const nextQuestionType = getNextQuestionType(currentQuestions);
  const usedIds = currentQuestions.map((question) => question.id);

  let i = 0;
  let isQuestionFound = false;
  let nextQuestion: Question | undefined;
  do {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const proposedQuestion = questions[randomIndex] as Question;
    const valueMatches = proposedQuestion.value === nextQuestionValue;
    const typeMatches = proposedQuestion.type === nextQuestionType;
    const idNotUsed = !usedIds.includes(proposedQuestion.id);

    if (i > 10 && i < 20) {
      console.log(proposedQuestion, nextQuestionValue, nextQuestionType);
    }

    if (valueMatches && typeMatches && idNotUsed) {
      isQuestionFound = true;
      nextQuestion = proposedQuestion;
    }

    i++;

    if (i > 290) {
      console.log("wtf", i);
    }
  } while (!isQuestionFound && i < 300);

  if (!nextQuestion) {
    throw new Error(
      "Finding question took too long. There is probably something wrong with database"
    );
  }

  return nextQuestion;
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
