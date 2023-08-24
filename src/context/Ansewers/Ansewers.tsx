import { createContext, useState, useContext } from "react";
import { useParams } from "react-router-dom";
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

interface AnsewersContextType {
  anseweredQuestions: AnseweredQuestion[];
  addAnsewer: (question: Question, chosenAnsewer: Ansewer) => void;
  clearAnsewers: () => void;
}

const AnsewersContext = createContext<AnsewersContextType | null>(null);

export function useAnsewersContext() {
  const contextValue = useContext(AnsewersContext);
  if (contextValue === null) {
    throw new Error("do not use questions context outside provider");
  }

  return contextValue;
}

export function AnsewersProvider(props: Props) {
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

    let i = 0;
    anseweredQuestions.forEach((a) => {
      i += a.value;
    });
    i += newAnseweredQuestion.value;
    console.log(i);
    setAnseweredQuestions([...anseweredQuestions, newAnseweredQuestion]);
  }

  function clearAnsewers() {
    if (anseweredQuestions.length > 0) {
      setAnseweredQuestions([]);
    }
  }

  return (
    <AnsewersContext.Provider
      value={{ anseweredQuestions, addAnsewer, clearAnsewers }}
    >
      {props.children}
    </AnsewersContext.Provider>
  );
}
