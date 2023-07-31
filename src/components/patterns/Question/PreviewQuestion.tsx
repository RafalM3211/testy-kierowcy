import QuestionContainer from "./subcomponents/QuestionContainer/QuestionContainer";
import QuestionDetails from "./subcomponents/QuestionDetails/QuestionDetails";
import QuestionMedia from "./subcomponents/QuestionMedia/QuestionMedia";
import QuestionContent from "./subcomponents/QuestionContent/QuestionContent";
import QuestionControls from "./subcomponents/QuestionControls/QuestionControls";
import {
  Ansewer,
  BasicAnsewer,
  Question as QuestionType,
  SpecializedAnsewer,
} from "../../../types/globalTypes";
import { SxProps } from "@mui/material";

interface Props {
  question: QuestionType;
  chosenAnsewer: Ansewer;
  sx?: SxProps;
}

export default function Question(props: Props) {
  const { question } = props;

  return (
    <QuestionContainer>
      <QuestionDetails id={question.id} value={question.value} />
      <QuestionMedia mode="preview" mediaFileName={question.media} />
      {question.type === "basic" ? (
        <QuestionContent
          content={question.content}
          type={"basic"}
          chosenAnsewer={props.chosenAnsewer as BasicAnsewer}
        />
      ) : (
        <QuestionContent
          content={question.content}
          type={question.type}
          ansewers={question.ansewers}
          chosenAnsewer={props.chosenAnsewer as SpecializedAnsewer}
        />
      )}
      <QuestionControls mode={"preview"} />
    </QuestionContainer>
  );
}
