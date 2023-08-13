import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import bgImage from "../../images/backgrounds/wave.svg";
import { flexCenter, backgroundImg } from "../../utility/styling";
import Progress from "../patterns/Progress/Progress";
import ButtonLink from "../atoms/ButtonLink/ButtonLink";
import SectionSubtitle from "../atoms/SectionSubtitle/SectionSubtitle";
import SectionHeader from "../atoms/SectionHeader/SectionHeader";
import HighlitedText from "../atoms/HighlitedText/HighlitedText";

export default function Home() {
  return (
    <Box
      sx={{
        ...backgroundImg(bgImage),
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
            mb: "100px",
          }}
          xs={6}
        >
          <SectionHeader>Twój progres</SectionHeader>
          <SectionSubtitle>
            Rozwiązuj testy a pasek progresu będzie uzupełniał się sam. Dzięki
            temu będziesz wiedział kiedy jesteś gotowy do egzaminu
          </SectionSubtitle>
          <Progress correct={20} wrong={30} sx={{ mt: "60px" }} />
        </Grid>
        <Grid
          sx={{ ...flexCenter, flexDirection: "column", mb: "100px" }}
          xs={6}
        >
          <SectionHeader sx={{ mb: "5px" }}>
            Kategoria: <HighlitedText variant="h1">B</HighlitedText>
          </SectionHeader>
          <SectionSubtitle variant="subtitle1">
            Spróbuj swoich sił w egzaminie próbnym lub rozwiązuj pojedyńczo
            najtrudniejsze i niepoznane wcześniej pytania
          </SectionSubtitle>
          <ButtonLink
            to="/question"
            sx={{
              color: "common.white",
              borderRadius: "15px",
              px: "50px",
              mb: "20px",
              mt: "40px",
            }}
            variant="contained"
          >
            <Typography variant="h5" component={"p"}>
              Rozwiaż test na kategorię B
            </Typography>
          </ButtonLink>
          <ButtonLink to="#" sx={{ borderRadius: "15px" }} variant="outlined">
            <Typography variant="h6" component={"p"}>
              Zobacz ulubione pytania
            </Typography>
          </ButtonLink>
        </Grid>
      </Grid>
    </Box>
  );
}
