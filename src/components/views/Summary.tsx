import { Box, Container, Typography, Stack } from "@mui/material";
import bgImage from "../../images/backgrounds/wave.svg";
import { backgroundImg, flexCenter } from "../../utility/styling";
import List from "../patterns/List/List";
import Progress from "../patterns/Progress/Progress";
import HighlitedText from "../atoms/HighlitedText/HighlitedText";
import { useQuestionsContext } from "../../context/AnseweredQuestions/AnseweredQuestions";
import type { AnseweredQuestion } from "../../types/globalTypes";
import { Link } from "react-router-dom";

function calculateOutcome(questions: AnseweredQuestion[]) {
  let points = 0;
  let correct = 0;
  let wrong = 0;
  questions.forEach((question) => {
    const { chosenAnsewer, correctAnsewer, value: questionValue } = question;
    if (chosenAnsewer === correctAnsewer) {
      correct++;
      points += questionValue;
    } else if (chosenAnsewer !== null) {
      wrong++;
    }
  });

  const passed = points >= 68;
  return { correct, wrong, points, passed };
}

export default function Summary() {
  const { anseweredQuestions } = useQuestionsContext();

  const { correct, wrong, points, passed } =
    calculateOutcome(anseweredQuestions);

  return (
    <Box sx={{ ...backgroundImg(bgImage), minHeight: "100vh", pt: "130px" }}>
      <Container
        sx={{
          ...flexCenter,
          justifyContent: "space-between",
          mb: "50px",
        }}
        maxWidth="xl"
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h2">
            Wynik egzaminu:{" "}
            <Typography
              variant="h2"
              component="span"
              sx={{ color: passed ? "success.light" : "error.main" }}
            >
              {passed ? "zaliczony" : "niezaliczony"}
            </Typography>
          </Typography>
          <Typography variant="subtitle1">
            poprawnie udzielone odpowiedzi:{" "}
            <HighlitedText>{`${correct}/32`}</HighlitedText>
          </Typography>
          <Typography variant="subtitle1">
            zdobyte punkty: <HighlitedText>{`${points}/74`}</HighlitedText>
          </Typography>
        </Box>
        <Progress correct={correct} wrong={wrong} />
      </Container>
      <List questions={anseweredQuestions} />
    </Box>
  );
}
