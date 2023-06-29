import { Box } from "@mui/material";
import ProgressLabel from "../../atoms/ProgressLabel/ProgressLabel";

/* zrob kiedys taka funkcje function generateStrippedBg(count: number) {} */

const strippedBackground = `
  linear-gradient(
    45deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255,255,255,0.15) 50%,
    rgba(255,255,255,0.15) 75%,
    transparent 75%,
    transparent
)`;

export default function Progress() {
  return (
    <Box sx={{ position: "relative", mt: "60px" }}>
      <Box
        sx={{
          position: "absolute",
          backgroundImage: strippedBackground,
          left: "50%",
          width: "50%",
          height: "100%",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          width: "600px",
          height: "30px",
          borderRadius: "100px",
          background: "grey",
          boxShadow: "4",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "20%",
            backgroundColor: "success.light",
          }}
        >
          <ProgressLabel label="poprawne" value={20} color="success.light" />
        </Box>
        <Box
          sx={{
            width: "30%",
            backgroundColor: "error.main",
          }}
        >
          <ProgressLabel label="błędne" value={30} color="error.main" />
        </Box>
        <Box sx={{ flexGrow: 1, backgroundColor: "grey.400" }}>
          <ProgressLabel label="bez odpowiedzi" value={50} color="grey.500" />
        </Box>
      </Box>
    </Box>
  );
}
