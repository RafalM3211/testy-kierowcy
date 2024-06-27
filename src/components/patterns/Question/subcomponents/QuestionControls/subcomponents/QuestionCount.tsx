import { useMediaQuery, useTheme } from "@mui/material";
import QuestionCountUnit from "./QuestionCountUnit";

interface Props {
  questionCount: number;
}

function drawSpecializedQuestionCount(count: number) {
  if (count > 20) return count - 20 + "/12";
  else return "0/12";
}

function drawBasicQuestionCount(count: number) {
  if (count > 20) return "20/20";
  else return `${count}/20`;
}

export default function QuestionCount(props: Props) {
  const { questionCount } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMobile ? (
        <QuestionCountUnit
          label={questionCount <= 20 ? "podstawowe" : "specjalistyczne"}
          value={
            questionCount <= 20
              ? drawBasicQuestionCount(questionCount)
              : drawSpecializedQuestionCount(questionCount)
          }
          active
        />
      ) : (
        <>
          <QuestionCountUnit
            label="Pytania podstawowe"
            value={drawBasicQuestionCount(questionCount)}
            active={questionCount <= 20}
          />
          <QuestionCountUnit
            label="Pytania specjalistyczne"
            value={drawSpecializedQuestionCount(questionCount)}
            active={questionCount > 20}
          />
        </>
      )}
    </>
  );
}
