import { Container } from "@mui/material";
import QuestionMedia from "../patterns/QuestionMedia/QuestionMedia";
import QuestionContent from "../patterns/QuestionContent/QuestionContent";
import QuestionControls from "../patterns/QuestionControls/QuestionControls";

export default function Question() {
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
      <QuestionMedia />
      <QuestionContent />
      <QuestionControls />
    </Container>
  );
}
