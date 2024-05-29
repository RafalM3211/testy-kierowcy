import { useQuery } from "@tanstack/react-query";
import { getExam } from "../../../core/services/question";
import Loader from "../../patterns/Loader/Loader";
import Question from "../../patterns/Question/Question";
import ExamControlProvider from "../../../context/examControls/examControls";
import { useOnMount } from "../../../utility/hooks";
import ErrorScreen from "../../patterns/ErrorScreen/ErrorScreen";
import { useState } from "react";
import { Question as QuestionType } from "../../../types/globalTypes";

export default function ExamQuestion() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: getExam,
    retry: 0, //for developement only
    enabled: false,
    onSuccess: (data) => {
      setCurrentQuestion(data.basic[0]);
    },
  });

  const [currentQuestion, setCurrentQuestion] = useState<
    QuestionType | undefined
  >(data?.basic[0]);

  const dataControls = {
    currentQuestion,
    setCurrentQuestion,
  };

  useOnMount(() => {
    refetch();
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorScreen />
      ) : currentQuestion ? (
        <ExamControlProvider
          dataControls={
            dataControls as typeof dataControls & {
              currentQuestion: QuestionType;
            }
          }
          examQuestions={data}
        >
          <Question question={currentQuestion as QuestionType} mode="exam" />
        </ExamControlProvider>
      ) : (
        <></>
      )}
    </>
  );
}
