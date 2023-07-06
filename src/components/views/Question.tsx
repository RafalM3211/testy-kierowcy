import { Box, Button, Container, Typography } from "@mui/material";
import { flexCenter } from "../../utility/styling";
import InfoChip from "../reusableAtoms/InfoChip/InfoChip";
import HighlitedText from "../reusableAtoms/HighlitedText/HighlitedText";
import QuestionCount from "../patterns/QuestionCount/QuestionCount";
import YesNoAnseswer from "../patterns/YesNoAnsewer/YesNoAnsewer";
import ABCAnsewer from "../patterns/ABCAnsewer/ABCAnsewer";
import TimeCount from "../patterns/TimeCount/TimeCount";
import QuestionMedia from "../patterns/QuestionMedia/QuestionMedia";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "min-content",
          gridRow: "1",
          gridColumn: "1",
        }}
      >
        <InfoChip>
          Id pytania:{" "}
          <HighlitedText sx={{ fontSize: "1.2em" }}>23233</HighlitedText>
        </InfoChip>
        <InfoChip>
          Wartość punktowa:{" "}
          <HighlitedText sx={{ fontSize: "1.2em" }}>3</HighlitedText>
        </InfoChip>
        <InfoChip>
          Kategoria: <HighlitedText sx={{ fontSize: "1.2em" }}>B</HighlitedText>
        </InfoChip>
      </Box>
      <QuestionMedia />
      <Box sx={{ gridRow: "3", gridColumn: "1/3" }}>
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
          {/* <YesNoAnseswer /> */}
          <ABCAnsewer />
        </Box>
      </Box>

      <Box
        sx={{
          ...flexCenter,
          justifyContent: "center",
          flexDirection: "column",
          ml: "30px",
          gridRow: "2",
          gridColumn: "2",
        }}
      >
        <Box sx={{ display: "flex", mb: "20px" }}>
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
