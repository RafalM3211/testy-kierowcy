import { isQuestion } from "../../types/typeGuards";

export async function getQuestion() {
  const res = await fetch("http://localhost:3001/question", {
    credentials: "include",
  });
  if (res.status >= 400) throw new Error("unknown error");
  const data = (await res.json()) as unknown;
  if (!isQuestion(data)) {
    throw new Error("returned data does not satisfy a question type");
  }
  console.log(data);
  return data;
}
