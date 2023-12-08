import type {
  BasicQuestion,
  Question,
  SpecializedQuestion,
} from "../../types/globalTypes";
import type { RawQuestionRecord, ABCanswers } from "../types.mjs";

type PartiallyProcessedQuestion = Partial<RawQuestionRecord> & {
  correctAnswer: Question["correctAnswer"];
};

export function prepareQuestion(rawQuestion: RawQuestionRecord): Question {
  const correctAnswer = !!rawQuestion.correctanswer;
  const partiallyPreparedQuestion: PartiallyProcessedQuestion = {
    ...rawQuestion,
    correctAnswer,
  };
  delete partiallyPreparedQuestion.correctanswer;

  if (rawQuestion.type === "specialized") {
    const { a, b, c } = rawQuestion;

    if (a && b && c) {
    } else
      console.warn(
        "Question with type specialized should have A, B and C answers. Question id: " +
          rawQuestion.id
      );
  }

  return partiallyPreparedQuestion as BasicQuestion | SpecializedQuestion;
}
