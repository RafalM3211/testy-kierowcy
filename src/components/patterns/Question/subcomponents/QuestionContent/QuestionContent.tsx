import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ABCAnswer from "../../../ABCAnswer/ABCAnswer";
import YesNoAnseswer from "../../../YesNoAnswer/YesNoAnswer";
import { useExamControlContext } from "../../../../../context/examControls/examControls";
import type {
  BasicQuestion,
  SpecializedQuestion,
  ABCanswers,
  Answer,
  BasicAnswer,
  SpecializedAnswer,
} from "../../../../../types/globalTypes";
import { over } from "lodash";

interface PropsBase {
  content: string;
  chosenAnswer?: Answer;
}

interface BasicQuesitonProps extends PropsBase {
  type: BasicQuestion["type"];
  correctAnswer?: boolean;
}

interface SpecializedQuestionProps extends PropsBase {
  type: SpecializedQuestion["type"];
  correctAnswer?: keyof ABCanswers;
  answers: ABCanswers;
}

type Props = SpecializedQuestionProps | BasicQuesitonProps;

export default function QuestionContent(props: Props) {
  const { selectedAnswer, setSelectedAnswer, nextQuestion } =
    useExamControlContext();
  const chosenAnswer = selectedAnswer ?? props.chosenAnswer;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isExamMode = props.correctAnswer === undefined;

  return (
    <Box
      sx={{
        gridRow: "3",
        gridColumn: "1/3",
        mt: "20px",
        mb: "10px",

        [theme.breakpoints.down("md")]: {
          display: "flex",
          flexDirection: "column",
          justifyContent: isExamMode ? "space-between" : "flex-start",
        },
      }}
    >
      <Box sx={{ maxHeight: { xs: "45vh", md: "32vh" }, overflowY: "auto" }}>
        <Typography
          sx={(theme) => ({
            borderLeft: `3px solid ${theme.palette.primary.main}`,
            p: "5px",
            fontSize: { xs: "0.9em", sm: "1.25em" },
          })}
          variant="h6"
        >
          {props.content}
        </Typography>
        <Box sx={{ fontSize: { xs: "0.7em", md: "1em" }, mb: "10px" }}>
          {props.type === "basic" ? (
            <YesNoAnseswer
              setChosenAnswer={setSelectedAnswer}
              chosenAnswer={chosenAnswer as BasicAnswer}
              correctAnswer={props.correctAnswer}
              sx={{ mt: "35px", fontSize: "1.6em" }}
            />
          ) : (
            <ABCAnswer
              answers={props.answers as ABCanswers}
              chosenAnswer={chosenAnswer as SpecializedAnswer}
              correctAnswer={props.correctAnswer}
              setChosenAnswer={setSelectedAnswer}
              sx={{ mt: "30px", fontSize: "1.05em" }}
            />
          )}
        </Box>
      </Box>

      {isMobile && isExamMode ? (
        <Button
          onClick={nextQuestion}
          size="medium"
          variant="contained"
          sx={{
            textTransform: "unset",
            px: "35px",
            py: "10px",
            mx: "auto",
            mt: "auto",
          }}
        >
          <Typography>Następne pytanie</Typography>
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
}
