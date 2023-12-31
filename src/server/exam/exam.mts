import {
  BasicQuestion,
  ExamQuestions,
  Question,
  SpecializedQuestion,
} from "../../types/globalTypes";
import { randomInt } from "../helpers.mjs";
import { prepareQuestion } from "../db/dbProcessor.mjs";
import { getQuestionsWhere } from "../db/dbApi.mjs";
import type { RawQuestionRecord, DrawQuestionConfig } from "../types.mjs";

export async function getExamQuestions(): Promise<ExamQuestions> {
  const basicQuestionValueMap = [
    { value: 3, count: 10 },
    { value: 2, count: 6 },
    { value: 1, count: 4 },
  ] satisfies DrawQuestionConfig;

  const specializedQuestionValueMap = [
    { value: 3, count: 6 },
    { value: 2, count: 4 },
    { value: 1, count: 2 },
  ] satisfies DrawQuestionConfig;

  const basicQuestions = (await drawExamQuestions(
    basicQuestionValueMap,
    "basic"
  )) as BasicQuestion[];
  const specializedQuestions = (await drawExamQuestions(
    specializedQuestionValueMap,
    "specialized"
  )) as SpecializedQuestion[];

  return {
    basic: basicQuestions,
    specialized: specializedQuestions,
  };
}

/* const a = await getExamQuestions();
console.log(a.basic[0], a.specialized[0]); */

async function drawExamQuestions(
  NvalueQestionsCount: DrawQuestionConfig,
  type: Question["type"]
): Promise<Question[]> {
  const rawFinalQuestions: RawQuestionRecord[] = [];

  for await (const { count, value: questionValue } of NvalueQestionsCount) {
    const allQuestions = await getQuestionsWhere("type=$1 AND value=$2", [
      type,
      questionValue,
    ]);
    const countedQuestions = drawNQuestionsFrom(count, allQuestions);

    rawFinalQuestions.push(...countedQuestions);
  }

  const preparedQuestions = rawFinalQuestions.map((question) => {
    return prepareQuestion(question);
  });

  return preparedQuestions;
}

function drawNQuestionsFrom(count: number, questions: RawQuestionRecord[]) {
  const container: undefined[] = new Array(count);
  container.fill(undefined);
  const usedIndexes: number[] = [];

  const finalQuestions = container.map(() => {
    let randomIndex = randomInt(0, questions.length);
    while (usedIndexes.includes(randomIndex)) {
      randomIndex = randomInt(0, questions.length);
    }

    return questions[randomIndex];
  });

  return finalQuestions;
}
