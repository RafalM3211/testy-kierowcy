import { Box } from "@mui/material";
import AnsewerRow from "./atoms/AnsewerRow";
import type { SxProps } from "@mui/material/styles";

interface Props {
  sx?: SxProps;
}

export default function ABCAnsewer(props: Props) {
  return (
    <Box sx={{ ...props.sx }}>
      <AnsewerRow label="A">
        Odpowiedź bnumer jeden taka średniej długości co często jest no
      </AnsewerRow>
      <AnsewerRow label="B">
        Odpowiedź bnumer dwa taka już długiej długości żeby sprawdzić zawijanie
        tekstuy asjuifaksfjbn ajk sf długości co często jest no
      </AnsewerRow>
      <AnsewerRow label="C">
        Asfa lsfasf lka sfla sfklals flkaf trzey
      </AnsewerRow>
    </Box>
  );
}
