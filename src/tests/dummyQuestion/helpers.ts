import { basic, basicWithVideo, specialized } from "./dummyQuestions";
import type {
  BasicQuestion,
  ExamQuestions,
  SpecializedQuestion,
} from "../../types/globalTypes";

export function createDummyExam(): ExamQuestions {
  const basicQuestionsWithoutVideos = new Array<BasicQuestion>(20)
    .fill({ ...basic, value: 3 }, 0, 10)
    .fill({ ...basic, value: 2 }, 10, 16)
    .fill(basic, 16, 20);

  const specializedQuestions = new Array<SpecializedQuestion>(12)
    .fill({ ...specialized, value: 3 }, 0, 7)
    .fill({ ...specialized, value: 2 }, 7, 11)
    .fill(specialized, 1, 12);

  const basicQuestions = basicQuestionsWithoutVideos.map((question, index) => {
    const videosIndexes = [2, 3, 6, 8, 14, 17];
    if (videosIndexes.includes(index)) {
      return { ...question, ...basicWithVideo, value: question.value };
    } else return question;
  });

  const wholeExam = {
    basic: basicQuestions,
    specialized: specializedQuestions,
  };

  return wholeExam;
}
