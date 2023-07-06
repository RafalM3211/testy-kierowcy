import { Box, Typography } from "@mui/material";
import { strippedBackground } from "../../atoms/ProgressBackground/ProgressBackground";

export default function TimeCount() {
  return (
    <>
      <Typography variant="subtitle2" sx={{ color: "grey.800" }}>
        Czas na odpowiedź
      </Typography>
      <Box
        sx={{
          width: "200px",
          textAlign: "center",
          backgroundColor: "grey.300",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Typography variant="h6">25s</Typography>
        <Box
          sx={{
            backgroundColor: "primary.light",
            backgroundImage: strippedBackground,
            position: "absolute",
            width: "20%",
            height: "100%",
            top: "0",
          }}
        ></Box>
      </Box>
    </>
  );
}
