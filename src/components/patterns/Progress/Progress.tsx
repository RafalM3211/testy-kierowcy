import { Box } from "@mui/material";
import ProgressLabel from "./atoms/ProgressLabel/ProgressLabel";
import ProgressBackground from "./atoms/ProgressBackground/ProgressBackground";
import type { SxProps } from "@mui/material";

interface Props {
  correct: number;
  wrong: number;
  sx?: SxProps;
}

export default function Progress(props: Props) {
  const { correct, wrong, sx } = props;

  console.log(correct, wrong);

  if (correct + wrong > 100) {
    console.warn(
      "Progress value is displayed in percentages. Sum of correct and wrong ansewers shouldn't be more than 100"
    );
  }

  return (
    <Box sx={{ position: "relative", width: "600px", ...sx }}>
      <ProgressBackground stripesWidth={correct + wrong} />
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
            width: `${correct}%`,
            backgroundColor: "success.light",
          }}
        >
          <ProgressLabel
            label="poprawne"
            value={correct}
            color="success.light"
          />
        </Box>
        <Box
          sx={{
            width: `${wrong}%`,
            backgroundColor: "error.main",
          }}
        >
          <ProgressLabel label="błędne" value={wrong} color="error.main" />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "grey.400",
          }}
        >
          <ProgressLabel
            label="bez odpowiedzi"
            value={100 - (correct + wrong)}
            color="grey.500"
          />
        </Box>
      </Box>
    </Box>
  );
}
