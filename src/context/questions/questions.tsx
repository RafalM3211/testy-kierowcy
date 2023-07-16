import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { Question, Ansewer } from "../../types/globalTypes";

type AnseweredQuestion = (Question & { chosenAnsewer: Ansewer }) | null;

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

  function addAnsewer(question: Question, chosenAnsewer: Ansewer) {
    const newAnseweredQuestion = {
      ...question,
      chosenAnsewer,
    } satisfies AnseweredQuestion;
    setAnseweredQuestions([...anseweredQuestions, newAnseweredQuestion]);
    console.log("addansewer", newAnseweredQuestion);
  }

  return (
    <QuestionsContext.Provider value={{ anseweredQuestions, addAnsewer }}>
      {props.children}
    </QuestionsContext.Provider>
  );
}
