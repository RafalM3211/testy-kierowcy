import { Button, CircularProgress } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";

interface Props extends ButtonProps {
  loading: boolean;
}

export default function LoadingButton(props: Props) {
  const { loading, children, disabled, ...other } = props;

  return (
    <Button {...other} disabled={disabled || loading}>
      {loading ? <CircularProgress size={"2em"} color="inherit" /> : children}
    </Button>
  );
}
