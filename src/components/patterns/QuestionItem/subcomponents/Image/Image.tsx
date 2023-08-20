import { Box } from "@mui/material";

interface Props {
  mediaUrl: string;
}

export default function Image(props: Props) {
  return (
    <Box
      component="img"
      src={props.mediaUrl}
      alt={"miniaturka obrazu dla pytania egzaminacyjnego"}
      sx={{ width: "100%" }}
    ></Box>
  );
}
