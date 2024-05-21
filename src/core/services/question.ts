import { QueryFunctionContext } from "@tanstack/react-query";
import {
  AnswersStatistics,
  ExamQuestions,
  Question,
  User,
} from "../../types/globalTypes";
import { isQuestion } from "../../types/typeGuards/typeGuards";
import { appApi } from "../clients/appApi";

export async function getExam() {
  const res = await appApi.get("question/get-exam", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res.json()) as ExamQuestions;
}

export async function sendAnswer(
  userId: User["id"],
  questionId: Question["id"],
  isCorrect: boolean
) {
  await appApi.post("question/send-answer", { userId, questionId, isCorrect });
}

export async function getAnswersStatistics(
  queryContext: QueryFunctionContext<[string, number]>
) {
  const userId = queryContext.queryKey[1];
  console.log("userId: ", userId);
  /* const res = await appApi.get("question/answers-statistics/" + userId, {
    headers: {
      "Content-Type": "application/json",
    },
  }); */
  //return (await res.json()) as AnswersStatistics;
  return { correct: 20, wrong: 30, unasnwered: 50 };
}
