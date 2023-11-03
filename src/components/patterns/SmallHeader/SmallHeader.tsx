import { AppBar, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../atoms/Logo/Logo";

export default function SmallHeader() {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      sx={{
        boxShadow: 0,
        bgcolor: "rgb(108, 65, 0, 0.02)",
      }}
      position="absolute"
    >
      {isSmallMobile ? (
        <Button sx={{ maxWidth: "min-content", mt: "10px" }}>
          <MenuIcon sx={{ fontSize: "2em" }} />
        </Button>
      ) : (
        <Box
          sx={{
            py: "15px",
            px: "30px",
          }}
        >
          <Logo />
        </Box>
      )}
    </AppBar>
  );
}
