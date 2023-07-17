import { Box, Container, Typography, Stack } from "@mui/material";
import bgImage from "../../images/backgrounds/wave.svg";
import { backgroundImg, flexCenter } from "../../utility/styling";
import List from "../patterns/List/List";
import Progress from "../patterns/Progress/Progress";
import { basic, specialized } from "../../utility/dummyQuestion/dummyQuestions";
import HighlitedText from "../atomsReusable/HighlitedText/HighlitedText";
import { useQuestionsContext } from "../../context/questions/questions";
import { useState } from "react";

const questions = [
  basic,
  basic,
  basic,
  basic,
  basic,
  specialized,
  specialized,
  specialized,
  specialized,
];

export default function Summary() {
  const [a, seta] = useState(0);
  console.log("sum render");

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
        <Box
          onClick={() => {
            seta(a + 1);
          }}
          sx={{ textAlign: "center" }}
        >
          <Typography variant="h4" component="h2">
            Wynik egzaminu:{" "}
            <Typography
              variant="h2"
              component="span"
              sx={{ color: "error.main" }}
            >
              Niezaliczony
              <Typography variant="h6" component="span">
                {" "}
                (54%)
              </Typography>
            </Typography>
          </Typography>
          <Typography variant="subtitle1">
            poprawnie udzielone odpowiedzi: <HighlitedText>23\34</HighlitedText>
          </Typography>
        </Box>
        <Progress correct={20} wrong={30} />
      </Container>
      <List questions={questions} />
    </Box>
  );
}
