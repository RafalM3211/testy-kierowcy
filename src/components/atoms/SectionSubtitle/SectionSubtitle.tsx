import { Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";

export default function SectionSubtitle(props: TypographyProps) {
  const { sx, children, ...typographyProps } = props;

  return (
    <Typography
      sx={{
        textAlign: "center",
        px: { sx: "5%", md: "18%" },
        mb: "5px",
        fontSize: "1em",
        ...sx,
      }}
      variant="subtitle2"
      {...typographyProps}
    >
      {children}
    </Typography>
  );
}
