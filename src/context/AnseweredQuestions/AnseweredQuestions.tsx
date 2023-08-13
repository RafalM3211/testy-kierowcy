import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type {
  Question,
  Ansewer,
  AnseweredQuestion,
  BasicAnsewer,
  SpecializedAnsewer,
} from "../../types/globalTypes";

interface Props {
  children: ReactNode;
}

interface QuesitonsContextType {
  anseweredQuestions: AnseweredQuestion[];
  addAnsewer: (question: Question, chosenAnsewer: Ansewer) => void;
  clearAnsewers: () => void;
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

  function addAnsewer(
    question: Question,
    chosenAnsewer: BasicAnsewer | SpecializedAnsewer
  ) {
    const newAnseweredQuestion = {
      ...question,
      chosenAnsewer: chosenAnsewer,
    } as AnseweredQuestion;

    setAnseweredQuestions([...anseweredQuestions, newAnseweredQuestion]);
  }

  function clearAnsewers() {
    if (anseweredQuestions.length > 0) {
      setAnseweredQuestions([]);
    }
  }

  return (
    <QuestionsContext.Provider
      value={{ anseweredQuestions, addAnsewer, clearAnsewers }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
}
