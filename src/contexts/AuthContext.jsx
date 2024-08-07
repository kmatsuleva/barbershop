import { createContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../service/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user?.accessToken, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
