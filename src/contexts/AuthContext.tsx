import type { LoginData, RegisterData } from "@/types/auth";
import type { Admin, User } from "@/types/user";
import { createContext, useContext } from "react";
import useAuth from "@/hooks/useAuth";

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGetUserLoading: boolean | null;
  isGetAdminLoading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<boolean>;
  login: (data: LoginData, requiredAdmin: boolean) => Promise<void>;
  logout: (showMessage?: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  admin: null,
  isAuthenticated: false,
  isLoading: false,
  isGetUserLoading: null,
  isGetAdminLoading: false,
  error: null,
  register: async () => false,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const {
    user,
    admin,
    isAuthenticated,
    isLoading,
    isGetUserLoading,
    isGetAdminLoading,
    error,
    register,
    login,
    logout,
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isAuthenticated,
        isLoading,
        isGetUserLoading,
        isGetAdminLoading,
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
