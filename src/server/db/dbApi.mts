import dotEnv from "dotenv";
import { prepareQuestion } from "./dbProcessor.mjs";
import type { RawQuestionRecord, DrawQuestionConfig } from "../types.mjs";

import pg from "pg";
import { resolve } from "path";
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

export async function getQuestions(
  sql: string,
  values?: any[]
): Promise<RawQuestionRecord[]> {
  const res = await pool.query(sql, values);

  const questions = res.rows;

  return questions;
}
