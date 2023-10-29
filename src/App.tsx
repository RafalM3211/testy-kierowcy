import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import Home from "./components/views/Home";
import ExamQuestion from "./components/views/ExamQuestion/ExamQuestion";
import PreviewQuestion from "./components/views/PreviewQuestion/PreviewQuestion";
import Summary from "./components/views/Summary";
import Error404 from "./components/views/errors/Error404";
import Error500 from "./components/views/errors/Error500";
import Header from "./components/patterns/Header/Header";
import SmallHeader from "./components/patterns/SmallHeader/SmallHeader";
import AppThemeProvider from "./context/theme/theme";
import { AnswersProvider } from "./context/Answers/Answers";

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
        <Route path="/" element={<Home />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/question/:id" element={<PreviewQuestion />} />
      </Route>
      <Route
        element={
          <>
            <SmallHeader />
            <Outlet />
          </>
        }
      >
        <Route path="/question" element={<ExamQuestion />} />
      </Route>
      <Route element={<Outlet />}>
        <Route path="/error/500" element={<Error500 />} />
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
        <AnswersProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </AnswersProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
