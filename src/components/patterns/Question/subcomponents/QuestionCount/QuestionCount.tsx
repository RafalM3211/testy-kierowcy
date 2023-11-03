import { Box, Typography } from "@mui/material";
import { BoxProps } from "@mui/material";

interface Props extends Omit<BoxProps, "children"> {
  label: string;
  value: string;
  active: boolean;
}

export default function QuestionCount(props: Props) {
  const { label, value, active, sx, ...boxProps } = props;

  return (
    <Box
      sx={{
        textAlign: "center",
        mx: "15px",
        color: active ? "unset" : "grey.500",
        transition: "color 0.2s",
        flexShrink: "2",
        ...sx,
      }}
      {...boxProps}
    >
      <Typography
        sx={{
          fontSize: active ? "1.25em" : "1.1em",
          transition: "font-size 0.3s",
        }}
        variant="h6"
        component="p"
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: active ? "3em" : "2.64em",
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
