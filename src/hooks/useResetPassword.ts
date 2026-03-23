import React, { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import useValidateForm, { type Refs } from "./useValidateForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { resetPassword } from "@/services/authService";
import sonner from "@/utils/sonner";

function useResetPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const { logout } = useAuthContext();
  const { errors, validateFields } = useValidateForm();

  const refs: Pick<Refs, "password" | "newPassword"> = {
    password: useRef<HTMLInputElement>(document.createElement("input")),
    newPassword: useRef<HTMLInputElement>(document.createElement("input")),
  };

  const confirmPasswordRef = useRef<HTMLInputElement>(
    document.createElement("input")
  );

  useEffect(() => {
    if (!error) return;
    sonner.error({
      message: "Reset password failed",
      description: error,
    });
  }, [error]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    setError(null);
    setConfirmPasswordError(null);
    event.preventDefault();
    if (!validateFields(refs)) return;

    if (refs.newPassword.current.value !== confirmPasswordRef.current.value) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword({
        oldPassword: refs.password.current.value,
        newPassword: confirmPasswordRef.current.value,
      });
      sonner.success({
        message: "Reset password successful",
        description:
          "Your password has been reset. Please login with your new password.",
      });
      logout(false);
    } catch (error) {
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

  return {
    refs,
    confirmPasswordRef,
    isLoading,
    errors,
    confirmPasswordError,
    handleSubmit,
  };
}

export default useResetPassword;
