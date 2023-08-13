import SectionHeader from "../../../atoms/SectionHeader/SectionHeader";
import { Box } from "@mui/material";

interface Props {
  children: string;
}

export default function ListHeader(props: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        mt: "70px",
      }}
    >
      <SectionHeader
        variant="h4"
        sx={{
          textAlign: "left",
          width: "fit-content",
          bgcolor: "rgba(255,255,255, 0.7)",
          py: "15px",
          pr: "20px",
          boxShadow: "-13ch 0 0 rgba(255,255,255, 0.7)",
          borderTopRightRadius: "50px",
          borderBottomRightRadius: "50px",
        }}
      >
        {props.children}
      </SectionHeader>
    </Box>
  );
}
