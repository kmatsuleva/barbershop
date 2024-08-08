import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ClientPagesGuard() {
  const { userRole } = useAuth();

  return userRole === "client" ? <Outlet /> : <Navigate to="/forbidden" />;
}
