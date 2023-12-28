import { ExamQuestions } from "../../types/globalTypes";
import { isQuestion } from "../../types/typeGuards/typeGuards";
import { appApi } from "../clients/appApi";

export async function getExam() {
  const res = await appApi.get("exam", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res.json()) as ExamQuestions;
}
