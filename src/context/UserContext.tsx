import { createContext, useState } from "react";

type User = {
  username: string;
  id: string;
  isAdmin: boolean;
};
export type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};
const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

const UserContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const contextValue = {
    currentUser,
    setCurrentUser,
  };

  // Return the provider with the context value and the children components
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
