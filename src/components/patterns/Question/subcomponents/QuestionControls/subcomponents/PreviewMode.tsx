import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import QuestionCount from "../../../subcomponents/QuestionCount/QuestionCount";
import { useAnsewersContext } from "../../../../../../context/Ansewers/Ansewers";
import ButtonLink from "../../../../../atoms/ButtonLink/ButtonLink";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { AnseweredQuestion } from "../../../../../../types/globalTypes";

function drawBasicQuestionCount(count: number) {
  if (count > 20) return "20/20";
  else return `${count}/20`;
}

function drawSpecializedQuestionCount(count: number) {
  if (count > 20) return count - 20 + "/12";
  else return "0/12";
}

export default function PreviewMode() {
  const { anseweredQuestions } = useAnsewersContext();
  const questionId = useParams().id as string;
  const questionIndex = anseweredQuestions.findIndex(
    (quesiton) => quesiton.id === parseInt(questionId)
  );
  const questionCount = questionIndex + 1;

  const previousQuestionId =
    questionCount === 1 ? null : anseweredQuestions[questionIndex - 1].id;
  const nextQuestionId =
    questionCount === 32 ? null : anseweredQuestions[questionIndex + 1].id;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
        <QuestionCount
          label="Pytania podstawowe"
          value={drawBasicQuestionCount(questionCount)}
          active={questionCount <= 20}
        />
        <QuestionCount
          label="Pytania specjalistyczne"
          value={drawSpecializedQuestionCount(questionCount)}
          active={questionCount > 20}
        />
      </Box>

      <ButtonLink
        to="/summary"
        onClick={() => {}}
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
