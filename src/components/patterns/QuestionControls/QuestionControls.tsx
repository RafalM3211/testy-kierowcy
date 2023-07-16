import { Box, Button, Typography } from "@mui/material";
import { flexCenter } from "../../../utility/styling";
import QuestionCount from "../QuestionCount/QuestionCount";
import TimeCount from "../TimeCount/TimeCount";

interface Props {
  questionCount: number;
  nextQuestion: () => void;
}

function drawBasicQuestionCount(count: number) {
  if (count > 20) return "20/20";
  else return `${count}/20`;
}

function drawSpecializedQuestionCount(count: number) {
  if (count > 20) return count - 20 + "/12";
  else return "0/20";
}

export default function QuestionControls(props: Props) {
  return (
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
      <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
        <QuestionCount
          label="Pytania podstawowe"
          value={drawBasicQuestionCount(props.questionCount)}
          active={props.questionCount <= 20}
        />
        <QuestionCount
          label="Pytania specjalistyczne"
          value={drawSpecializedQuestionCount(props.questionCount)}
          active={props.questionCount > 20}
        />
      </Box>
      <TimeCount />

      <Button
        onClick={props.nextQuestion}
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
  );
}
