import { ReactNode, createContext, useContext, useState } from "react";
import type { User } from "../../types/globalTypes";

interface Props {
  children: ReactNode;
}

interface UserContext {
  user: User | null;
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

  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
