import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { User } from "../../types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { checkToken } from "../../core/services/user";
import { useOnMount } from "../../utility/hooks";
import Loader from "../../components/patterns/Loader/Loader";

interface Props {
  children: ReactNode;
}

interface UserContext {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContext | null>(null);

export function useUserContext() {
  const contextValue = useContext(UserContext);

  if (!contextValue) {
    throw new Error("do not use user context outside provider");
  }

  return contextValue;
}

export default function UserProvider(props: Props) {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["checkToken"],
    queryFn: checkToken,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!isError && !isLoading) {
      setUser(data);
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {isLoading ? <Loader /> : props.children}
    </UserContext.Provider>
  );
}
