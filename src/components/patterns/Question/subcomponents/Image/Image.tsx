import { Box, SxProps } from "@mui/system";

interface Props {
  src: string;
  alt?: string;
  sx?: SxProps;
}

export default function Image(props: Props) {
  return (
    <Box
      component="img"
      src={props.src}
      alt={props.alt || ""}
      sx={{ ...props.sx }}
    ></Box>
  );
}
