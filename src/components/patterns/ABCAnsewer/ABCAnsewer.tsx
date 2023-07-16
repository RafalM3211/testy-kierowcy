import { Box } from "@mui/material";
import AnsewerRow from "./atoms/AnsewerRow";
import type { SxProps } from "@mui/material/styles";
import type { Ansewers } from "../../../types/globalTypes";

interface Props {
  ansewers: Ansewers;
  sx?: SxProps;
}

export default function ABCAnsewer(props: Props) {
  const { ansewers, sx } = props;

  return (
    <Box sx={{ ...sx }}>
      <AnsewerRow label="A">{ansewers.A}</AnsewerRow>
      <AnsewerRow label="B">{ansewers.B}</AnsewerRow>
      <AnsewerRow label="C">{ansewers.C}</AnsewerRow>
    </Box>
  );
}
