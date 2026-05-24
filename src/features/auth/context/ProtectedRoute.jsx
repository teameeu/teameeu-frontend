import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/context/AuthContext";

export const ProtectedRoute = () => {
  const { user } = useAuth();

  // 로그인 안됨
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 로그인 됨
  return <Outlet />;
};