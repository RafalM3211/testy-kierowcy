import { AppBar, Box } from "@mui/material";
import Logo from "../../atomsReusable/Logo/Logo";

export default function SmallHeader() {
  return (
    <AppBar
      sx={{
        boxShadow: 0,
        bgcolor: "rgb(108, 65, 0, 0.02)",
      }}
      position="absolute"
    >
      <Box
        sx={{
          py: "15px",
          px: "30px",
        }}
      >
        <Logo />
      </Box>
    </AppBar>
  );
}
