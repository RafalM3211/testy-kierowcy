import { Box, useTheme, useMediaQuery } from "@mui/material";
import InfoChip from "../../../../atoms/InfoChip/InfoChip";
import HighlitedText from "../../../../atoms/HighlitedText/HighlitedText";

interface Props {
  id: number;
  value: number;
}

export default function QuestionDetails(props: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "5px",
            mb: "15px",
            gridRow: "1",
            gridColumn: "1",
          }}
        >
          <InfoChip>
            Id pytania:{" "}
            <HighlitedText sx={{ fontSize: "1.2em" }}>{props.id}</HighlitedText>
          </InfoChip>
          <InfoChip>
            Wartość punktowa:{" "}
            <HighlitedText sx={{ fontSize: "1.2em" }}>
              {props.value}
            </HighlitedText>
          </InfoChip>
          <InfoChip>
            Kategoria:{" "}
            <HighlitedText sx={{ fontSize: "1.2em" }}>B</HighlitedText>
          </InfoChip>
        </Box>
      )}
    </>
  );
}
