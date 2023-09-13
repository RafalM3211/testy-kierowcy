import * as XLSX from "xlsx";
import * as fs from "fs";
import { Readable } from "stream";
import { prepareQuestion } from "./dbProcessor.mjs";
import { getDirname } from "../helpers.mjs";
import type { RawQuestionRecord } from "../types.mjs";
import {
  BasicQuestion,
  Question,
  QuestionType,
  SpecializedQuestion,
} from "../../types/globalTypes";

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

const basicQuestions = questions.filter(
  (question) => question.type === "basic"
) as BasicQuestion[];

const specializedQuestions = questions.filter(
  (question) => question.type === "specialized"
) as SpecializedQuestion[];

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
  const nextQuestionValue = calcNextQuestionValue(currentQuestions);
  const nextQuestionType = getNextQuestionType(currentQuestions);
  const usedIds = currentQuestions.map((question) => question.id);

  let i = 0;
  let isQuestionFound = false;
  let nextQuestion: Question | undefined;
  do {
    const proposedQuestion = getProposedQuestionByType(nextQuestionType);
    const valueMatches = proposedQuestion.value === nextQuestionValue;
    const idNotUsed = !usedIds.includes(proposedQuestion.id);

    if (valueMatches && idNotUsed) {
      isQuestionFound = true;
      nextQuestion = proposedQuestion;
    }

    i++;
  } while (!isQuestionFound && i < 300);

  if (!nextQuestion) {
    throw new Error(
      "Finding question took too long. There is probably something wrong with database"
    );
  }

  return nextQuestion;
}

function getProposedQuestionByType(type: QuestionType) {
  const questionsWithProvidedType =
    type === "specialized" ? specializedQuestions : basicQuestions;

  const randomIndex = Math.floor(
    Math.random() * questionsWithProvidedType.length
  );
  const proposedQuestion = questionsWithProvidedType[randomIndex];
  return proposedQuestion;
}

function calcNextQuestionValue(currentQuestions: Question[]) {
  const twoPointMaxCount = 10;
  const threePointMaxCount = 16;

  if (currentQuestions.length < twoPointMaxCount) {
    return 2;
  }
  if (currentQuestions.length < threePointMaxCount + twoPointMaxCount) {
    return 3;
  } else {
    return 1;
  }
}

function getNextQuestionType(currentQuestions: Question[]): QuestionType {
  return currentQuestions.length < 20 ? "basic" : "specialized";
}
