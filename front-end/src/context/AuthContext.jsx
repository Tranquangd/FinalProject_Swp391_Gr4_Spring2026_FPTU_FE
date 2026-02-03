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
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
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
  const isLeader = isStudent && user?.isLeader;
  const isMember = isStudent && !user?.isLeader;

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
        isLeader,
        isMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* Custom hook */
export const useAuth = () => useContext(AuthContext);
