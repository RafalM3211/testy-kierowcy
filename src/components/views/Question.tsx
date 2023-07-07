import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "../../core/services/question";
import QuestionMedia from "../patterns/QuestionMedia/QuestionMedia";
import QuestionContent from "../patterns/QuestionContent/QuestionContent";
import QuestionControls from "../patterns/QuestionControls/QuestionControls";
import QuestionDetails from "../patterns/QuestionDetails/QuestionDetails";

export default function Question() {
  const { data, isLoading } = useQuery({
    queryKey: ["question"],
    queryFn: getQuestion,
    retry: false,
  });

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto auto auto",
        minHeight: "100vh",
        pt: "60px",
        maxWidth: { lg: "1400px" },
      }}
    >
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <QuestionDetails />
          <QuestionMedia />
          <QuestionContent />
          <QuestionControls />
        </>
      )}
    </Container>
  );
}
