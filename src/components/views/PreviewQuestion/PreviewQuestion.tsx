import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Question from "../../patterns/Question/Question";
import { useAnsewersContext } from "../../../context/Ansewers/Ansewers";
import bgImage from "../../../images/backgrounds/wave.svg";
import { backgroundImg } from "../../../utility/styling";
import ErrorScreen from "../../patterns/ErrorScreen/ErrorScreen";

export default function PreviewQuestion() {
  const id = useParams().id as string;
  const { anseweredQuestions } = useAnsewersContext();
  const question = anseweredQuestions.find(
    (quesiton) => quesiton.id === parseInt(id)
  );

  //todo: kiedy pytanie nie bedzie w kontekscie to rob requesta po te pyanie

  return (
    <Box sx={{ minHeight: "100vh", ...backgroundImg(bgImage) }}>
      {!question ? (
        <ErrorScreen />
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
