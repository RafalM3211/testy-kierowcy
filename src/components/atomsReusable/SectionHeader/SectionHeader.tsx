import { Typography } from "@mui/material";
import { TypographyTypeMap } from "@mui/material";

export default function SectionHeader(props: TypographyTypeMap["props"]) {
  const { sx, children, ...otherProps } = props;

  return (
    <Typography
      variant="h3"
      component={"h2"}
      sx={{ textAlign: "center", mb: "15px", ...sx }}
      {...otherProps}
    >
      {children}
    </Typography>
  );
}
