import { Box, Typography } from "@mui/material";
import { flexCenter } from "../../../../../utility/styling";
import bgImage from "../../../../../images/backgrounds/noPhoto.png";

export default function NoMedia() {
  return (
    <Box
      sx={{
        height: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        ...flexCenter,
      }}
    >
      <Typography variant="h5">Pytanie bez zdjęcia</Typography>
    </Box>
  );
}
