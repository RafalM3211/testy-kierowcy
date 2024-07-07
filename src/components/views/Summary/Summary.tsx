import { Box, Container, Typography } from "@mui/material";
import bgImage from "../../../images/backgrounds/wave.svg";
import { backgroundImg, flexCenter } from "../../../utility/styling";
import List from "./subcomponents/List";
import Progress from "../../patterns/Progress/Progress";
import HighlitedText from "../../atoms/HighlitedText/HighlitedText";
import { useAnswersContext } from "../../../context/Answers/Answers";
import type { AnsweredQuestion } from "../../../types/globalTypes";

function calculateOutcome(questions: AnsweredQuestion[]) {
  let points = 0;
  let correct = 0;
  let wrong = 0;
  questions.forEach((question) => {
    const { chosenAnswer, correctAnswer, value: questionValue } = question;
    if (chosenAnswer === correctAnswer) {
      correct++;
      points += questionValue;
    } else if (chosenAnswer !== null) {
      wrong++;
    }
  });

  const passed = points >= 68;
  return { correct, wrong, points, passed };
}

export default function Summary() {
  const { answeredQuestions } = useAnswersContext();

  const { correct, wrong, points, passed } =
    calculateOutcome(answeredQuestions);

  const questionsNumber = 32;
  const correctPercent = Math.round((correct / questionsNumber) * 100);
  const wrongPercent = Math.round((wrong / questionsNumber) * 100);

  return (
    <Box
      sx={{
        ...backgroundImg(bgImage),
        minHeight: "100vh",
        pt: { xs: "90px", sm: "130px" },
        pb: "50px",
        fontSize: { xs: "0.8em", sm: "1em" },
      }}
    >
      <Container
        sx={{
          ...flexCenter,
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          mb: "50px",
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            textAlign: { xs: "left", sm: "center" },
            mr: { xs: "0", sm: "20px" },
            mb: { xs: "70px", sm: "0px" },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: "2.2em",
              textAlign: "center",
              mb: { xs: "10px", sm: "0px" },
            }}
          >
            Wynik egzaminu:{" "}
            <Typography
              variant="h2"
              component="span"
              sx={{
                color: passed ? "success.light" : "error.main",
                fontSize: "1.7em",
              }}
            >
              {passed ? "zaliczony" : "niezaliczony"}
            </Typography>
          </Typography>

          <Typography variant="subtitle1" sx={{ fontSize: "1em" }}>
            poprawnie udzielone odpowiedzi:{" "}
            <HighlitedText>{`${correct}/32`}</HighlitedText>
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: "1em" }}>
            zdobyte punkty: <HighlitedText>{`${points}/74`}</HighlitedText>
          </Typography>
        </Box>
        <Progress correctPercent={correctPercent} wrongPercent={wrongPercent} />
      </Container>
      <List sx={{ fontSize: "1em" }} questions={answeredQuestions} />
    </Box>
  );
}
