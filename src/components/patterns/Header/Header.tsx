import { AppBar, Container, Box, Button, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import { useState } from "react";
import UserChip from "./subcomponents/UserChip";
import ButtonLink from "../../atoms/ButtonLink/ButtonLink";
import Logo from "../../atoms/Logo/Logo";
import { mainMenuStructure } from "../../../Router";
import Drawer from "../Drawer/Drawer";

export default function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <>
      <AppBar
        sx={{
          boxShadow: "0px 2px 3px rgba(0,0,0,0.1)",
          bgcolor: "rgb(108, 65, 0, 0.02)",
        }}
        position="absolute"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: "10px",
          }}
          maxWidth="lg"
        >
          <Logo size={isXs ? "small" : "medium"} />
          <Box component="nav" sx={{ display: "flex", alignItems: "center" }}>
            {isXs ? (
              <></>
            ) : (
              mainMenuStructure.map((item, index) => {
                return (
                  <ButtonLink to={item.to} key={index}>
                    {item.title}
                  </ButtonLink>
                );
              })
            )}
            <UserChip
              sx={{
                ml: "30px",
              }}
            />
            {isXs ? (
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "50px",
                  ml: "15px",
                  p: "5px",
                  width: "min-content",
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon color="primary" />
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </Container>
      </AppBar>

      <Drawer isOpen={isDrawerOpen} setOpen={setDrawerOpen} />
    </>
  );
}
