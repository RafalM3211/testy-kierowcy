import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

declare module "@mui/material/styles" {
  interface SimplePaletteColorOptions {
    veryLight: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      veryLight: "#ffe0b2",
      light: "#ffb74d",
      main: "#fb8c00",
      dark: "#e65100",
    },
  },
});

interface Props {
  children: ReactNode;
}

export default function AppThemeProvider(props: Props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
