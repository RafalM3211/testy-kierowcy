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
        ...sx,
      }}
      {...boxProps}
    >
      <Typography variant="h6" component="p">
        {label}
      </Typography>
      <Typography variant="h3" component="p">
        {value}
      </Typography>
    </Box>
  );
}
