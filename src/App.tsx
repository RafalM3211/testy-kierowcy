import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { Router } from "./Router";
import AppThemeProvider from "./context/theme/theme";
import { AnswersProvider } from "./context/Answers/Answers";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <AnswersProvider>
          <CssBaseline />
          <Router />
        </AnswersProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
