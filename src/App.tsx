import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Box } from "@mui/material";
import HomeView from "./components/views/Home";
import QuestionView from "./components/views/Question";
import Header from "./components/patterns/Header/Header";
import AppThemeProvider from "./context/theme/theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomeView />} />
      <Route path="/question" element={<QuestionView />} />
    </>
  )
);

function App() {
  return (
    <AppThemeProvider>
      <Box sx={{ minHeight: "100vh" }}>
        <Header />
        <RouterProvider router={router} />
      </Box>
    </AppThemeProvider>
  );
}

export default App;
