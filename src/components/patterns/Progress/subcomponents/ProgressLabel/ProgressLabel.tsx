import { Typography, Box } from "@mui/material";

interface Props {
  label: string;
  value: number;
  color: string;
  above?: boolean;
}

export default function ProgressLabel(props: Props) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "35px",
        color: props.color,
        width: `${props.value}%`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",

        ...(props.above && {
          top: "-35px",
        }),
      }}
    >
      {props.above || (
        <Typography
          sx={{ lineHeight: "1.1em" }}
        >{`${props.value}%`}</Typography>
      )}
      <Typography sx={{ lineHeight: "1em" }} variant="body2">
        {props.label}
      </Typography>
      {props.above && (
        <Typography
          sx={{ lineHeight: "1.1em" }}
        >{`${props.value}%`}</Typography>
      )}
    </Box>
  );
}
