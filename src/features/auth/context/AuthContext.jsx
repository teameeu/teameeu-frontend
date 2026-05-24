import {
  createContext,
  useEffect,
  useState,
} from "react";
import { setToken, clearToken } from "@/shared/api";
import { authApi } from "@/shared/api";
import { use } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 새로고침 시 로그인 복구
  useEffect(() => {
    const restoreSession = async () => {

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


  const login = (accessToken, userData) => {
    setToken(accessToken);
    setUser(userData);
  };



  /**
   * 로그아웃
   */
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

