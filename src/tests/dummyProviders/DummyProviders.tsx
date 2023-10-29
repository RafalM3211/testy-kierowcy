import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppThemeProvider from "../../context/theme/theme";
import { AnswersProvider } from "../../context/Answers/Answers";
import type { ReactNode, ComponentProps, JSX } from "react";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 0,
      },
    },
  });
}

interface Props {
  children: ReactNode;
  routes?: ReactNode;
  initialEntries?: string[];
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
  const router = createMemoryRouter(createRoutesFromElements(routeElements), {
    initialEntries: props.initialEntries,
  });

  return (
    <QueryClientProvider client={createQueryClient()}>
      <AppThemeProvider>
        <AnswersProvider>
          <RouterProvider router={router} />
        </AnswersProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}
