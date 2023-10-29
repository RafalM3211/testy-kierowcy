import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import QuestionCount from "../../../subcomponents/QuestionCount/QuestionCount";
import { useAnswersContext } from "../../../../../../context/Answers/Answers";
import ButtonLink from "../../../../../atoms/ButtonLink/ButtonLink";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function drawBasicQuestionCount(count: number, total: number) {
  const basicQuestionsAmount = Math.min(total, 20);
  if (count > 20) return "20/20";
  else return `${count}/${basicQuestionsAmount}`;
}

function drawSpecializedQuestionCount(count: number, total: number) {
  const specializedQuestionsAmount = Math.max(total - 20, 0);
  const specializedQuestionsCount = Math.max(count - 20, 0);

  return `${specializedQuestionsCount}/${specializedQuestionsAmount}`;
}

export default function PreviewMode() {
  const { answeredQuestions } = useAnswersContext();
  const questionId = useParams().id as string;
  const questionIndex = answeredQuestions.findIndex(
    (quesiton) => quesiton.id === parseInt(questionId)
  );
  const questionCount = questionIndex + 1;
  const questionsAmount = answeredQuestions.length;

  const previousQuestionId =
    questionCount === 1 ? null : answeredQuestions[questionIndex - 1].id;
  const nextQuestionId =
    questionCount === questionsAmount
      ? null
      : answeredQuestions[questionIndex + 1].id;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
        <QuestionCount
          label="Pytania podstawowe"
          value={drawBasicQuestionCount(questionCount, questionsAmount)}
          active={questionCount <= 20}
        />
        <QuestionCount
          label="Pytania specjalistyczne"
          value={drawSpecializedQuestionCount(questionCount, questionsAmount)}
          active={questionCount > 20}
        />
      </Box>

      <ButtonLink
        to="/summary"
        size="small"
        variant="outlined"
        sx={{
          mt: "50px",
          mb: "20px",
        }}
      >
        <Typography variant="h6">Powrót do podsumowania</Typography>
      </ButtonLink>
      <Box>
        <ButtonLink
          disabled={!previousQuestionId}
          to={"/question/" + previousQuestionId}
        >
          <KeyboardArrowLeftIcon />
          Poprzednie
        </ButtonLink>
        <ButtonLink
          disabled={!nextQuestionId}
          to={"/question/" + nextQuestionId}
        >
          Następne
          <KeyboardArrowRightIcon />
        </ButtonLink>
      </Box>
    </>
  );
}
