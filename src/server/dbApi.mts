import * as XLSX from "xlsx";
import * as fs from "fs";
import { Readable } from "stream";

interface RawQuestionRecord {
  "Numer pytania": number;
  (key: string): unknown;
}

XLSX.set_fs(fs);
XLSX.stream.set_readable(Readable);
const workbook = XLSX.readFile("./src/server/db.ods");
const questionsSheet = workbook.Sheets["questions"];
const questions = XLSX.utils.sheet_to_json(
  questionsSheet
) as RawQuestionRecord[];

const IDColumn = XLSX.utils.decode_col("B");
const contentColumn = XLSX.utils.decode_col("C");

export function getQuestionById(id: number): any {
  //console.log(questions);
  const rawQuestion = questions.find((el) => el["Numer pytania"] === 6301);
  console.log(rawQuestion);
}

getQuestionById(2);
