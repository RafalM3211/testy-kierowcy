interface QuestionBase {
  id: number;
  value: number;
  content: string;
}

interface BasicQuestion extends QuestionBase {
  ansewers: "YES/NO";
  correctAnsewer: boolean;
  type: "basic";
}

interface SpecializedQuestion extends QuestionBase {
  ansewers: {
    A: string;
    B: string;
    C: string;
  };
  correctAnsewer: "A" | "B" | "C";
  type: "specialized";
}

export type Question = BasicQuestion | SpecializedQuestion;
