import type { LoginData, RegisterData } from "@/types/auth";
import type { User } from "@/types/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { fetchUser, toLogin, toRegister } from "@/services/authService";
import { toUser } from "@/utils/user";

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

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsGetUserLoading(false);
      return;
    }

    setIsGetUserLoading(true);
    try {
      const response = await fetchUser();
      setUser(toUser(response.data));
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

  const login = async (data: LoginData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await toLogin(data);
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      await getUser();
      navigate("/");
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

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
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
