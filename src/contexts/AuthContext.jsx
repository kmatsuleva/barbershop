import { createContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../service/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user?.accessToken, user  }}>{children}</AuthContext.Provider>
  );
};
