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
  ansewers: {
    A: string;
    B: string;
    C: string;
  };
  correctAnsewer: "A" | "B" | "C";
}

export type Question = BasicQuestion | SpecializedQuestion;

export interface anyObject {
  [key: string]: unknown;
}
