import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../../context/questions/questions";
import { getQuestion } from "../../core/services/question";
import Loader from "../patterns/Loader/Loader";
import ExamQuestion from "../patterns/Question/ExamQuestion";
import ErrorBlock from "../patterns/ErrorBlock/ErrorBlock";
import type { Ansewer } from "../../types/globalTypes";

export default function Exam() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: getQuestion,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  const { addAnsewer } = useQuestionsContext();

  const [chosenAnsewer, setChosenAnsewer] = useState<Ansewer>(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [isStarted, setStarted] = useState(false);

  const nextQuestion = useCallback(() => {
    if (!data) {
      throw new Error("question is undefined");
    }
    addAnsewer(data, chosenAnsewer);
    refetch();
    if (questionCount === 32) {
      navigate("/summary");
    }

    setStarted(false);
    setQuestionCount(questionCount + 1);
    setChosenAnsewer(null);
  }, [
    refetch,
    questionCount,
    setQuestionCount,
    data,
    chosenAnsewer,
    setChosenAnsewer,
    setStarted,
    addAnsewer,
    navigate,
  ]);

  const controls = {
    setChosenAnsewer,
    chosenAnsewer,
    nextQuestion,
    questionCount,
    isStarted,
    setStarted,
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorBlock
          sx={{ height: "100vh", pb: "50px", boxSizing: "border-box" }}
        />
      ) : (
        <ExamQuestion question={{ ...data }} controls={controls} />
      )}
    </>
  );
}
