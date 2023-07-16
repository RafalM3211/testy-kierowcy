import { Box, Card, Typography } from "@mui/material";
import YesNoAnseswer from "../YesNoAnsewer/YesNoAnsewer";
import { flexCenter } from "../../../utility/styling";
import ABCAnsewer from "../ABCAnsewer/ABCAnsewer";
import { trimText } from "../../../utility/utils";
import type { Ansewers, Question } from "../../../types/globalTypes";

interface Props {
  data: Question;
  number?: number;
}

function trimAnsewers(ansewers: Ansewers): Ansewers {
  return {
    A: trimText(ansewers.A, 100),
    B: trimText(ansewers.B, 100),
    C: trimText(ansewers.C, 100),
  };
}

export default function QuestionPreview(props: Props) {
  const { data: question } = props;

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        width: "45%",
        height: question.type === "basic" ? "170px" : "auto",
        my: "30px",
        mx: "2.5%",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "1.5rem",
          bgcolor: "primary.main",
          ...flexCenter,
        }}
      >
        <Typography
          variant="h5"
          component="p"
          color="white"
          sx={{
            wordBreak: "break-all",
            textAlign: "center",
            lineHeight: "1em",
          }}
        >
          {props.number}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "200px",
          height: "114px",
          ml: "10px",
          mr: "5px",
          bgcolor: "grey.300",
        }}
      ></Box>
      <Box
        sx={{
          boxSizing: "border-box",
          p: "15px",
          height: "100%",
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1">
          {trimText(question.content, 140)}
        </Typography>
        {question.type === "basic" ? (
          <YesNoAnseswer size={3.4} />
        ) : (
          <ABCAnsewer
            ansewers={trimAnsewers(question.ansewers)}
            sx={{ fontSize: "0.9em" }}
          />
        )}
      </Box>
    </Card>
  );
}
