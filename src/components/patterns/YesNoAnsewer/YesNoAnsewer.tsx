import { Box } from "@mui/material";
import AnsewerButton from "../../atoms/AnsewerButton/AnsewerButton";
import { getColorForAnsewerButton } from "../../../utility/utils";
import { BasicAnsewer } from "../../../types/globalTypes";
import type { SxProps } from "@mui/material/styles";

interface Props {
  setChosenAnsewer?: (chosenAnsewer: boolean) => void;
  chosenAnsewer: BasicAnsewer;
  correctAnsewer?: boolean;
  size: number;
  sx?: SxProps;
}

export default function YesNoAnseswer(props: Props) {
  const px = props.size * 8 + "px";
  const py = props.size + "px";
  const fontSize = props.size * 0.34 + "em";
  const mr = props.size * 10 + "px";

  function handleAnsewerChange(ansewer: boolean) {
    if (props.setChosenAnsewer) {
      props.setChosenAnsewer(ansewer);
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", ...props.sx }}>
      <AnsewerButton
        onClick={() => {
          handleAnsewerChange(true);
        }}
        checked={props.chosenAnsewer === true}
        size="large"
        sx={{
          px: px,
          py: py,
          fontSize: fontSize,
          mr: mr,
        }}
        disableRipple={!props.setChosenAnsewer}
        color={getColorForAnsewerButton(
          true,
          props.correctAnsewer,
          props.chosenAnsewer
        )}
      >
        tak
      </AnsewerButton>
      <AnsewerButton
        onClick={() => {
          handleAnsewerChange(false);
        }}
        checked={props.chosenAnsewer === false}
        size="large"
        sx={{ px: px, py: py, fontSize: fontSize }}
        disableRipple={!props.setChosenAnsewer}
        color={getColorForAnsewerButton(
          false,
          props.correctAnsewer,
          props.chosenAnsewer
        )}
      >
        nie
      </AnsewerButton>
    </Box>
  );
}
