import { Box } from "@mui/material";
import { useState } from "react";
import AnsewerButton from "../../atomsReusable/AnsewerButton/AnsewerButton";
import type { SxProps } from "@mui/material/styles";
import {
  AnseweredBasicQuestion,
  BasicAnsewer,
} from "../../../types/globalTypes";

interface Props {
  setChosenAnsewer?: (chosenAnsewer: boolean) => void;
  chosenAnsewer: BasicAnsewer;
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
        sx={{ px: px, py: py, fontSize: fontSize, mr: mr }}
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
      >
        nie
      </AnsewerButton>
    </Box>
  );
}
