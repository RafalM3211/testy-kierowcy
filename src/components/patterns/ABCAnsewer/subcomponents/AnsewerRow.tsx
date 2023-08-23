import { Box, Typography } from "@mui/material";
import AnsewerButton from "../../../atoms/AnsewerButton/AnsewerButton";
import type { ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  checked?: boolean;
  label: "A" | "B" | "C";
  children: string;
}

export default function AnsewerRow(props: Props) {
  const { checked, label, children, sx, ...other } = props;

  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        my: "20px",
        ml: "10px",
        pr: "10px",
        width: "fit-content",
        bgcolor: checked ? "grey.50" : "unset",
        transition: "background-color 0.25s ",
        ...sx,

        "&:hover": {
          bgcolor: "grey.100",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "1em",
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
        }}
        component="label"
      >
        <AnsewerButton
          checked={checked}
          sx={{
            minWidth: "40px",
            width: "40px",
            ml: "0",
            height: "40px",
            display: "block",
          }}
          {...other}
        >
          {label}
        </AnsewerButton>
        {children}
      </Typography>
    </Box>
  );
}
