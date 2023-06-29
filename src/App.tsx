import HomeView from "./components/views/Home";
import Header from "./components/patterns/Header/Header";
import AppThemeProvider from "./context/theme/theme";
import { Box } from "@mui/material";

function App() {
  return (
    <AppThemeProvider>
      <Box sx={{ minHeight: "100vh" }}>
        <Header />
        <HomeView />
      </Box>
    </AppThemeProvider>
  );
}

export default App;
