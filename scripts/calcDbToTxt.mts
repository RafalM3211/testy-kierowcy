import * as XLSX from "xlsx";
import * as fs from "fs";
import { getDirname } from "../src/server/helpers.mjs";
import { Readable } from "stream";
import type { RawQuestionRecord } from "../src/server/types.mjs";
import { Question } from "../src/types/globalTypes";

XLSX.set_fs(fs);
XLSX.stream.set_readable(Readable);

const dirName = getDirname(import.meta.url);
const projectDir = dirName.slice(0, dirName.lastIndexOf("\\"));
const dbPath = projectDir + "/src/server/db/db.ods";

const workbook = XLSX.readFile(dbPath);
const questionsSheet = workbook.Sheets["questions"];
const rawQuestions = XLSX.utils.sheet_to_json(
  questionsSheet
) as RawQuestionRecord[];

let fileContent = "";

rawQuestions.forEach((question) => {
  const preparedQuestion = prepareForTxt(question);

  let record = "";

  for (const [key, value] of Object.entries(preparedQuestion)) {
    const valueOrNull = value ?? "\\N";
    record += valueOrNull + "|";
  }

  record = record.slice(0, -1);

  fileContent += record + "\n";
});

try {
  fs.writeFileSync(projectDir + "/db.txt", fileContent);
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
