import { Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";

export default function SectionSubtitle(props: TypographyProps) {
  const { children, ...typographyProps } = props;

  return (
    <Typography
      sx={{ textAlign: "center", px: "18%", mb: "5px" }}
      variant="subtitle2"
      {...typographyProps}
    >
      {children}
    </Typography>
  );
}
