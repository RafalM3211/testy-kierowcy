import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Progress from "../../../patterns/Progress/Progress";
import SectionSubtitle from "../../../atoms/SectionSubtitle/SectionSubtitle";
import SectionHeader from "../../../atoms/SectionHeader/SectionHeader";
import HighlitedText from "../../../atoms/HighlitedText/HighlitedText";
import { useUserContext } from "../../../../context/user/user";

export default function ProgressSection() {
  const { user } = useUserContext();
  const isLoggedIn = !!user;
  console.log(isLoggedIn);

  return (
    <>
      <SectionHeader>Twój progres</SectionHeader>
      <SectionSubtitle>
        Rozwiązuj testy a pasek progresu będzie uzupełniał się sam. Dzięki temu
        będziesz wiedzieć kiedy jesteś gotowy\a do egzaminu
      </SectionSubtitle>

      <Progress
        correctPercent={0}
        wrongPercent={0}
        sx={{
          mt: "40px",
          filter: isLoggedIn ? "none" : "blur(1px) opacity(0.4)",
        }}
      />
      {isLoggedIn || (
        <Typography
          sx={{
            position: "relative",
            top: "-1.5em",
            fontSize: "1.4em",
            fontStyle: "italic",
            color: "grey.700",
          }}
        >
          <Link to="/login" style={{ textDecoration: "none", color: "unset" }}>
            <HighlitedText>Zaloguj się</HighlitedText> aby kontrolować swój
            progres
          </Link>
        </Typography>
      )}
    </>
  );
}
