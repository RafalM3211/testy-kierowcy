import { Container } from "@mui/material";
import QuestionDetails from "./subComponents/QuestionDetails/QuestionDetails";
import QuestionMedia from "./subComponents/QuestionMedia/QuestionMedia";
import QuestionContent from "./subComponents/QuestionContent/QuestionContent";
import QuestionControls from "./subComponents/QuestionControls/QuestionControls";
import {
  Ansewer,
  BasicAnsewer,
  Question as QuestionType,
  SpecializedAnsewer,
} from "../../../types/globalTypes";
import { SxProps } from "@mui/material";
import type { QuestionMode, setAnsewerFunction } from "./types";

interface PropsBase {
  question: QuestionType;
  chosenAnsewer: Ansewer;
  sx?: SxProps;
}

interface ExamMode extends PropsBase {
  mode: QuestionMode<"exam">;
  setChosenAnsewer: setAnsewerFunction;
  questionCount: number;
  nextQuestion: () => void;
}

interface LearnMode extends PropsBase {
  mode: QuestionMode<"learn">;
}

type Props = ExamMode | LearnMode;

export default function Question(props: Props) {
  const { question } = props;

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "921px 1fr",
        gridTemplateRows: "min-content 540px auto",
        minHeight: "100vh",
        pt: "60px",
        maxWidth: { lg: "1400px" },
        ...props.sx,
      }}
    >
      <QuestionDetails id={question.id} value={question.value} />
      <QuestionMedia />
      {question.type === "basic" ? (
        <QuestionContent
          content={question.content}
          type={"basic"}
          chosenAnsewer={props.chosenAnsewer as BasicAnsewer}
          setChosenAnsewer={
            props.mode === "exam" ? props.setChosenAnsewer : undefined
          }
        />
      ) : (
        <QuestionContent
          content={question.content}
          type={question.type}
          ansewers={question.ansewers}
          chosenAnsewer={props.chosenAnsewer as SpecializedAnsewer}
          setChosenAnsewer={
            props.mode === "exam" ? props.setChosenAnsewer : undefined
          }
        />
      )}

      {props.mode === "exam" ? (
        <QuestionControls
          mode={"exam"}
          questionCount={props.questionCount}
          nextQuestion={props.nextQuestion}
        />
      ) : (
        <QuestionControls mode={"learn"} />
      )}
    </Container>
  );
}
