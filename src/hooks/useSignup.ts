import React, { useEffect, useRef, useState } from "react";
import useValidateForm, { type Refs } from "./useValidateForm";
import { useAuthContext } from "@/contexts/AuthContext";
import sonner from "@/utils/sonner";

function useSignup() {
  const isFirstRender = useRef<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { isLoading, error, register } = useAuthContext();
  const { errors, validateFields } = useValidateForm();

  const refs: Pick<Refs, "name" | "username" | "email" | "password"> = {
    name: useRef<HTMLInputElement>(document.createElement("input")),
    username: useRef<HTMLInputElement>(document.createElement("input")),
    email: useRef<HTMLInputElement>(document.createElement("input")),
    password: useRef<HTMLInputElement>(document.createElement("input")),
  };

  // This effect will not run on the first render.
  useEffect(() => {
    if (!error || isFirstRender.current) return;
    sonner.error({
      message: "Registration failed",
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
    const success = await register({
      name: refs.name.current.value,
      username: refs.username.current.value,
      email: refs.email.current.value,
      password: refs.password.current.value,
    });
    setIsSuccess(success);
  };

  return { refs, isSuccess, isLoading, errors, handleSubmit };
}

export default useSignup;
