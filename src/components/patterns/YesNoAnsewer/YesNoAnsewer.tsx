import { Box } from "@mui/material";
import AnsewerButton from "../../atomsReusable/AnsewerButton/AnsewerButton";
import type { SxProps } from "@mui/material/styles";

interface Props {
  size: number;
  sx?: SxProps;
}

export default function YesNoAnseswer(props: Props) {
  const px = props.size * 8 + "px";
  const py = props.size + "px";
  const fontSize = props.size * 0.34 + "em";
  const mr = props.size * 10 + "px";

  return (
    <Box sx={{ display: "flex", justifyContent: "center", ...props.sx }}>
      <AnsewerButton
        checked
        size="large"
        sx={{ px: px, py: py, fontSize: fontSize, mr: mr }}
      >
        tak
      </AnsewerButton>
      <AnsewerButton size="large" sx={{ px: px, py: py, fontSize: fontSize }}>
        nie
      </AnsewerButton>
    </Box>
  );
}
