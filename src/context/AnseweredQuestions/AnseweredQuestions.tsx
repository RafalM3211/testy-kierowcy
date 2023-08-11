import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type {
  Question,
  Ansewer,
  AnseweredQuestion,
  BasicQuestion,
  BasicAnsewer,
  SpecializedAnsewer,
} from "../../types/globalTypes";

interface Props {
  children: ReactNode;
}

interface QuesitonsContextType {
  anseweredQuestions: AnseweredQuestion[];
  addAnsewer: (question: Question, chosenAnsewer: Ansewer) => void;
}

const QuestionsContext = createContext<QuesitonsContextType | null>(null);

export function useQuestionsContext() {
  const contextValue = useContext(QuestionsContext);
  if (contextValue === null) {
    throw new Error("do not use questions context outside provider");
  }

  return contextValue;
}

export function QuestionsProvider(props: Props) {
  const [anseweredQuestions, setAnseweredQuestions] = useState<
    AnseweredQuestion[]
  >([]);

  function addAnsewer<Q extends Question>(
    question: Q,
    chosenAnsewer: Q extends BasicQuestion ? BasicAnsewer : SpecializedAnsewer
  ) {
    const newAnseweredQuestion = {
      ...question,
      chosenAnsewer: chosenAnsewer,
    } as AnseweredQuestion;

    setAnseweredQuestions([...anseweredQuestions, newAnseweredQuestion]);
    console.log("addansewer", newAnseweredQuestion);
  }

  return (
    <QuestionsContext.Provider value={{ anseweredQuestions, addAnsewer }}>
      {props.children}
    </QuestionsContext.Provider>
  );
}
