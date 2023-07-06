import { Box } from "@mui/material";
import AnsewerButton from "../../atomsReusable/AnsewerButton/AnsewerButton";

export default function YesNoAnseswer() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "35px" }}>
      <AnsewerButton
        checked
        size="large"
        sx={{ px: "40px", py: "5px", fontSize: "1.7em", mr: "50px" }}
      >
        tak
      </AnsewerButton>
      <AnsewerButton
        size="large"
        sx={{ px: "40px", py: "5px", fontSize: "1.7em" }}
      >
        nie
      </AnsewerButton>
    </Box>
  );
}
