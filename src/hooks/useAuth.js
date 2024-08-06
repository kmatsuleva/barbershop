import { useContext } from "react";
import { login, register } from "../api/auth-api";
import { AuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
  const { changeAuthState } = useContext(AuthContext);

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    changeAuthState(result);

    return result;
  };

  return handleLogin;
};

export const useRegister = () => {
  const { changeAuthState } = useContext(AuthContext);

  const handleRegister = async (email, password) => {
    const result = await register(email, password);
    changeAuthState(result);

    return result;
  };

  return handleRegister;
};


export function useLogout() {
  const { setUser } = useContext(AuthContext);

  const logout = async () => {
    try {
      const response = await fetch("/users/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 204) {
        setUser(null); 
      } else {
        console.error("Failed to log out. Unexpected response code:", response.status);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
}
