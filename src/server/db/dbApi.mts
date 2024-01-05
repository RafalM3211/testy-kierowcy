import dotEnv from "dotenv";
import pg from "pg";
import type { QueryResultRow, QueryResult } from "pg";
import type { RawQuestionRecord, UserWithPassword } from "../types.mjs";

dotEnv.config();
const { Pool } = pg;
const pool = new Pool();

async function query<T extends QueryResultRow>(
  sql: string,
  values?: any[]
): Promise<QueryResult<T>> {
  const res = await pool.query<T>(sql, values);

  return res;
}

export async function getQuestionsWhere(conditions: string, values?: any[]) {
  const sql = "SELECT * FROM questions WHERE " + conditions;

  const res = await query<RawQuestionRecord>(sql, values);

  const questions = res.rows;

  return questions;
}

export async function getUsersWhere(conditions: string, values?: any[]) {
  const sql = "SELECT * FROM users WHERE " + conditions;

  const res = await query<UserWithPassword>(sql, values);

  const users = res.rows;

  return users;
}

export async function insertUser(
  email: string,
  password: string,
  name: string | null
) {
  const sql = `INSERT INTO users (email, password${
    !!name ? ", name" : ""
  }) VALUES (
    $1, crypt($2, gen_salt('bf'))${!!name ? ", $3" : ""}
  );`;

  const res = await query(
    sql,
    [email, password, name].filter((v) => !!v)
  );
  console.log(res);
}
