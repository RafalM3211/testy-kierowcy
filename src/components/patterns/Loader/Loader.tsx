import { Box, CircularProgress, Typography } from "@mui/material";
import { flexCenter } from "../../../utility/styling";
import type { SxProps } from "@mui/material";

interface Props {
  size?: number;
  label?: string;
  sx?: SxProps;
}

export default function Loader(props: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "rgba(255,255,255,0.8)",
        position: "absolute",
        top: 0,
        ...flexCenter,
        flexDirection: "column",
        color: "grey.800",
        ...props.sx,
      }}
    >
      <Typography
        variant="h6"
        component="p"
        sx={{ mb: "1em", fontSize: "1.25em" }}
      >
        {props.label || "Trwa ładowanie..."}
      </Typography>
      <CircularProgress size={props.size || 70} />
    </Box>
  );
}
