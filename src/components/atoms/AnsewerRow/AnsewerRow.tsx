import { Box, Typography } from "@mui/material";
import AnsewerButton from "../../atoms/AnsewerButton/AnsewerButton";
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
      <AnsewerButton checked={checked} sx={{ minWidth: "35px" }}>
        {label}
      </AnsewerButton>
      <Typography>{children}</Typography>
    </Box>
  );
}
