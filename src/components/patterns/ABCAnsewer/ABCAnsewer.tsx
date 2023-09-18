import { Box } from "@mui/material";
import AnsewerRow from "./subcomponents/AnsewerRow";
import { getColorForAnsewerButton } from "../../../utility/utils";
import type { SxProps } from "@mui/material/styles";
import type { ABCansewers } from "../../../types/globalTypes";

interface Props {
  ansewers: ABCansewers;
  chosenAnsewer: keyof ABCansewers | null;
  setChosenAnsewer?: (chosenAnsewer: keyof ABCansewers) => void;
  correctAnsewer?: keyof ABCansewers;
  sx?: SxProps;
}

export default function ABCAnsewer(props: Props) {
  const { ansewers, chosenAnsewer, correctAnsewer, sx } = props;

  return (
    <Box sx={{ ...sx }}>
      {(["A", "B", "C"] as const).map((letter) => (
        <AnsewerRow
          key={letter}
          checked={chosenAnsewer === letter}
          color={getColorForAnsewerButton(
            letter,
            correctAnsewer,
            chosenAnsewer
          )}
          label={letter}
          disableRipple={!props.setChosenAnsewer}
          onClick={() => {
            if (props.setChosenAnsewer) props.setChosenAnsewer(letter);
          }}
        >
          {ansewers[letter]}
        </AnsewerRow>
      ))}
    </Box>
  );
}
