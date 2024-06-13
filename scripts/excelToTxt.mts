import * as XLSX from "xlsx";
import * as fs from "fs";
import { getDirname } from "../src/server/helpers.mjs";
import { Readable } from "stream";
import type { RawQuestionRecord } from "../src/server/types.mjs";

XLSX.set_fs(fs);
XLSX.stream.set_readable(Readable);

const dirName = getDirname(import.meta.url);

const args = process.argv;
if (!args[2]) {
  throw new Error("you need to specify calc file path");
}
const dbPath = args[2];
const dbDir = dbPath.slice(0, dirName.lastIndexOf("\\") - 2);

const workbook = XLSX.readFile(dbPath);
const sheetName = workbook.SheetNames[0];
const questionsSheet = workbook.Sheets[sheetName];
const rawQuestions = XLSX.utils.sheet_to_json(
  questionsSheet
) as RawQuestionRecord[];

let fileContent = "";

rawQuestions.forEach((question) => {
  const preparedQuestion = prepareForTxt(question);

  let record = "";

  for (const [key, value] of Object.entries(preparedQuestion)) {
    const valueOrNull = value || (value === "" ? "\\N" : value);
    record += valueOrNull + "|";
  }

  record = record.slice(0, -1);

  fileContent += record + "\n";
});

try {
  fs.writeFileSync(dbDir + "\\db.txt", fileContent);
  console.log("success");
} catch (err) {
  console.error(err);
}

function prepareForTxt(question: RawQuestionRecord) {
  const template = {
    id: null,
    content: null,
    correctAnswer: null,
    type: null,
    value: null,
    media: null,
    A: null,
    B: null,
    C: null,
  } satisfies Record<keyof RawQuestionRecord, null>;

  for (const [key, value] of Object.entries(question)) {
    template[key as keyof Record<keyof RawQuestionRecord, null>] = value;
  }

  return template;
}
