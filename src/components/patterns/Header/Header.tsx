import { AppBar, Container, Box } from "@mui/material";
import UserChip from "./atoms/UserChip/UserChip";
import NavLink from "../../reusableAtoms/ButtonLink/ButtonLink";
import Logo from "../../reusableAtoms/Logo/Logo";

export default function Header() {
  return (
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
        <Logo />
        <Box component="nav" sx={{ display: "flex", alignItems: "center" }}>
          <NavLink to="/">Ulubione</NavLink>
          <NavLink to="/">Test</NavLink>
          <UserChip />
        </Box>
      </Container>
    </AppBar>
  );
}
