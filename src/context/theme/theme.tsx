import { createTheme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffa729",
      main: "#FF8C08",
      dark: "#f36c07",
    },
  },
});

interface Props {
  children: ReactNode;
}

export default function AppThemeProvider(props: Props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
