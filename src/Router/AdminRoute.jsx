import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/error" state={{ from: location }} replace />;
};
