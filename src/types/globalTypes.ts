interface QuestionBase {
  id: number;
  content: string;
  value: 1 | 2 | 3;
  media: string;
}

export interface BasicQuestion extends QuestionBase {
  type: "basic";
  correctAnsewer: boolean;
}

export type BasicAnsewer = BasicQuestion["correctAnsewer"] | null;

export interface AnseweredBasicQuestion extends BasicQuestion {
  chosenAnsewer: BasicAnsewer;
}

export interface SpecializedQuestion extends QuestionBase {
  type: "specialized";
  ansewers: ABCansewers;
  correctAnsewer: keyof ABCansewers;
}

export type SpecializedAnsewer = SpecializedQuestion["correctAnsewer"] | null;

export interface AnseweredSpecializedQuestion extends SpecializedQuestion {
  chosenAnsewer: SpecializedAnsewer;
}

export type Question = BasicQuestion | SpecializedQuestion;

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

export interface anyObject {
  [key: string]: unknown;
}
