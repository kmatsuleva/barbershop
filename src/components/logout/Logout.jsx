import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

const Logout = () => {
  const { logout } = useLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/" />;
};

export default Logout;
