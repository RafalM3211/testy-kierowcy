import { Box, Typography } from "@mui/material";
import ABCAnsewer from "../../../ABCAnsewer/ABCAnsewer";
import YesNoAnseswer from "../../../YesNoAnsewer/YesNoAnsewer";
import type {
  BasicQuestion,
  SpecializedQuestion,
  ABCansewers,
  Ansewer,
  BasicAnsewer,
  SpecializedAnsewer,
} from "../../../../../types/globalTypes";

interface PropsBase {
  content: string;
  setChosenAnsewer?: (chosenAnsewer: Exclude<Ansewer, null>) => void;
}

interface BasicQuesitonProps extends PropsBase {
  type: BasicQuestion["type"];
  chosenAnsewer: BasicAnsewer;
}

interface SpecializedQuestionProps extends PropsBase {
  type: SpecializedQuestion["type"];
  chosenAnsewer: SpecializedAnsewer;
  ansewers: ABCansewers;
}

type Props = SpecializedQuestionProps | BasicQuesitonProps;

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
            chosenAnsewer={props.chosenAnsewer}
            size={5}
            sx={{ mt: "35px" }}
          />
        ) : (
          <ABCAnsewer
            ansewers={props.ansewers as ABCansewers}
            chosenAnsewer={props.chosenAnsewer}
            setChosenAnsewer={props.setChosenAnsewer}
            sx={{ mt: "35px" }}
          />
        )}
      </Box>
    </Box>
  );
}
