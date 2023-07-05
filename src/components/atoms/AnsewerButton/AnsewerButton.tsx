import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  checked?: boolean;
}

export default function AnsewerButton(props: Props) {
  const { checked, sx, children, ...other } = props;
  return (
    <Button
      variant={checked ? "contained" : "outlined"}
      sx={{ textTransform: "capitalize", mx: "10px", fontSize: "1em", ...sx }}
      {...other}
    >
      {children}
    </Button>
  );
}
