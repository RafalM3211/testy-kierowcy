import { Box, Button, Typography } from "@mui/material";
import QuestionCount from "../../../subcomponents/QuestionCount/QuestionCount";
import TimeCount from "../../../subcomponents/TimeCount/TimeCount";
import { useExamControlContext } from "../../../../../../context/examControls/examControls";
import type { ExcludeUndefined } from "../../../types";
import type { QuestionType } from "../../../../../../types/globalTypes";

interface Props {
  type: QuestionType;
}

function drawBasicQuestionCount(count: number) {
  if (count > 20) return "20/20";
  else return `${count}/20`;
}

function drawSpecializedQuestionCount(count: number) {
  if (count > 20) return count - 20 + "/12";
  else return "0/12";
}

export default function ExamMode(props: Props) {
  const controls = useExamControlContext();
  const { questionCount, nextQuestion, endExam } = controls as ExcludeUndefined<
    typeof controls
  >;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
        <QuestionCount
          label="Pytania podstawowe"
          value={drawBasicQuestionCount(questionCount)}
          active={questionCount <= 20}
        />
        <QuestionCount
          label="Pytania specjalistyczne"
          value={drawSpecializedQuestionCount(questionCount)}
          active={questionCount > 20}
        />
      </Box>
      <TimeCount type={props.type} />
      <Button
        onClick={endExam}
        variant="outlined"
        sx={{
          textTransform: "unset",
          mt: "20px",
        }}
      >
        <Typography>Zakończ egzamin</Typography>
      </Button>

      <Button
        onClick={nextQuestion}
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
    </>
  );
}
