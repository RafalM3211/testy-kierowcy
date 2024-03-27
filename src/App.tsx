import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { Router } from "./Router";
import AppThemeProvider from "./context/theme/theme";
import { AnswersProvider } from "./context/Answers/Answers";
import UserProvider from "./context/user/user";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <UserProvider>
          <AnswersProvider>
            <CssBaseline />
            <Router />
          </AnswersProvider>
        </UserProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
