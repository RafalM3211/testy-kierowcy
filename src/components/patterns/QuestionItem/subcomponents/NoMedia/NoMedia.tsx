import { Box } from "@mui/material";
import bgImage from "../../../../../images/backgrounds/noPhoto.png";

export default function NoMedia() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    ></Box>
  );
}
