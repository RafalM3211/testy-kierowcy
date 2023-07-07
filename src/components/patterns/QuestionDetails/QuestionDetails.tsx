import { Box } from "@mui/material";
import InfoChip from "../../atomsReusable/InfoChip/InfoChip";
import HighlitedText from "../../atomsReusable/HighlitedText/HighlitedText";

export default function QuestionDetails() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "min-content",
        gridRow: "1",
        gridColumn: "1",
      }}
    >
      <InfoChip>
        Id pytania:{" "}
        <HighlitedText sx={{ fontSize: "1.2em" }}>23233</HighlitedText>
      </InfoChip>
      <InfoChip>
        Wartość punktowa:{" "}
        <HighlitedText sx={{ fontSize: "1.2em" }}>3</HighlitedText>
      </InfoChip>
      <InfoChip>
        Kategoria: <HighlitedText sx={{ fontSize: "1.2em" }}>B</HighlitedText>
      </InfoChip>
    </Box>
  );
}
