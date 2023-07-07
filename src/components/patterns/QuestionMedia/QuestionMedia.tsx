import { Box, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { flexCenter } from "../../../utility/styling";

export default function QuestionMedia() {
  return (
    <Box
      sx={(theme) => ({
        width: "921px",
        height: "540px",
        bgcolor: "grey.300",
        gridRow: "2",
        gridColumn: "1",
      })}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "grey.300",
          cursor: "pointer",
          userSelect: "none",
          ...flexCenter,
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component="p">
          Kliknij aby odtworzyć
        </Typography>
        <PlayCircleOutlineIcon sx={{ fontSize: 90, mt: "10px" }} />
      </Box>
    </Box>
  );
}
