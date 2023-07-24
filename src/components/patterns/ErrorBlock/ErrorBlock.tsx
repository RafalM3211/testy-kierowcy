import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Container, Box, Typography, SxProps } from "@mui/material";
import { flexCenter } from "../../../utility/styling";

interface Props {
  sx?: SxProps;
}

export default function ErrorBlock(props: Props) {
  return (
    <Box
      sx={{
        ...flexCenter,
        fontSize: "2em",
        width: "100%",
        height: "100%",
        ...props.sx,
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ mr: "10px", fontSize: "1.4em" }} />
      <Typography variant="h6" component="p" sx={{ fontSize: "0.7em" }}>
        Wystąpił błąd, przepraszamy
      </Typography>
    </Box>
  );
}
