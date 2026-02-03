import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  roles,
  leaderOnly,
  memberOnly,
  children,
}) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  if (leaderOnly && !user.isLeader) {
    return <Navigate to="/student" />;
  }

  if (memberOnly && user.isLeader) {
    return <Navigate to="/student" />;
  }

  return children ? children : <Outlet />;
}
