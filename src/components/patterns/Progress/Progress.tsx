import { Box } from "@mui/material";
import ProgressLabel from "./subcomponents/ProgressLabel";
import ProgressBackground from "./subcomponents/ProgressBackground";
import type { SxProps } from "@mui/material";

interface Props {
  correctPercent: number;
  wrongPercent: number;
  sx?: SxProps;
}

export default function Progress(props: Props) {
  const { correctPercent, wrongPercent, sx } = props;
  const unansweredPercent = Math.floor(100 - correctPercent - wrongPercent);
  const wrapLabel =
    wrongPercent < 10 && (correctPercent < 15 || unansweredPercent < 15);

  if (correctPercent + wrongPercent > 100) {
    console.warn(
      "Progress value is displayed in percentages. Sum of correct and wrong answers shouldn't be more than 100"
    );
  }

  return (
    <Box sx={{ position: "relative", width: "600px", ...sx }}>
      <ProgressBackground stripesWidth={correctPercent + wrongPercent} />
      <Box
        sx={{
          display: "flex",
          height: "30px",
          borderRadius: "100px",
          background: "grey",
          boxShadow: "4",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${correctPercent}%`,
            backgroundColor: "success.light",
          }}
        >
          <ProgressLabel
            label="poprawne"
            value={correctPercent}
            color="success.light"
          />
        </Box>
        <Box
          sx={{
            width: `${wrongPercent}%`,
            backgroundColor: "error.main",
          }}
        >
          <ProgressLabel
            label="błędne"
            value={wrongPercent}
            color="error.main"
            above={wrapLabel}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "grey.400",
          }}
        >
          <ProgressLabel
            label="bez odpowiedzi"
            value={unansweredPercent}
            color="grey.500"
          />
        </Box>
      </Box>
    </Box>
  );
}
