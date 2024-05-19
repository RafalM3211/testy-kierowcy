import { ExamQuestions, Question, User } from "../../types/globalTypes";
import { isQuestion } from "../../types/typeGuards/typeGuards";
import { appApi } from "../clients/appApi";

export async function getExam() {
  const res = await appApi.get("question/get-exam", {
    credentials: "include",
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
