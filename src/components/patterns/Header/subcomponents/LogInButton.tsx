import ButtonLink from "../../../atoms/ButtonLink/ButtonLink";

import type { SxProps } from "@mui/material";

interface Props {
  sx?: SxProps;
}

export default function LogInButton(props: Props) {
  return (
    <ButtonLink
      to="/login"
      sx={{
        ml: "10px",
        mr: "10px",
        color: "primary.dark",
        userSelect: "none",
        ...props.sx,
      }}
    >
      zaloguj się
    </ButtonLink>
  );
}
