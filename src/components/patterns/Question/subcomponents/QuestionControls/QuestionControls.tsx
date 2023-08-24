import { Box, Button, Typography } from "@mui/material";
import { flexCenter } from "../../../../../utility/styling";
import QuestionCount from "../../subcomponents/QuestionCount/QuestionCount";
import TimeCount from "../../subcomponents/TimeCount/TimeCount";
import { useEgzamControlContext } from "../../../../../context/egzamControls/egzamControls";
import type { QuestionMode, ExcludeUndefined } from "../../types";
import type { QuestionType } from "../../../../../types/globalTypes";
import ExamMode from "./subcomponents/ExamMode";
import PreviewMode from "./subcomponents/PreviewMode";

interface Props {
  type: QuestionType;
  mode: QuestionMode;
}

//nastepne poprzednie pytanie i powrot do podsumowania tutaj w preview

export default function QuestionControls(props: Props) {
  return (
    <Box
      sx={{
        ...flexCenter,
        justifyContent: "center",
        flexDirection: "column",
        ml: "30px",
        gridRow: "2",
        gridColumn: "2",
      }}
    >
      {props.mode === "exam" ? <ExamMode type={props.type} /> : <PreviewMode />}
    </Box>
  );
}
