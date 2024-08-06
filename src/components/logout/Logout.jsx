// components/logout/Logout.js

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

const Logout = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      navigate("/login");
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div>
      <h2>Logging Out...</h2>
    </div>
  );
};

export default Logout;
