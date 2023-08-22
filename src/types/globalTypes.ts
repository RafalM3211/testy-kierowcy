interface QuestionBase {
  id: number;
  content: string;
  value: 1 | 2 | 3;
  media: string;
}

export type QuestionType = "basic" | "specialized";

export interface BasicQuestion extends QuestionBase {
  type: Extract<QuestionType, "basic">;
  correctAnsewer: boolean;
}

export interface SpecializedQuestion extends QuestionBase {
  type: Extract<QuestionType, "specialized">;
  ansewers: ABCansewers;
  correctAnsewer: keyof ABCansewers;
}

export type Question = BasicQuestion | SpecializedQuestion;

export type BasicAnsewer = BasicQuestion["correctAnsewer"] | null;

export type SpecializedAnsewer = SpecializedQuestion["correctAnsewer"] | null;

export interface AnseweredBasicQuestion extends BasicQuestion {
  chosenAnsewer: BasicAnsewer;
}

export interface AnseweredSpecializedQuestion extends SpecializedQuestion {
  chosenAnsewer: SpecializedAnsewer;
}

export type AnseweredQuestion =
  | AnseweredBasicQuestion
  | AnseweredSpecializedQuestion;

export type ABCansewers = {
  A: string;
  B: string;
  C: string;
};

export type Ansewer = BasicAnsewer | SpecializedAnsewer;

export type TimerState = "prepare" | "wait" | "ansewer";
