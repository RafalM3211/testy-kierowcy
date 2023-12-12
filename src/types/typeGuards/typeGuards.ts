import type { Question, QuestionType } from "../globalTypes";

export function isQuestion(data: unknown): data is Question {
  if (typeof data !== "object" || data === null) return false;
  if (!hasRequiredKeys(data)) return false;
  if (!entriesMatchType(data)) return false;
  if (!answersMatchType(data)) return false;

  return true;
}

function hasRequiredKeys(
  data: object
): data is Record<keyof Question, unknown> {
  const requiredKeys = [
    "id",
    "content",
    "media",
    "value",
    "correctAnswer",
    "type",
  ];
  let isOk = true;
  requiredKeys.forEach((key) => {
    if (!(key in data)) {
      isOk = false;
    }
  });

  return isOk;
}

function entriesMatchType(data: Record<keyof Question, unknown>) {
  const idCorrect = typeof data.id === "number";
  const contentCorrect = typeof data.content === "string";
  const mediaCorrect = typeof data.media === "string" || data.media === null;
  const valueCorrect =
    typeof data.value === "number" && [1, 2, 3].includes(data.value);
  const typeCorrect =
    typeof data.type === "string" &&
    ["basic", "specialized"].includes(data.type);

  const typeChecks = [
    idCorrect,
    contentCorrect,
    mediaCorrect,
    valueCorrect,
    typeCorrect,
  ];
  return !typeChecks.includes(false);
}

function answersMatchType(data: Record<keyof Question, unknown>) {
  const answers = "answers" in data ? data.answers : undefined;
  const dataType = data.type as QuestionType;
  const answersMatchType = doQuestionAnswersMatchType(answers, dataType);
  const correctAnswerMatchesType = doesCorrectAnswerMatchType(
    data.correctAnswer,
    dataType
  );

  const matchChecks = [answersMatchType, correctAnswerMatchesType];
  return !matchChecks.includes(false);
}

function doQuestionAnswersMatchType(answers: unknown, type: QuestionType) {
  if (type === "basic") {
    return answers === undefined;
  } else {
    if (typeof answers !== "object" || answers === null) return false;
    const desiredKeys = ["A", "B", "C"];
    const keys = Object.keys(answers);
    const keysMatch = JSON.stringify(desiredKeys) === JSON.stringify(keys);
    const entries = Object.values(answers);
    const entriesMatch = entries.every((entry) => typeof entry === "string");

    return keysMatch && entriesMatch;
  }
}

function doesCorrectAnswerMatchType(
  correctAnswer: unknown,
  type: QuestionType
) {
  if (type === "basic") {
    return typeof correctAnswer === "boolean";
  } else {
    return (
      typeof correctAnswer === "string" &&
      ["A", "B", "C"].includes(correctAnswer)
    );
  }
}
