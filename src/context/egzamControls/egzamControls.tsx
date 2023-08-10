import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../questions/questions";
import type { Ansewer, Question } from "../../types/globalTypes";
import type { setAnsewerFunction } from "./types";

interface Controls {
  chosenAnsewer: Ansewer;
  setChosenAnsewer: setAnsewerFunction;
  questionCount: number;
  nextQuestion: () => void;
  isStarted: boolean;
  setStarted: (value: boolean) => void;
}

interface DataControls {
  refetch: Function;
}

interface Props {
  dataControls: DataControls;
  questionData: Question;
  children: ReactNode;
}

const EgzamControlContext = createContext<Controls | null>(null);

export function useEgzamControlContext() {
  const contextValue = useContext(EgzamControlContext);
  if (!contextValue) {
    const emptyControls = {
      chosenAnsewer: undefined,
      setChosenAnsewer: undefined,
      isStarted: undefined,
      setStarted: undefined,
      nextQuestion: undefined,
      questionCount: undefined,
    };
    return emptyControls as Record<keyof Controls, undefined>;
  }

  return contextValue;
}

export default function EgzamControlProvider(props: Props) {
  const { addAnsewer } = useQuestionsContext();
  const navigate = useNavigate();

  const [chosenAnsewer, setChosenAnsewer] = useState<Ansewer>(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [isStarted, setStarted] = useState(false);

  const nextQuestion = () => {
    if (!props.questionData) {
      throw new Error("question is undefined");
    }
    addAnsewer(props.questionData, chosenAnsewer);
    props.dataControls.refetch();
    if (questionCount === 32) {
      navigate("/summary");
    }

    setStarted(false);
    setQuestionCount(questionCount + 1);
    setChosenAnsewer(null);
  };

  const controls = {
    chosenAnsewer,
    setChosenAnsewer,
    isStarted,
    setStarted,
    nextQuestion,
    questionCount,
  } satisfies Controls;

  return (
    <EgzamControlContext.Provider value={controls}>
      {props.children}
    </EgzamControlContext.Provider>
  );
}
