import { isQuestion } from "./typeGuards";
import { basic, specialized } from "../../tests/dummyQuestion/dummyQuestions";
import { withoutProperty } from "../../utility/utils";
import { useProvider } from "test-data-provider";

interface QuestionsProviderEntry {
  question: unknown;
  description: string;
  expectedOutcome: boolean;
}

function createEntry(
  question: unknown,
  description: string,
  expectedOutcome: boolean
): QuestionsProviderEntry {
  return { question, description, expectedOutcome };
}

const questionsProvider: QuestionsProviderEntry[] = [
  createEntry(basic, "passes on basic question", true),
  createEntry(specialized, "passes on specialized question", true),
  createEntry(
    { basic, notWantedProp: "hey" },
    "detects unwanted properties",
    false
  ),
  createEntry(
    withoutProperty(basic, "media"),
    "detects missing properties",
    false
  ),
  createEntry(
    { ...basic, type: "specialized" },
    "detects basic question type not matching with type property",
    false
  ),
  createEntry(
    { ...basic, correctAnswer: "B" },
    "detects basic question type not matching with correctAnswer property",
    false
  ),
  createEntry(
    { ...specialized, type: "basic" },
    "detects specialized question type not matching with type property",
    false
  ),
  createEntry(
    { ...specialized, correctAnswer: true },
    "detects specialized question type not matching with correctAnswer property",
    false
  ),
  createEntry(
    { ...specialized, answers: { A: "a", C: "c" } },
    "detects wrong answers structure in specialized question",
    false
  ),
];

describe("isQuestion type guard", () => {
  useProvider(
    questionsProvider,
    ({ question, description, expectedOutcome }) => {
      it(description, () => {
        //arrange

        //act
        const outcome = isQuestion(question);

        //assert
        expect(outcome).toBe(expectedOutcome);
      });
    }
  );
});
