import React, { useEffect, useRef } from "react";
import useValidateForm, { type Refs } from "./useValidateForm";
import { useAuthContext } from "@/contexts/AuthContext";
import sonner from "@/utils/sonner";

function useLogin() {
  const isFirstRender = useRef<boolean>(true);
  const { isLoading, error, login } = useAuthContext();
  const { errors, validateFields } = useValidateForm();

  const refs: Pick<Refs, "email" | "password"> = {
    email: useRef<HTMLInputElement>(document.createElement("input")),
    password: useRef<HTMLInputElement>(document.createElement("input")),
  };

  // This effect will not run on the first render.
  useEffect(() => {
    if (!error || isFirstRender.current) return;
    sonner.error({
      message: "Login failed",
      description: error,
    });
  }, [error]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!validateFields(refs)) return;
    await login({
      email: refs.email.current.value,
      password: refs.password.current.value,
    });
  };

  return { refs, isLoading, errors, handleSubmit };
}

export default useLogin;
