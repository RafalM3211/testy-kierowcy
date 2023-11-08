import { AppBar, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../atoms/Logo/Logo";
import Drawer from "../Drawer/Drawer";
import { useState } from "react";
import MenuButton from "../../atoms/MenuButton/MenuButton";

export default function SmallHeader() {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      sx={{
        boxShadow: 0,
        bgcolor: "rgb(108, 65, 0, 0.02)",
      }}
      position="absolute"
    >
      {isSmallMobile ? (
        <MenuButton
          sx={{
            mt: "10px",
            ml: "10px",
          }}
          onClick={() => setDrawerOpen(true)}
        />
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
      <Drawer open={isDrawerOpen} setOpen={setDrawerOpen} anchor="left" />
    </AppBar>
  );
}
