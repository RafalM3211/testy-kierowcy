import QuestionContainer from "./subcomponents/QuestionContainer/QuestionContainer";
import QuestionDetails from "./subcomponents/QuestionDetails/QuestionDetails";
import QuestionMedia from "./subcomponents/QuestionMedia/QuestionMedia";
import QuestionContent from "./subcomponents/QuestionContent/QuestionContent";
import QuestionControls from "./subcomponents/QuestionControls/QuestionControls";
import { Question as QuestionType } from "../../../types/globalTypes";
import { SxProps } from "@mui/material";

interface Props {
  question: QuestionType;
  sx?: SxProps;
}

export default function Question(props: Props) {
  const { question } = props;

  return (
    <QuestionContainer>
      <QuestionDetails id={question.id} value={question.value} />
      <QuestionMedia mode="exam" mediaFileName={question.media} />
      {question.type === "basic" ? (
        <QuestionContent content={question.content} type="basic" />
      ) : (
        <QuestionContent
          content={question.content}
          type="specialized"
          ansewers={question.ansewers}
        />
      )}

      <QuestionControls type={question.type} mode={"exam"} />
    </QuestionContainer>
  );
}
