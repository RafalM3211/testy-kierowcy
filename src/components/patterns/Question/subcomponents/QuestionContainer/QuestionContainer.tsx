import { Container } from "@mui/material";
import { SxProps } from "@mui/material";

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

export default function QuestionContainer(props: Props) {
  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "921px 1fr",
        gridTemplateRows: "min-content 540px auto",
        minHeight: "100vh",
        pt: "60px",
        maxWidth: { lg: "1400px" },
        ...props.sx,
      }}
    >
      {props.children}
    </Container>
  );
}
