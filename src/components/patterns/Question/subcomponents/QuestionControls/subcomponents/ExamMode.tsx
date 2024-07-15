import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import QuestionCount from "./QuestionCount";
import TimeCount from "../../../subcomponents/TimeCount/TimeCount";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useExamControlContext } from "../../../../../../context/examControls/examControls";
import type { ExcludeUndefined } from "../../../types";
import type { QuestionType } from "../../../../../../types/globalTypes";

interface Props {
  type: QuestionType;
}

export default function ExamMode(props: Props) {
  const controls = useExamControlContext();
  const { endExam, handleNextQuestionBtnClick, questionCount } =
    controls as ExcludeUndefined<typeof controls>;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "unset", md: "95%" },
          mb: { xs: "0px", md: "20px" },
        }}
      >
        <QuestionCount questionCount={questionCount} />
      </Box>
      <TimeCount type={props.type} />
      <Button
        onClick={endExam}
        variant="outlined"
        sx={{
          textTransform: "unset",
          mt: { xs: "0", md: "20px" },
          fontSize: "0.9em",
          minWidth: "fit-content",
          px: { xs: "5px", md: "15px" },
        }}
      >
        {isMobile ? (
          <ExitToAppIcon />
        ) : (
          <Typography>Zakończ egzamin</Typography>
        )}
      </Button>

      {isMobile ? (
        <></>
      ) : (
        <Button
          onClick={handleNextQuestionBtnClick}
          variant="contained"
          sx={{
            textTransform: "unset",
            mt: "100px",
            px: "35px",
            py: "10px",
          }}
        >
          <Typography variant="button">Następne pytanie</Typography>
        </Button>
      )}
    </>
  );
}
