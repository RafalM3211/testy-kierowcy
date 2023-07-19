interface QuestionBase {
  id: number;
  content: string;
  value: number;
  media: any;
}

export interface BasicQuestion extends QuestionBase {
  type: "basic";
  correctAnsewer: boolean;
}

export interface SpecializedQuestion extends QuestionBase {
  type: "specialized";
  ansewers: ABCansewers;
  correctAnsewer: "A" | "B" | "C";
}

export type ABCansewers = {
  A: string;
  B: string;
  C: string;
};

export type Ansewer =
  | BasicQuestion["correctAnsewer"]
  | SpecializedQuestion["correctAnsewer"];

export type Question = BasicQuestion | SpecializedQuestion;

export type AnseweredQuestion = Question & { chosenAnsewer: Ansewer };

export interface anyObject {
  [key: string]: unknown;
}
