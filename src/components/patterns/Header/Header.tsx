import {
  AppBar,
  Grid,
  Container,
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import UserChip from "./subcomponents/UserChip";
import ButtonLink from "../../atoms/ButtonLink/ButtonLink";
import Logo from "../../atoms/Logo/Logo";
import { useState } from "react";
import type { MenuItem } from "./types";

const menuStructure: MenuItem[] = [
  { title: "ulubione", to: "/" },
  { title: "test", to: "/" },
];

const userMenuStructure: MenuItem[] = [
  { title: "wyloguj", to: "/" },
  { title: "costam", to: "/" },
];

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
              menuStructure.map((item, index) => {
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

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: "10px",
            mx: "16px",
          }}
        >
          <UserChip />
          <Button
            onClick={() => setDrawerOpen(false)}
            sx={{
              color: "primary.dark",
              minWidth: "min-content",
            }}
          >
            <CloseIcon />
          </Button>
        </Box>

        <List
          sx={{
            borderRight: (theme) => `1px solid ${theme.palette.grey[400]}`,
            mr: "35px",
            pr: "10px",
          }}
          disablePadding
          dense
        >
          {userMenuStructure.map((item, index) => {
            return (
              <ListItem
                key={index}
                sx={{ pr: "8px", pt: "0px", justifyContent: "center" }}
              >
                <ButtonLink sx={{ color: "grey.500" }} to={item.to}>
                  {item.title}
                </ButtonLink>
              </ListItem>
            );
          })}
        </List>

        <List>
          {menuStructure.map((item, index) => {
            return (
              <ListItem
                key={index}
                sx={{
                  borderLeft: (theme) => `5px solid ${theme.palette.grey[300]}`,
                  py: "5px",
                  my: "20px",
                }}
              >
                <ButtonLink sx={{ py: "0" }} to={item.to}>
                  {item.title}
                </ButtonLink>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
