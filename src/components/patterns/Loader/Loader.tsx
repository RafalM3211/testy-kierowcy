import { Box, CircularProgress, Typography } from "@mui/material";
import { flexCenter } from "../../../utility/styling";
import type { SxProps } from "@mui/material";

interface Props {
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
        ...props.sx,
      }}
    >
      <Typography
        variant="h6"
        component="p"
        sx={{ mb: "25px", color: "grey.800" }}
      >
        {props.label || "Trwa ładowanie..."}
      </Typography>
      <CircularProgress size={70} sx={{}} />
    </Box>
  );
}
