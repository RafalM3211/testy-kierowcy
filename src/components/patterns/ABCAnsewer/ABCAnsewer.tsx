import { Box } from "@mui/material";
import AnsewerRow from "./subcomponents/AnsewerRow";
import type { SxProps } from "@mui/material/styles";
import type {
  ABCansewers,
  SpecializedQuestion,
} from "../../../types/globalTypes";

interface Props {
  ansewers: ABCansewers;
  chosenAnsewer: keyof ABCansewers | null;
  setChosenAnsewer?: (chosenAnsewer: keyof ABCansewers) => void;
  sx?: SxProps;
}

export default function ABCAnsewer(props: Props) {
  const { ansewers, chosenAnsewer, sx } = props;

  return (
    <Box sx={{ ...sx }}>
      {(["A", "B", "C"] as const).map((letter) => (
        <AnsewerRow
          key={letter}
          checked={chosenAnsewer === letter}
          label={letter}
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
