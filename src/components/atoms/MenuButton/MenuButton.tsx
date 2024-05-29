import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { SxProps } from "@mui/material";
import type { ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  onClick: () => void;
  sx?: SxProps;
}

export default function MenuButton(props: Props) {
  const { onClick, sx, ...other } = props;

  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: "50px",
        py: "5px",
        minWidth: "min-content",
        width: "min-content",
        ...sx,
      }}
      onClick={onClick}
      {...other}
    >
      <MenuIcon color="primary" />
    </Button>
  );
}
