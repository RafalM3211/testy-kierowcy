import { useMediaQuery, useTheme } from "@mui/material";
import QuestionCountUnit from "./QuestionCountUnit";

interface Props {
  questionCount: number;
  total?: number;
}

function drawSpecializedQuestionCount(count: number, total: number = 12) {
  if (count > 20) return count - 20 + "/" + total;
  else return "0/" + total;
}

function drawBasicQuestionCount(count: number, total: number = 20) {
  if (count > 20) return "20/" + total;
  else return count + "/" + total;
}

export default function QuestionCount(props: Props) {
  const { questionCount, total = 32 } = props;

  const totalBasic = total >= 20 ? 20 : total;
  const totalSpecialized = total >= 20 ? total - 20 : 0;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMobile ? (
        <QuestionCountUnit
          label={questionCount <= 20 ? "podstawowe" : "specjalistyczne"}
          value={
            questionCount <= 20
              ? drawBasicQuestionCount(questionCount, totalBasic)
              : drawSpecializedQuestionCount(questionCount, totalSpecialized)
          }
          active
        />
      ) : (
        <>
          <QuestionCountUnit
            label="Pytania podstawowe"
            value={drawBasicQuestionCount(questionCount, totalBasic)}
            active={questionCount <= 20}
          />
          <QuestionCountUnit
            label="Pytania specjalistyczne"
            value={drawSpecializedQuestionCount(
              questionCount,
              totalSpecialized
            )}
            active={questionCount > 20}
          />
        </>
      )}
    </>
  );
}
