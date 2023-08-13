import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" style={{ color: "unset", textDecoration: "none" }}>
      <Typography
        sx={(theme) => ({
          pl: "10px",
          borderLeft: `15px solid ${theme.palette.primary.main}`,
        })}
        variant="h4"
      >
        DrivingTests
      </Typography>
    </Link>
  );
}
