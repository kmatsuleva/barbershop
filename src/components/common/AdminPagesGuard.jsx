import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminPagesGuard() {
  const { userRole } = useAuth();
  
  return userRole === "admin" ? <Outlet /> : <Navigate to="/forbidden" />;
}
