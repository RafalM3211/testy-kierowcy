import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Question from "../patterns/Question/Question";
import ErrorBlock from "../patterns/ErrorBlock/ErrorBlock";
import { useQuestionsContext } from "../../context/questions/questions";

export default function PreviewQuestion() {
  const id = useParams().id as string;
  const { anseweredQuestions } = useQuestionsContext();
  console.log(anseweredQuestions, id);
  const question = anseweredQuestions.find(
    (quesiton) => quesiton.id === parseInt(id)
  );

  //todo: kiedy pytanie nie bedzie w kontekscie to rob requesta po te pyanie

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {!question ? (
        <ErrorBlock
          sx={{
            height: "100vh",
          }}
        />
      ) : (
        <Question
          question={question}
          mode="preview"
          chosenAnsewer={question.chosenAnsewer}
          sx={{ pt: "80px" }}
        />
      )}
    </Box>
  );
}
