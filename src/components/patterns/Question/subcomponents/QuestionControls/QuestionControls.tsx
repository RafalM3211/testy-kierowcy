import { Box, Button, Typography } from "@mui/material";
import { flexCenter } from "../../../../../utility/styling";
import QuestionCount from "../../subcomponents/QuestionCount/QuestionCount";
import TimeCount from "../../subcomponents/TimeCount/TimeCount";
import { useEgzamControlContext } from "../../../../../context/egzamControls/egzamControls";
import type { QuestionMode, ExcludeUndefined } from "../../types";
import type { Question } from "../../../../../types/globalTypes";

interface Props {
  type: Question["type"];
  mode: QuestionMode;
}

function drawBasicQuestionCount(count: number) {
  if (count > 20) return "20/20";
  else return `${count}/20`;
}

function drawSpecializedQuestionCount(count: number) {
  if (count > 20) return count - 20 + "/12";
  else return "0/12";
}

export default function QuestionControls(props: Props) {
  const controls = useEgzamControlContext();

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
      {props.mode === "exam" &&
        (() => {
          const { questionCount, nextQuestion, endExam } =
            controls as ExcludeUndefined<typeof controls>;
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
        })()}
    </Box>
  );
}
