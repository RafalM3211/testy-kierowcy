import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../AnseweredQuestions/AnseweredQuestions";
import type { Ansewer, Question, TimerState } from "../../types/globalTypes";
import type { SetAnsewerFunction } from "./types";

interface Controls {
  nextQuestion: () => void;
  endExam: () => void;
  questionCount: number;
  selectedAnsewer: Ansewer;
  setSelectedAnsewer: SetAnsewerFunction;
  isStarted: boolean;
  setStarted: (value: boolean) => void;
  timerState: TimerState;
  setTimerState: (value: TimerState) => void;
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
      nextQuestion: undefined,
      questionCount: undefined,
      selectedAnsewer: undefined,
      setSelectedAnsewer: undefined,
      isStarted: undefined,
      setStarted: undefined,
      timerState: undefined,
      setTimerState: undefined,
    };
    return emptyControls as Record<keyof Controls, undefined>;
  }

  return contextValue;
}

export default function EgzamControlProvider(props: Props) {
  const { addAnsewer, clearAnsewers } = useQuestionsContext();
  const navigate = useNavigate();

  const [questionCount, setQuestionCount] = useState(1);
  const [selectedAnsewer, setSelectedAnsewer] = useState<Ansewer>(null);
  const [isStarted, setStarted] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("prepare");

  function nextQuestion() {
    console.log(questionCount);
    if (!props.questionData) {
      throw new Error("question is undefined");
    }
    addAnsewer(props.questionData, selectedAnsewer);
    props.dataControls.refetch();
    if (questionCount === 32) {
      navigate("/summary");
    }

    setStarted(false);
    setQuestionCount(questionCount + 1);
    setSelectedAnsewer(null);
    setTimerState("prepare");
  }

  function endExam() {
    navigate("/summary");
  }

  useEffect(() => {
    if (questionCount === 1) {
      clearAnsewers();
    }
  }, [questionCount, clearAnsewers]);

  const controls = {
    nextQuestion,
    endExam,
    questionCount,
    selectedAnsewer,
    setSelectedAnsewer,
    isStarted,
    setStarted,
    timerState,
    setTimerState,
  } satisfies Controls;

  return (
    <EgzamControlContext.Provider value={controls}>
      {props.children}
    </EgzamControlContext.Provider>
  );
}
