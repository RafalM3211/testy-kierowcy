import { Box } from "@mui/material";
import AnsewerRow from "../../atoms/AnsewerRow/AnsewerRow";

export default function ABCAnsewer() {
  return (
    <Box sx={{ mt: "35px" }}>
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
