import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "../../core/services/question";
import Loader from "../patterns/Loader/Loader";
import Question from "../patterns/Question/Question";
import ErrorBlock from "../patterns/ErrorBlock/ErrorBlock";
import EgzamControlProvider from "../../context/egzamControls/egzamControls";

export default function ExamQuestion() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: getQuestion,
    retry: 0, //for developement only
    refetchOnWindowFocus: false,
  });

  const dataControls = {
    refetch,
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
        <EgzamControlProvider dataControls={dataControls} questionData={data}>
          <Question question={{ ...data }} mode="exam" />
        </EgzamControlProvider>
      )}
    </>
  );
}
