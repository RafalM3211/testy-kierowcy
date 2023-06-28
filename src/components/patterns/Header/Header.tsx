import { AppBar, Container, Typography, Box, Link } from "@mui/material";
import UserChip from "../../atoms/UserChip/UserChip";
import NavLink from "../../atoms/NavLink/NavLink";

export default function Header() {
  return (
    <AppBar color="transparent" position="static">
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: "10px",
        }}
        maxWidth="lg"
      >
        <Typography variant="h4">DrivingTests</Typography>
        <Box component="nav" sx={{ display: "flex", alignItems: "center" }}>
          <NavLink to="/">ulubione</NavLink>
          <NavLink to="/">test</NavLink>
          <UserChip />
        </Box>
      </Container>
    </AppBar>
  );
}
