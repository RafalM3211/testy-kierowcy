interface QuestionBase {
  id: number;
  content: string;
  value: 1 | 2 | 3;
  media: string;
}

export type QuestionType = "basic" | "specialized";

export interface BasicQuestion extends QuestionBase {
  type: Extract<QuestionType, "basic">;
  correctAnswer: boolean;
}

export interface SpecializedQuestion extends QuestionBase {
  type: Extract<QuestionType, "specialized">;
  answers: ABCanswers;
  correctAnswer: keyof ABCanswers;
}

export type Question = BasicQuestion | SpecializedQuestion;

export type BasicAnswer = BasicQuestion["correctAnswer"] | null;

export type SpecializedAnswer = SpecializedQuestion["correctAnswer"] | null;

export interface AnsweredBasicQuestion extends BasicQuestion {
  chosenAnswer: BasicAnswer;
}

export interface AnsweredSpecializedQuestion extends SpecializedQuestion {
  chosenAnswer: SpecializedAnswer;
}

export type AnsweredQuestion =
  | AnsweredBasicQuestion
  | AnsweredSpecializedQuestion;

export type ABCanswers = {
  A: string;
  B: string;
  C: string;
};

export type Answer = BasicAnswer | SpecializedAnswer;

export type TimerState = "prepare" | "wait" | "answer";
