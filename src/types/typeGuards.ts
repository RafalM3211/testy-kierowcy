import type { Question, QuestionType } from "./globalTypes";

export function isQuestion(data: unknown): data is Question {
  if (typeof data !== "object" || data === null) return false;
  if (!hasRequiredKeys(data)) return false;
  if (!entriesMatchType(data)) return false;
  if (!ansewersMatchType(data)) return false;

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
    "correctAnsewer",
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
  const mediaCorrect = typeof data.media === "string";
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

function ansewersMatchType(data: Record<keyof Question, unknown>) {
  const ansewers = "ansewers" in data ? data.ansewers : undefined;
  const dataType = data.type as QuestionType;
  const ansewersMatchType = doQuestionAnsewersMatchType(ansewers, dataType);
  const correctAnsewerMatchesType = doesCorrectAnsewerMatchType(
    data.correctAnsewer,
    dataType
  );

  const matchChecks = [ansewersMatchType, correctAnsewerMatchesType];
  return !matchChecks.includes(false);
}

function doQuestionAnsewersMatchType(ansewers: unknown, type: QuestionType) {
  if (type === "basic") {
    return ansewers === undefined;
  } else {
    if (typeof ansewers !== "object" || ansewers === null) return false;
    const desiredKeys = ["A", "B", "C"];
    const keys = Object.keys(ansewers);
    const keysMatch = JSON.stringify(desiredKeys) === JSON.stringify(keys);
    const entries = Object.values(ansewers);
    const entriesMatch = entries.every((entry) => typeof entry === "string");

    return keysMatch && entriesMatch;
  }
}

function doesCorrectAnsewerMatchType(
  correctAnsewer: unknown,
  type: QuestionType
) {
  if (type === "basic") {
    return typeof correctAnsewer === "boolean";
  } else {
    return (
      typeof correctAnsewer === "string" &&
      ["A", "B", "C"].includes(correctAnsewer)
    );
  }
}
