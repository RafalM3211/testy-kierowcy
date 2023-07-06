import { Typography } from "@mui/material";

interface Props {
  label: string;
  value: number;
  color: string;
}

export default function ProgressLabel(props: Props) {
  return (
    <Typography
      sx={{
        color: props.color,
        textAlign: "center",
        width: `${props.value}%`,
        position: "absolute",
        top: "35px",
      }}
    >
      {`${props.value}%`}
      <Typography sx={{ lineHeight: "0.6em" }} variant="body2">
        {props.label}
      </Typography>
    </Typography>
  );
}
