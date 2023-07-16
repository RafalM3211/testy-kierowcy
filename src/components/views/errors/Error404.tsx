import { Box, Typography } from "@mui/material";
import { flexCenter } from "../../../utility/styling";
import HighlitedText from "../../atomsReusable/HighlitedText/HighlitedText";
import ButtonLink from "../../atomsReusable/ButtonLink/ButtonLink";

export default function Error404() {
  return (
    <Box
      sx={{
        ...flexCenter,
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography variant="h3" component="p">
        Błąd{" "}
        <HighlitedText
          sx={{ fontSize: "3em", fontWeight: "400", lineHeight: "1em" }}
        >
          404
        </HighlitedText>
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: "25px" }}>
        Strona o podanym adresie nie istnieje
      </Typography>
      <ButtonLink to="/" variant="contained" size="small" sx={{ mb: "50px" }}>
        Powrót do strony głównej
      </ButtonLink>
    </Box>
  );
}
