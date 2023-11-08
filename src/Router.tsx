import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./components/views/Home";
import ExamQuestion from "./components/views/ExamQuestion/ExamQuestion";
import PreviewQuestion from "./components/views/PreviewQuestion/PreviewQuestion";
import Summary from "./components/views/Summary";
import Error404 from "./components/views/errors/Error404";
import Error500 from "./components/views/errors/Error500";
import Header from "./components/patterns/Header/Header";
import SmallHeader from "./components/patterns/SmallHeader/SmallHeader";

interface MenuItem {
  title: string;
  to: string;
}

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

export const mainMenuStructure: MenuItem[] = [
  { title: "ulubione", to: "/" },
  { title: "test", to: "/" },
];

export const userMenuStructure: MenuItem[] = [
  { title: "wyloguj", to: "/" },
  { title: "costam", to: "/" },
];

export function Router() {
  return <RouterProvider router={router} />;
}
