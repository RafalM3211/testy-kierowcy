import { Box, Typography } from "@mui/material";
import ABCAnsewer from "../../../ABCAnsewer/ABCAnsewer";
import YesNoAnseswer from "../../../YesNoAnsewer/YesNoAnsewer";
import { useEgzamControlContext } from "../../../../../context/egzamControls/egzamControls";
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
}

interface BasicQuesitonProps extends PropsBase {
  type: BasicQuestion["type"];
}

interface SpecializedQuestionProps extends PropsBase {
  type: SpecializedQuestion["type"];
  ansewers: ABCansewers;
}

type Props = SpecializedQuestionProps | BasicQuesitonProps;

export default function QuestionContent(props: Props) {
  const { chosenAnsewer, setChosenAnsewer } = useEgzamControlContext();

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
            setChosenAnsewer={setChosenAnsewer}
            chosenAnsewer={chosenAnsewer as BasicAnsewer}
            size={5}
            sx={{ mt: "35px" }}
          />
        ) : (
          <ABCAnsewer
            ansewers={props.ansewers as ABCansewers}
            chosenAnsewer={chosenAnsewer as SpecializedAnsewer}
            setChosenAnsewer={setChosenAnsewer}
            sx={{ mt: "35px" }}
          />
        )}
      </Box>
    </Box>
  );
}
