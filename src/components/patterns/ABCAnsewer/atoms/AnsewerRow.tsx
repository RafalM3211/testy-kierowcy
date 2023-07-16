import { Box, Typography } from "@mui/material";
import AnsewerButton from "../../../atomsReusable/AnsewerButton/AnsewerButton";
import type { BoxProps } from "@mui/material";

interface Props extends BoxProps {
  checked?: boolean;
  label: "A" | "B" | "C";
  children: string;
}

export default function AnsewerRow(props: Props) {
  const { checked, label, children, sx, ...other } = props;

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", my: "20px", ...sx }}
      {...other}
    >
      <AnsewerButton
        checked={checked}
        sx={{ minWidth: "40px", width: "40px", height: "40px" }}
      >
        {label}
      </AnsewerButton>
      <Typography sx={{ fontSize: "1em" }}>{children}</Typography>
    </Box>
  );
}
