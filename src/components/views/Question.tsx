import { Box, Button, Container, Typography } from "@mui/material";
import { flexCenter } from "../../utility/styling";
import InfoChip from "../atoms/InfoChip/InfoChip";
import HighlitedText from "../atoms/HighlitedText/HighlitedText";
import QuestionCount from "../patterns/QuestionCount/QuestionCount";
import YesNoAnseswer from "../patterns/YesNoAnsewer/YesNoAnsewer";

import TimeCount from "../patterns/TimeCount/TimeCount";

export default function Question() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        ...flexCenter,
        minHeight: "100vh",
        py: "100px",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <InfoChip>
            Id pytania:{" "}
            <HighlitedText sx={{ fontSize: "1.2em" }}>23233</HighlitedText>
          </InfoChip>
          <InfoChip>
            Wartość punktowa:{" "}
            <HighlitedText sx={{ fontSize: "1.2em" }}>3</HighlitedText>
          </InfoChip>
          <InfoChip>
            Kategoria:{" "}
            <HighlitedText sx={{ fontSize: "1.2em" }}>B</HighlitedText>
          </InfoChip>
        </Box>
        <Box
          sx={{
            width: "1024px",
            height: "600px",
            bgcolor: "grey",
            mb: "20px",
            mt: "15px",
          }}
        ></Box>
        <Typography
          sx={(theme) => ({
            borderLeft: `3px solid ${theme.palette.primary.main}`,
            p: "5px",
          })}
          variant="h6"
        >
          Czy jadąc na wprost masz pierwszeństwo przed pojazdem nadjeżdżającym z
          kierunku przeciwnego, skręcającym w lewo?
        </Typography>
        <Box>
          <YesNoAnseswer />
        </Box>
      </Box>

      <Box
        sx={{
          ...flexCenter,
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
          ml: "30px",
        }}
      >
        <Box sx={{ display: "flex", mb: "30px" }}>
          <QuestionCount
            label="Pytania podstawowe"
            value="3/20"
            active={true}
          />
          <QuestionCount
            label="Pytania specjalistyczne"
            value="3/12"
            active={false}
          />
        </Box>
        <TimeCount />
        <Button
          size="large"
          variant="contained"
          sx={{
            textTransform: "unset",
            mt: "100px",
            px: "35px",
            py: "10px",
          }}
        >
          <Typography variant="h6">Następne pytanie</Typography>
        </Button>
      </Box>
    </Container>
  );
}
