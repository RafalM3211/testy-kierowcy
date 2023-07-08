import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "../../core/services/question";
import Loader from "../patterns/Loader/Loader";
import QuestionMedia from "../patterns/QuestionMedia/QuestionMedia";
import QuestionContent from "../patterns/QuestionContent/QuestionContent";
import QuestionControls from "../patterns/QuestionControls/QuestionControls";
import QuestionDetails from "../patterns/QuestionDetails/QuestionDetails";
import { useCallback, useState } from "react";

export default function Question() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: getQuestion,
  });

  const [questionCount, setQuestionCount] = useState(1);

  const nextQuestion = useCallback(
    function () {
      refetch();
      if (questionCount === 32) console.log("move to summary");
      setQuestionCount(questionCount + 1);
    },
    [refetch, questionCount, setQuestionCount]
  );

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "921px 1fr",
        gridTemplateRows: "min-content 540px auto",
        minHeight: "100vh",
        pt: "60px",
        maxWidth: { lg: "1400px" },
      }}
    >
      {isLoading ? (
        <Loader label="Ładowanie pytania..." />
      ) : isError ? (
        "error"
      ) : (
        <>
          <QuestionDetails id={data.id} value={data.value} />
          <QuestionMedia />
          <QuestionContent
            content={data.content}
            ansewers={data.ansewers}
            type={data.type}
          />
          <QuestionControls
            questionCount={questionCount}
            nextQuestion={nextQuestion}
          />
        </>
      )}
    </Container>
  );
}
