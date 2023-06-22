import { createContext, useState } from "react";

type User = {
  username: string;
  id: string;
};
export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const contextValue = {
    user,
    setUser,
  };

  // Return the provider with the context value and the children components
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
