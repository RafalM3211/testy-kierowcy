import dotEnv from "dotenv";
import { prepareQuestion } from "./dbProcessor.mjs";
import type { RawQuestionRecord } from "../types.mjs";
import { Question, QuestionType } from "../../types/globalTypes";

import pg from "pg";
const { Pool } = pg;

dotEnv.config();

const pool = new Pool();

/* 
W przyszłości takie API:

np.
getQuestions({
  type: "basic",
  value: 4
});

*/

export async function getQuestionById(id: number) {
  const questions = await getQuestions(
    "SELECT * FROM questions WHERE id=$1 OR id=919",
    [id]
  );

  if (questions.length == 0) {
    throw "0 rows returned. Question with given data not found";
  }
  if (questions.length > 1) {
    throw `Too many rows returned: ${questions.length}. Should return only one question`;
  }

  return prepareQuestion(questions[0]);
}

export async function getNextExamQuestion(usedQuestions: Question[]) {
  const nextQuestionType = getNextQuestionType(usedQuestions);
  const nextQuestionValue = getNextQuestionValue(usedQuestions);
  const usedIds = usedQuestions.map((question) => question.id);

  if (usedIds.length == 0) {
    usedIds.push(-1); //psql ANY($3::int[]) doesn't accept empty table as $3 argument
  }

  const satisfyingQuestions = await getQuestions(
    "SELECT * FROM questions WHERE type=$1 AND value=$2 AND id <> ANY($3::int[])",
    [nextQuestionType, nextQuestionValue, usedIds]
  );

  const randomIndex = Math.floor(Math.random() * satisfyingQuestions.length);

  const question = satisfyingQuestions[randomIndex];

  return prepareQuestion(question);
}

async function getQuestions(
  sql: string,
  values?: any[]
): Promise<RawQuestionRecord[]> {
  const res = await pool.query(sql, values);
  console.log(res.rowCount);

  const questions = res.rows;

  return questions;
}

function getNextQuestionValue(currentQuestions: Question[]) {
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
