import { Box } from "@mui/material";
import AnswerButton from "../../atoms/AnswerButton/AnswerButton";
import { getColorForAnswerButton } from "../../../utility/utils";
import { BasicAnswer } from "../../../types/globalTypes";
import type { SxProps } from "@mui/material/styles";

interface Props {
  setChosenAnswer?: (chosenAnswer: boolean) => void;
  chosenAnswer: BasicAnswer;
  correctAnswer?: boolean;
  size: number;
  sx?: SxProps;
}

export default function YesNoAnseswer(props: Props) {
  const px = props.size * 8 + "px";
  const py = props.size + "px";
  const fontSize = props.size * 0.34 + "em";
  const mr = props.size * 10 + "px";

  function handleAnswerChange(answer: boolean) {
    if (props.setChosenAnswer) {
      props.setChosenAnswer(answer);
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", ...props.sx }}>
      <AnswerButton
        onClick={() => {
          handleAnswerChange(true);
        }}
        checked={props.chosenAnswer === true}
        size="large"
        sx={{
          px: px,
          py: py,
          fontSize: fontSize,
          mr: mr,
        }}
        disableRipple={!props.setChosenAnswer}
        color={getColorForAnswerButton(
          true,
          props.correctAnswer,
          props.chosenAnswer
        )}
      >
        tak
      </AnswerButton>
      <AnswerButton
        onClick={() => {
          handleAnswerChange(false);
        }}
        checked={props.chosenAnswer === false}
        size="large"
        sx={{ px: px, py: py, fontSize: fontSize }}
        disableRipple={!props.setChosenAnswer}
        color={getColorForAnswerButton(
          false,
          props.correctAnswer,
          props.chosenAnswer
        )}
      >
        nie
      </AnswerButton>
    </Box>
  );
}
