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
import type { setAnsewerFunction } from "./types";

interface Props {
  question: QuestionType;
  controls: Controls;
  sx?: SxProps;
}

interface Controls {
  chosenAnsewer: Ansewer;
  setChosenAnsewer: setAnsewerFunction;
  questionCount: number;
  nextQuestion: () => void;
  isStarted: boolean;
  setStarted: (value: boolean) => void;
}

export default function Question(props: Props) {
  const { question, controls } = props;

  return (
    <QuestionContainer>
      <QuestionDetails id={question.id} value={question.value} />
      <QuestionMedia
        mode="exam"
        mediaFileName={question.media}
        isStarted={controls.isStarted}
        setStarted={controls.setStarted}
      />
      {question.type === "basic" ? (
        <QuestionContent
          content={question.content}
          type="basic"
          chosenAnsewer={controls.chosenAnsewer as BasicAnsewer}
          setChosenAnsewer={controls.setChosenAnsewer}
        />
      ) : (
        <QuestionContent
          content={question.content}
          type="specialized"
          ansewers={question.ansewers}
          chosenAnsewer={controls.chosenAnsewer as SpecializedAnsewer}
          setChosenAnsewer={controls.setChosenAnsewer}
        />
      )}

      <QuestionControls
        mode={"exam"}
        questionCount={controls.questionCount}
        nextQuestion={controls.nextQuestion}
      />
    </QuestionContainer>
  );
}
