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
        minHeight: "100vh",
      }}
    >
      <Grid
        sx={{
          width: "100%",
          minHeight: "100vh",
          px: { xs: "40px", md: "50px", lg: "150px" },
          pt: { xs: "100px", md: "0" },
          fontSize: { xs: "0.9em", sm: "1em" },
          alignItems: "baseline",
          alignContent: "center",
        }}
        columnSpacing={{ md: 5, lg: 1 }}
        rowGap={10}
        container
      >
        <Grid
          sx={{
            ...flexCenter,
            flexDirection: "column",
            mb: { xs: "80px", md: "50px" },
            order: { xs: 2, md: 0 },
          }}
          xs={12}
          md={6}
        >
          <SectionHeader>Twój progres</SectionHeader>
          <SectionSubtitle>
            Rozwiązuj testy a pasek progresu będzie uzupełniał się sam. Dzięki
            temu będziesz wiedział kiedy jesteś gotowy do egzaminu
          </SectionSubtitle>
          <Progress correctPercent={20} wrongPercent={30} sx={{ mt: "40px" }} />
        </Grid>
        <Grid
          sx={{
            ...flexCenter,
            flexDirection: "column",
            mb: { xs: 0, md: "50px" },
          }}
          xs={12}
          md={6}
        >
          <SectionHeader sx={{ mb: "5px" }}>
            Kategoria:{" "}
            <HighlitedText sx={{ fontSize: "2em" }} variant="h1">
              B
            </HighlitedText>
          </SectionHeader>
          <SectionSubtitle>
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
              mt: { xs: "20px", sm: "40px" },
            }}
            variant="contained"
          >
            <Typography
              component={"p"}
              sx={{ fontSize: { xs: "1em", md: "1.35em" } }}
            >
              Rozwiaż test na kategorię B
            </Typography>
          </ButtonLink>
          <ButtonLink to="#" sx={{ borderRadius: "15px" }} variant="outlined">
            <Typography component={"p"} sx={{ fontSize: "1.1em" }}>
              Zobacz ulubione pytania
            </Typography>
          </ButtonLink>
        </Grid>
      </Grid>
    </Box>
  );
}
