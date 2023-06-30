import { Box } from "@mui/material";

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

export default function ProgressBackground() {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          backgroundImage: strippedBackground,
          left: "0%",
          width: "50%",
          height: "100%",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          backgroundImage:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.5), transparent)",
          borderRadius: "50px",
          left: "0%",
          width: "50%",
          height: "100%",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5))",
          borderRadius: "50px",
          left: "50%",
          width: "50%",
          height: "100%",
        }}
      ></Box>
    </>
  );
}
