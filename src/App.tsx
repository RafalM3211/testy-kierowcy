import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./components/views/Home";
import Exam from "./components/views/Exam";
import Summary from "./components/views/Summary";
import Error404 from "./components/views/errors/Error404";
import Header from "./components/patterns/Header/Header";
import SmallHeader from "./components/patterns/SmallHeader/SmallHeader";
import AppThemeProvider from "./context/theme/theme";
import { QuestionsProvider } from "./context/questions/questions";
import Question from "./components/views/Question";

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
        <Route path="/question/:id" element={<Question />} />
      </Route>
      <Route
        element={
          <>
            <SmallHeader />
            <Outlet />
          </>
        }
      >
        <Route path="/question" element={<Exam />} />
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
