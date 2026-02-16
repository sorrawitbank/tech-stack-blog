import type { LoginData, RegisterData } from "@/types/auth";
import type { User } from "@/types/user";
import { createContext, useContext } from "react";
import useAuth from "@/hooks/useAuth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGetUserLoading: boolean | null;
  error: string | null;
  register: (data: RegisterData) => Promise<boolean>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isGetUserLoading: null,
  error: null,
  register: async (data: RegisterData) => false,
  login: async (data: LoginData) => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const {
    user,
    isAuthenticated,
    isLoading,
    isGetUserLoading,
    error,
    register,
    login,
    logout,
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isGetUserLoading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
