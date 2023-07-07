import { Box, Typography } from "@mui/material";
import ABCAnsewer from "../ABCAnsewer/ABCAnsewer";
import YesNoAnseswer from "../YesNoAnsewer/YesNoAnsewer";

export default function QuestionContent() {
  return (
    <Box sx={{ gridRow: "3", gridColumn: "1/3" }}>
      <Typography
        sx={(theme) => ({
          borderLeft: `3px solid ${theme.palette.primary.main}`,
          p: "5px",
        })}
        variant="h6"
      >
        Czy jadąc na wprost masz pierwszeństwo przed pojazdem nadjeżdżającym z
        kierunku przeciwnego, skręcającym w lewo?
      </Typography>
      <Box>
        {/* <YesNoAnseswer /> */}
        <ABCAnsewer />
      </Box>
    </Box>
  );
}
