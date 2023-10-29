import { Box, Typography } from "@mui/material";
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
  const { selectedAnswer, setSelectedAnswer } = useExamControlContext();

  const chosenAnswer = selectedAnswer ?? props.chosenAnswer;

  return (
    <Box sx={{ gridRow: "3", gridColumn: "1/3", mt: "20px" }}>
      <Typography
        sx={(theme) => ({
          borderLeft: `3px solid ${theme.palette.primary.main}`,
          p: "5px",
        })}
        variant="h6"
      >
        {props.content}
      </Typography>
      <Box>
        {props.type === "basic" ? (
          <YesNoAnseswer
            setChosenAnswer={setSelectedAnswer}
            chosenAnswer={chosenAnswer as BasicAnswer}
            correctAnswer={props.correctAnswer}
            size={5}
            sx={{ mt: "35px" }}
          />
        ) : (
          <ABCAnswer
            answers={props.answers as ABCanswers}
            chosenAnswer={chosenAnswer as SpecializedAnswer}
            correctAnswer={props.correctAnswer}
            setChosenAnswer={setSelectedAnswer}
            sx={{ mt: "35px" }}
          />
        )}
      </Box>
    </Box>
  );
}
