import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useQuestionsContext } from "../../context/questions/questions";
import { getQuestion } from "../../core/services/question";
import Loader from "../patterns/Loader/Loader";
import QuestionMedia from "../patterns/QuestionMedia/QuestionMedia";
import QuestionContent from "../patterns/QuestionContent/QuestionContent";
import QuestionControls from "../patterns/QuestionControls/QuestionControls";
import QuestionDetails from "../patterns/QuestionDetails/QuestionDetails";

export default function Question() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: getQuestion,
    retry: 1,
  });

  const { addAnsewer } = useQuestionsContext();
  const [questionCount, setQuestionCount] = useState(1);

  const nextQuestion = useCallback(() => {
    if (!data) {
      throw new Error("question is undefined");
    }
    addAnsewer(data, "B");
    refetch();
    if (questionCount === 32) console.log("move to summary");
    setQuestionCount(questionCount + 1);
  }, [refetch, questionCount, setQuestionCount, data]);

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
          <QuestionContent content={data.content} type={data.type} />
          <QuestionControls
            questionCount={questionCount}
            nextQuestion={nextQuestion}
          />
        </>
      )}
    </Container>
  );
}
