import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import bgImage from "../../images/backgrounds/wave.svg";
import { flexCenter } from "../../utility/styling";
import Progress from "../patterns/Progress/Progress";

export default function Home() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Grid
        sx={{
          height: "100%",
          px: { xs: "100px", lg: "150px" },
        }}
        container
      >
        <Grid
          sx={{
            ...flexCenter,
            flexDirection: "column",
          }}
          xs={6}
        >
          <Typography variant="h4">Twój progres</Typography>
          <Typography
            sx={{ textAlign: "center", px: "18%", mt: "5px" }}
            variant="subtitle2"
          >
            Rozwiązuj testy a pasek progresu będzie uzupełniał się sam. Dzięki
            temu będziesz wiedział kiedy jesteś gotowy do egzaminu
          </Typography>
          <Progress />
        </Grid>
        <Grid xs={6}></Grid>
      </Grid>
    </Box>
  );
}
