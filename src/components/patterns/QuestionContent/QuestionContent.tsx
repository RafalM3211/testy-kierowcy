import { Box, Typography } from "@mui/material";
import ABCAnsewer from "../ABCAnsewer/ABCAnsewer";
import YesNoAnseswer from "../YesNoAnsewer/YesNoAnsewer";
import type {
  BasicQuestion,
  SpecializedQuestion,
} from "../../../types/globalTypes";

interface Props {
  content: string;
  ansewers: BasicQuestion["ansewers"] | SpecializedQuestion["ansewers"];
  type: BasicQuestion["type"] | SpecializedQuestion["type"];
}

export default function QuestionContent(props: Props) {
  return (
    <Box sx={{ gridRow: "3", gridColumn: "1/3", mt: "20px" }}>
      <Typography
        sx={(theme) => ({
          borderLeft: `3px solid ${theme.palette.primary.main}`,
          p: "5px",
        })}
        variant="h6"
      >
        {props.content}
      </Typography>
      <Box>{props.type === "basic" ? <YesNoAnseswer /> : <ABCAnsewer />}</Box>
    </Box>
  );
}
