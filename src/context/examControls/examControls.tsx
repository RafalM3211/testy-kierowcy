import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAnswersContext } from "../Answers/Answers";
import type { Answer, Question, TimerState } from "../../types/globalTypes";
import type { SetAnswerFunction } from "./types";
import { useOnMount } from "../../utility/hooks";

interface Controls {
  nextQuestion: () => void;
  endExam: () => void;
  questionCount: number;
  selectedAnswer: Answer;
  setSelectedAnswer: SetAnswerFunction;
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

const ExamControlContext = createContext<Controls | null>(null);

export function useExamControlContext() {
  const contextValue = useContext(ExamControlContext);
  if (!contextValue) {
    const emptyControls = {
      nextQuestion: undefined,
      questionCount: undefined,
      selectedAnswer: undefined,
      setSelectedAnswer: undefined,
      isStarted: undefined,
      setStarted: undefined,
      timerState: undefined,
      setTimerState: undefined,
    };
    return emptyControls as Record<keyof Controls, undefined>;
  }

  return contextValue;
}

export default function ExamControlProvider(props: Props) {
  const { addAnswer, clearAnswers, answeredQuestions } = useAnswersContext();
  const navigate = useNavigate();
  const questionCount = answeredQuestions.length + 1;

  const [selectedAnswer, setSelectedAnswer] = useState<Answer>(null);
  const [isStarted, setStarted] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("prepare");

  function nextQuestion() {
    console.log(questionCount);
    if (!props.questionData) {
      throw new Error("question is undefined");
    }
    addAnswer(props.questionData, selectedAnswer);
    props.dataControls.refetch();
    if (questionCount === 32) {
      navigate("/summary");
    }

    setStarted(false);
    setSelectedAnswer(null);
    setTimerState("prepare");
  }

  function endExam() {
    navigate("/summary");
  }

  useOnMount(() => {
    clearAnswers();
  });

  const controls = {
    nextQuestion,
    endExam,
    questionCount,
    selectedAnswer,
    setSelectedAnswer,
    isStarted,
    setStarted,
    timerState,
    setTimerState,
  } satisfies Controls;

  return (
    <ExamControlContext.Provider value={controls}>
      {props.children}
    </ExamControlContext.Provider>
  );
}
