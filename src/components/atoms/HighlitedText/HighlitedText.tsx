import { Typography } from "@mui/material";
import type { TypographyTypeMap } from "@mui/material";

export default function HighlitedText(props: TypographyTypeMap["props"]) {
  const { sx, children, ...otherProps } = props;
  return (
    <Typography
      component={"span"}
      sx={{ color: "primary.dark", fontWeight: "bold", ...sx }}
      {...otherProps}
    >
      {children}
    </Typography>
  );
}
