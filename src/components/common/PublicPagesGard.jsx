import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PublicPagesGuard() { // Fixed typo in component name
  const { isAuthenticated, loading } = useAuth();

  if (loading || !isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
