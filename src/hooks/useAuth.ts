import type { LoginData, RegisterData } from "@/types/auth";
import type { User } from "@/types/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { fetchUser, toLogin, toRegister } from "@/services/authService";
import { toUser } from "@/utils/user";
import sonner from "@/utils/sonner";

function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGetUserLoading, setIsGetUserLoading] = useState<boolean | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (): Promise<User | null> => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsGetUserLoading(false);
      return null;
    }
    setIsGetUserLoading(true);
    try {
      const response = await fetchUser();
      const fetchedUser = toUser(response.data);
      setUser(fetchedUser);
      return fetchedUser;
    } catch (error) {
      setUser(null);
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Please try again");
        } else {
          setError(error.message || "Please try again");
        }
      }
      return null;
    } finally {
      setIsGetUserLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setError(null);
    setIsLoading(true);
    try {
      await toRegister(data);
      setIsLoading(false);
      return true;
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Please try again");
        } else {
          setError(error.message || "Please try again");
        }
      }
      setIsLoading(false);
      return false;
    }
  };

  const login = async (data: LoginData, requiredAdmin: boolean) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await toLogin(data);
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      const fetchedUser = await getUser();
      if (requiredAdmin && fetchedUser?.role !== "admin") {
        localStorage.removeItem("token");
        setUser(null);
        throw new Error("You must be an administrator to access this page");
      }
      sonner.success({
        message: "Login successful",
        description: "You are now logged in",
      });
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Please try again");
        } else {
          setError(error.message || "Please try again");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (showMessage: boolean = true) => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    if (showMessage) {
      sonner.success({
        message: "Logout successful",
        description: "You are now logged out",
      });
    }
  };

  const isAuthenticated = Boolean(user);

  return {
    user,
    isAuthenticated,
    isLoading,
    isGetUserLoading,
    error,
    register,
    login,
    logout,
  };
}

export default useAuth;
