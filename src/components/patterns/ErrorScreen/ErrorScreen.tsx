import { Box, Typography } from "@mui/material";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import type { SxProps } from "@mui/material";
import { flexCenter } from "../../../utility/styling";
import ButtonLink from "../../atoms/ButtonLink/ButtonLink";

interface Props {
  label?: string;
  sx?: SxProps;
}

export default function ErrorScreen(props: Props) {
  return (
    <Box
      sx={{
        height: "100vh",
        pb: "50px",
        boxSizing: "border-box",
        fontSize: "1.2em",
        ...flexCenter,
        flexDirection: "column",
        ...props.sx,
      }}
    >
      <ErrorBlock sx={{ height: "unset", mb: "30px" }} label={props.label} />
      <ButtonLink variant="contained" to="/">
        <Typography>Powrót do strony głównej</Typography>
      </ButtonLink>
    </Box>
  );
}
