import { Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";

interface Props extends Omit<BoxProps, "children"> {
  label: string;
  value: string;
  active: boolean;
}

export default function QuestionCountUnit(props: Props) {
  const { label, value, active, sx, ...boxProps } = props;

  return (
    <Box
      sx={{
        textAlign: "center",
        mx: { xs: "0", md: "5px", lg: "15px" },
        color: active ? "unset" : "grey.500",
        transition: "color 0.2s",
        flexShrink: "2",
        fontSize: { xs: "0.6em", sm: "0.7em", md: "0.8em", lg: "0.9em" },
        ...sx,
      }}
      {...boxProps}
    >
      <Typography
        sx={{
          fontSize: active ? "1.2em" : "0.9em",
          transition: "font-size 0.3s",
        }}
        variant="h6"
        component="p"
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: active ? "2.5em" : "2.1em",
          transition: "font-size 0.1s",
        }}
        variant="h3"
        component="p"
      >
        {value}
      </Typography>
    </Box>
  );
}
