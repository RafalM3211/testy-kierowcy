import { Typography } from "@mui/material";
import type { TypographyTypeMap } from "@mui/material/Typography/Typography";

type Props = {
  children: React.ReactNode;
} & TypographyTypeMap["props"];

export default function ErrorMessage(props: Props) {
  const { children, ...other } = props;
  return (
    <Typography color="error" {...other}>
      {children}
    </Typography>
  );
}
