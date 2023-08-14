import QuestionContainer from "./subcomponents/QuestionContainer/QuestionContainer";
import QuestionDetails from "./subcomponents/QuestionDetails/QuestionDetails";
import QuestionMedia from "./subcomponents/QuestionMedia/QuestionMedia";
import QuestionContent from "./subcomponents/QuestionContent/QuestionContent";
import QuestionControls from "./subcomponents/QuestionControls/QuestionControls";
import { Ansewer, Question as QuestionType } from "../../../types/globalTypes";
import { SxProps } from "@mui/material";
import { QuestionMode } from "./types";

interface Props {
  question: QuestionType;
  mode: QuestionMode;
  chosenAnsewer?: Ansewer;
  sx?: SxProps;
}

export default function Question(props: Props) {
  const { question, chosenAnsewer, mode } = props;

  return (
    <QuestionContainer sx={props.sx}>
      <QuestionDetails id={question.id} value={question.value} />
      <QuestionMedia
        type={question.type}
        mode={mode}
        mediaFileName={question.media}
      />
      {question.type === "basic" ? (
        <QuestionContent
          chosenAnsewer={chosenAnsewer}
          content={question.content}
          type={"basic"}
        />
      ) : (
        <QuestionContent
          chosenAnsewer={chosenAnsewer}
          content={question.content}
          type="specialized"
          ansewers={question.ansewers}
        />
      )}
      <QuestionControls type={question.type} mode={mode} />
    </QuestionContainer>
  );
}
