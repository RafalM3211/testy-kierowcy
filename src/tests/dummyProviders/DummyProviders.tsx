import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppThemeProvider from "../../context/theme/theme";
import { AnsewersProvider } from "../../context/Ansewers/Ansewers";
import type { ReactNode, ComponentProps, JSX } from "react";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
  routes?: ReactNode;
}

export function wrapInDummyProviders<P extends {}>(
  Component: (props: P) => JSX.Element
) {
  type Props = ComponentProps<typeof Component>;

  function Wrapped(props: Props) {
    return (
      <DummyProviders>
        <Component {...props}></Component>
      </DummyProviders>
    );
  }

  return Wrapped;
}

export default function DummyProviders(props: Props) {
  const routeElements = props.routes || (
    <Route path="*" element={props.children} />
  );
  const router = createBrowserRouter(createRoutesFromElements(routeElements));

  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <AnsewersProvider>
          <RouterProvider router={router} />
        </AnsewersProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}
