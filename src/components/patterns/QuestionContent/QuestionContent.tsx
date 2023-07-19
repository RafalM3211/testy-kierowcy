import { Box, Typography } from "@mui/material";
import ABCAnsewer from "../ABCAnsewer/ABCAnsewer";
import YesNoAnseswer from "../YesNoAnsewer/YesNoAnsewer";
import type {
  BasicQuestion,
  SpecializedQuestion,
  ABCansewers,
  Ansewer,
} from "../../../types/globalTypes";

interface Props {
  content: string;
  ansewers: ABCansewers | null;
  chosenAnsewer: Ansewer | null;
  setChosenAnsewer?: (chosenAnsewer: Ansewer) => void;
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
      <Box>
        {props.type === "basic" ? (
          <YesNoAnseswer
            setChosenAnsewer={props.setChosenAnsewer}
            chosenAnsewer={props.chosenAnsewer as boolean}
            size={5}
            sx={{ mt: "35px" }}
          />
        ) : (
          <ABCAnsewer
            ansewers={props.ansewers as ABCansewers}
            chosenAnsewer={
              props.chosenAnsewer as keyof SpecializedQuestion["ansewers"]
            }
            setChosenAnsewer={props.setChosenAnsewer}
            sx={{ mt: "35px" }}
          />
        )}
      </Box>
    </Box>
  );
}
