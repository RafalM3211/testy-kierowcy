import { useQuery } from "@tanstack/react-query";
import { getQuestion, resetSession } from "../../../core/services/question";
import Loader from "../../patterns/Loader/Loader";
import Question from "../../patterns/Question/Question";
import ExamControlProvider from "../../../context/examControls/examControls";
import { useOnMount } from "../../../utility/hooks";
import ErrorScreen from "../../patterns/ErrorScreen/ErrorScreen";
import { useEffect } from "react";

export default function ExamQuestion() {
  //todo: error handling dla resetSession

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: getQuestion,
    retry: 0, //for developement only
    enabled: false,
  });

  const dataControls = {
    refetch,
  };

  useOnMount(() => {
    resetSession().then(() => {
      refetch();
    });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorScreen />
      ) : (
        <ExamControlProvider dataControls={dataControls} questionData={data}>
          <Question question={{ ...data }} mode="exam" />
        </ExamControlProvider>
      )}
    </>
  );
}
