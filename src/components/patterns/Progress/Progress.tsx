import { Box } from "@mui/material";
import ProgressLabel from "../../atoms/ProgressLabel/ProgressLabel";
import ProgressBackground from "../../atoms/ProgressBackground/ProgressBackground";

export default function Progress() {
  return (
    <Box sx={{ position: "relative", mt: "60px" }}>
      <ProgressBackground />
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
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "grey.400",
          }}
        >
          <ProgressLabel label="bez odpowiedzi" value={50} color="grey.500" />
        </Box>
      </Box>
    </Box>
  );
}
