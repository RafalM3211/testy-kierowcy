import { Box } from "@mui/material";
import bgImage from "../../images/backgrounds/wave.svg";

export default function Home() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    ></Box>
  );
}
