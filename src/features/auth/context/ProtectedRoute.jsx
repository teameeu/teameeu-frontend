import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

export const ProtectedRoute = () => {
  const { isLoading, isAuthenticated } = useAuth();


  if (isLoading) {
    return <LoadingSpinner label="로그인 중" fullscreen />;
  }

  // 로그인 안됨
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  // 로그인 됨
  return <Outlet />;
};