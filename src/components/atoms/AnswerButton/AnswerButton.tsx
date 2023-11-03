import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  checked?: boolean;
}

export default function AnswerButton(props: Props) {
  const { checked, sx, children, ...other } = props;
  return (
    <Button
      variant={checked ? "contained" : "outlined"}
      sx={{
        textTransform: "capitalize",
        mx: "10px",
        fontSize: { xs: "0.2em", md: "1em" },
        ...sx,
      }}
      aria-pressed={checked}
      {...other}
    >
      {children}
    </Button>
  );
}
