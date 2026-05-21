import {
  createContext,
  useEffect,
  useState,
} from "react";
import { setToken, clearToken } from "@/shared/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 새로고침 시 로그인 복구
  useEffect(() => {
    const restoreSession = async () => {
      const { data } = await fetch(
        `${process.env.REACT_APP_WAYMORE_API_URL}/auth/refresh`,
        { method: "POST", credentials: "include" }
      ).then((res) => {
        if (!res.ok) throw new Error("refresh failed");
        return res.json();
      });

      setToken(data.accessToken);
      setUser(data.user);
    };

    restoreSession();
  }, []);

  const login = (accessToken, userData) => {
    setToken(accessToken);
    setUser(userData);
  };



  const logout = () => {
    clearToken();
    setUser(null);
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

