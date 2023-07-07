import { isQuestion } from "../../types/typeGuards";

export async function getQuestion() {
  const res = await fetch("http://localhost:3001/question");
  const data = (await res.json()) as unknown;
  if (!isQuestion(data)) {
    throw new Error("returned data does not satisfy a question type");
  }
  console.log(data);
  return data;
}
