import React, { useRef } from "react";
import useValidateForm, { type Refs } from "./useValidateForm";

function useSignup() {
  const { errors, validateFields } = useValidateForm();

  const refs: Refs = {
    name: useRef<HTMLInputElement>(document.createElement("input")),
    username: useRef<HTMLInputElement>(document.createElement("input")),
    email: useRef<HTMLInputElement>(document.createElement("input")),
    password: useRef<HTMLInputElement>(document.createElement("input")),
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!validateFields(refs)) return;
    // Send Data to Database
  };

  return { refs, errors, handleSubmit };
}

export default useSignup;
