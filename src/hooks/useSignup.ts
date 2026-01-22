import React, { useCallback, useRef } from "react";
import useValidateForm, { type Refs } from "./useValidateForm";

function useSignup() {
  const { errors, validateFields } = useValidateForm();

  const refs: Refs = {
    name: useRef<HTMLInputElement>(null),
    username: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (!validateFields(refs)) return;
      // Send Data to Database
    },
    []
  );

  return { refs, errors, handleSubmit };
}

export default useSignup;
