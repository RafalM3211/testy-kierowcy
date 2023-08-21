import { useMutation, useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useEffect, useState } from "react";
import { getQuestion, resetSession } from "../../core/services/question";
import Loader from "../patterns/Loader/Loader";
import Question from "../patterns/Question/Question";
import ErrorBlock from "../patterns/ErrorBlock/ErrorBlock";
import EgzamControlProvider from "../../context/egzamControls/egzamControls";
import { useOnMount } from "../../utility/hooks";

export default function ExamQuestion() {
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
