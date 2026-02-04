import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

/**
 * user shape:
 * {
 *   id,
 *   fullName,
 *   role: 'ADMIN' | 'LECTURER' | 'STUDENT',
 *   isLeader: boolean,
 *   token
 * }
 */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Load user from localStorage when refresh */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /* Login */
  const login = (authResponse) => {

    const userData = {
      id: authResponse.userId,
      fullName: authResponse.fullName,
      email: authResponse.email,
      role: authResponse.role,
      token: authResponse.token,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authResponse.token);
  };

  /* Logout */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  /* Helpers */
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";
  const isLecturer = user?.role === "LECTURER";
  const isStudent = user?.role === "STUDENT";
  

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        isLecturer,
        isStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* Custom hook */
export const useAuth = () => useContext(AuthContext);
