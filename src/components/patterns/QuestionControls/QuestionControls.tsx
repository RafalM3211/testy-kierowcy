import { Box, Button, Typography } from "@mui/material";
import { flexCenter } from "../../../utility/styling";
import QuestionCount from "../QuestionCount/QuestionCount";
import TimeCount from "../TimeCount/TimeCount";

export default function QuestionControls() {
  return (
    <Box
      sx={{
        ...flexCenter,
        justifyContent: "center",
        flexDirection: "column",
        ml: "30px",
        gridRow: "2",
        gridColumn: "2",
      }}
    >
      <Box sx={{ display: "flex", mb: "20px" }}>
        <QuestionCount label="Pytania podstawowe" value="3/20" active={true} />
        <QuestionCount
          label="Pytania specjalistyczne"
          value="3/12"
          active={false}
        />
      </Box>
      <TimeCount />

      <Button
        size="large"
        variant="contained"
        sx={{
          textTransform: "unset",
          mt: "100px",
          px: "35px",
          py: "10px",
        }}
      >
        <Typography variant="h6">Następne pytanie</Typography>
      </Button>
    </Box>
  );
}
