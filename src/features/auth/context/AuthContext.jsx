import {
  createContext,
  useEffect,
  useState,
  useMemo
} from "react";
import { setToken, clearToken } from "@/shared/api";
import { authApi } from "@/shared/api";

const PUBLIC_PATHS = ["/login", "/join"];

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 새로고침 시 로그인 복구
  useEffect(() => {
    const restoreSession = async () => {
      const currentPath = window.location.pathname;
      if (PUBLIC_PATHS.includes(currentPath)) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data } = await authApi.refresh();

        if (data?.accessToken) {
          setToken(data.accessToken);
          setUser(user);
        }

      } catch (err) {
        clearToken();
        setUser(null);

      } finally {
        setIsLoading(false);
      }

    };

    restoreSession();
  }, []);


  // 로그인
  const login = (accessToken, userData) => {
    setToken(accessToken);
    setUser(userData);
  };



  // 로그아웃
  const logout = async () => {
    try {
      await authApi.logout();

    } catch (error) {
      // TODO: - 로그아웃 에러 처리

    } finally {
      clearToken();
      setIsLoading(false);
    }
  };

  const value = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    setUser,
  }), [user, isLoading],
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

