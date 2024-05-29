import { Typography } from "@mui/material";
import type { TypographyTypeMap } from "@mui/material/Typography/Typography";

type Props = {
  children: React.ReactNode;
} & TypographyTypeMap["props"];

export default function SuccessMessage(props: Props) {
  const { children, ...other } = props;
  return (
    <Typography color="success.light" {...other}>
      {children}
    </Typography>
  );
}
