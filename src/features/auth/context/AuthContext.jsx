import {
  createContext,
  useEffect,
  useState,
  useMemo
} from "react";
import { getToken, setToken, clearToken, instance } from "@/shared/api";
import { authApi } from "@/shared/api";

const PUBLIC_PATHS = ["/login", "/join"];

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const currentPath = window.location.pathname;

      if (PUBLIC_PATHS.includes(currentPath)) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await authApi.refresh();
        const payload = data?.data ?? data;
        const accessToken = payload?.accessToken;
        const userData = payload?.user ?? payload?.member ?? payload?.profile ?? {};

        if (!accessToken) {
          throw new Error("refresh accessToken 미발급");
        }

        setToken(accessToken);
        instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        setUser(userData);
      } catch (error) {
        clearToken();
        delete instance.defaults.headers.common.Authorization;
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
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
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
      delete instance.defaults.headers.common.Authorization;
      setUser(null);
      setIsLoading(false);
    }
  };

  const value = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: Boolean(user) || Boolean(getToken()),
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
