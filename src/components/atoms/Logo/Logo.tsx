import { Typography } from "@mui/material";

export default function Logo() {
  return (
    <Typography
      sx={(theme) => ({
        pl: "10px",
        borderLeft: `15px solid ${theme.palette.primary.main}`,
      })}
      variant="h4"
    >
      DrivingTests
    </Typography>
  );
}
