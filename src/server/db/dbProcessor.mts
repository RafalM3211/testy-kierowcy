import type {
  BasicQuestion,
  Question,
  SpecializedQuestion,
} from "../../types/globalTypes";
import type { RawQuestionRecord } from "../types.mjs";

export function prepareQuestion(rawQuestion: RawQuestionRecord): Question {
  if (rawQuestion.media === undefined) {
    rawQuestion.media = "";
  }

  if (rawQuestion.type === "specialized") {
    const { A, B, C } = rawQuestion;

    if (A && B && C) {
      const ansewers = { A, B, C };
      const preparedQuestion = { ...rawQuestion, ansewers };
      delete preparedQuestion.A;
      delete preparedQuestion.B;
      delete preparedQuestion.C;

      return preparedQuestion as SpecializedQuestion;
    } else
      console.warn(
        "Question with type specialized should have A, B and C ansewers. Question id: " +
          rawQuestion.id
      );
  }

  const correctAnsewer = !!rawQuestion.correctAnsewer;
  const preparedQuestion = { ...rawQuestion, correctAnsewer };
  return preparedQuestion as BasicQuestion;
}
