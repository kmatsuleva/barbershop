import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? userData : null;
  });

  const handleUser = (user) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
