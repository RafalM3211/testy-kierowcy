import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

declare module "@mui/material/styles" {
  interface SimplePaletteColorOptions {
    veryLight?: string;
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
    error: {
      main: "#e54141",
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && { color: "white" }),
        }),
      },
    },
  },
});

interface Props {
  children: ReactNode;
}

export default function AppThemeProvider(props: Props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
