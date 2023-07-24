import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../../context/questions/questions";
import { getQuestion } from "../../core/services/question";
import Loader from "../patterns/Loader/Loader";
import Question from "../patterns/Question/Question";
import type {
  Ansewer,
  BasicAnsewer,
  BasicQuestion,
  SpecializedAnsewer,
} from "../../types/globalTypes";

export default function Exam() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: getQuestion,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  const { addAnsewer } = useQuestionsContext();

  const [chosenAnsewer, setChosenAnsewer] = useState<Ansewer>(null);
  const [questionCount, setQuestionCount] = useState(1);

  const nextQuestion = useCallback(() => {
    if (!data) {
      throw new Error("question is undefined");
    }
    addAnsewer(data, chosenAnsewer);
    refetch();
    if (questionCount === 32) {
      navigate("/summary");
    }
    setQuestionCount(questionCount + 1);
    setChosenAnsewer(null);
  }, [
    refetch,
    questionCount,
    setQuestionCount,
    data,
    chosenAnsewer,
    setChosenAnsewer,
  ]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        "error"
      ) : (
        <Question
          question={{ ...data }}
          mode="exam"
          setChosenAnsewer={setChosenAnsewer}
          chosenAnsewer={chosenAnsewer}
          nextQuestion={nextQuestion}
          questionCount={questionCount}
        />
      )}
    </>
  );
}
