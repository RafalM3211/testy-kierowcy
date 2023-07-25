import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import QuestionComponent from "../patterns/Question/Question";
import ErrorBlock from "../patterns/ErrorBlock/ErrorBlock";
import { useQuestionsContext } from "../../context/questions/questions";

export default function Question() {
  const id = useParams().id as string;
  const { anseweredQuestions } = useQuestionsContext();
  console.log(anseweredQuestions, id);
  const question = anseweredQuestions.find(
    (quesiton) => quesiton.id === parseInt(id)
  );

  return (
    <Box sx={{ height: "100vh" }}>
      {!question ? (
        <ErrorBlock />
      ) : (
        <QuestionComponent
          mode="learn"
          question={question}
          chosenAnsewer={question.chosenAnsewer}
          sx={{ pt: "80px" }}
        />
      )}
    </Box>
  );
}
