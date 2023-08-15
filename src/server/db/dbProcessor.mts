import dbTranslations from "../dbTranslations.json" assert { type: "json" };
import { hasKey, addPropToObject } from "../helpers.mjs";
import type { Question } from "../../types/globalTypes";
import type { RawQuestionRecord } from "../types.mjs";

export function prepareQuestion(rawQuestion: RawQuestionRecord) {
  const translatedPropsQuestion = extractAndTranslateProps(rawQuestion);
  const finalQuestion = translateValues(translatedPropsQuestion);
  return finalQuestion;
}

function extractAndTranslateProps(rawQuestion: RawQuestionRecord) {
  const newQuestion = {};

  for (let key in dbTranslations.headers) {
    const typedKey = key as keyof typeof dbTranslations.headers;
    const value = rawQuestion[typedKey];
    const translatedKey = dbTranslations.headers[typedKey];
    addPropToObject(newQuestion, translatedKey, value);
  }

  const translatedQuesiton = newQuestion as Omit<Question, "ansewers">;
  const ansewers = {
    A: rawQuestion["Odpowiedź A"],
    B: rawQuestion["Odpowiedź B"],
    C: rawQuestion["Odpowiedź C"],
  };
  const preparedQuestion = {
    ...translatedQuesiton,
    ansewers:
      translateSingleValue(translatedQuesiton.type) === "specialized"
        ? ansewers
        : undefined,
  };
  return preparedQuestion;
}

function translateValues(
  question: Record<keyof Question, number | string | object | boolean>
) {
  for (let key in question) {
    const typedKey = key as keyof typeof question;
    const originalValue = question[typedKey];
    if (typeof originalValue === "string") {
      const translatedValue = translateSingleValue(originalValue);
      if (translatedValue != undefined) {
        question[typedKey] = translatedValue;
      }
    }
  }
  return question as Question;
}

function translateSingleValue(value: string): string | boolean | undefined {
  if (hasKey(dbTranslations.values, value)) {
    return dbTranslations.values[value];
  } else return undefined;
}
