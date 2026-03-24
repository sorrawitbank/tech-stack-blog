import React, { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import useConfirmDialog from "./useConfirmDialog";
import useValidateForm, { type InputRefs } from "./useValidateForm";
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
  const { inputErrors, validateInputFields } = useValidateForm();
  const { isConfirmDialogOpen, requestConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();

  const refs: Pick<InputRefs, "password" | "newPassword"> = {
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
    event.preventDefault();
    setError(null);
    setConfirmPasswordError(null);
    if (!validateInputFields(refs)) return;

    if (refs.newPassword.current.value !== confirmPasswordRef.current.value) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    const isConfirmed = await requestConfirm();
    if (!isConfirmed) return;

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
    isConfirmDialogOpen,
    inputErrors,
    confirmPasswordError,
    handleSubmit,
    handleConfirm,
    handleCancel,
  };
}

export default useResetPassword;
