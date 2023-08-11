import QuestionContainer from "./subcomponents/QuestionContainer/QuestionContainer";
import QuestionDetails from "./subcomponents/QuestionDetails/QuestionDetails";
import QuestionMedia from "./subcomponents/QuestionMedia/QuestionMedia";
import QuestionContent from "./subcomponents/QuestionContent/QuestionContent";
import QuestionControls from "./subcomponents/QuestionControls/QuestionControls";
import { Ansewer, Question as QuestionType } from "../../../types/globalTypes";
import { SxProps } from "@mui/material";

interface Props {
  question: QuestionType;
  chosenAnsewer: Ansewer;
  sx?: SxProps;
}

export default function Question(props: Props) {
  const { question, chosenAnsewer } = props;

  return (
    <QuestionContainer>
      <QuestionDetails id={question.id} value={question.value} />
      <QuestionMedia mode="preview" mediaFileName={question.media} />
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
      <QuestionControls type={question.type} mode={"preview"} />
    </QuestionContainer>
  );
}
