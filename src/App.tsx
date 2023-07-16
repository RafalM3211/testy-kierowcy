import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";
import HomeView from "./components/views/Home";
import QuestionView from "./components/views/Question";
import Summary from "./components/views/Summary";
import Error404 from "./components/views/errors/Error404";
import Header from "./components/patterns/Header/Header";
import SmallHeader from "./components/patterns/SmallHeader/SmallHeader";
import AppThemeProvider from "./context/theme/theme";
import { QuestionsProvider } from "./context/questions/questions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <>
            <Header />
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<HomeView />} />
        <Route path="/summary" element={<Summary />} />
      </Route>
      <Route
        element={
          <>
            <SmallHeader />
            <Outlet />
          </>
        }
      >
        <Route path="/question" element={<QuestionView />} />
      </Route>
      <Route element={<Outlet />}>
        <Route path="*" element={<Error404 />} />
      </Route>
    </>
  )
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <QuestionsProvider>
          <RouterProvider router={router} />
        </QuestionsProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
