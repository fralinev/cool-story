import { createContext, useState } from "react";

// type User = {
//   username: string;
//   _id: string;
//   roles: {};
// };
// export type UserContextType = {
//   currentUser: User | null;
//   setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
// };

export const anon = {
  roles: {
    admin: false,
    editor: false,
    user: false,
  },
  username: "anon",
  _id: 1,
};

const UserContext = createContext<any>({
  currentUser: null,
  setCurrentUser: () => {},
});

const UserContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(anon);

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
