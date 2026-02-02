import React, { useRef } from "react";
import useValidateForm, { type Refs } from "./useValidateForm";

function useuseLogin() {
  const { errors, validateFields } = useValidateForm();

  const refs: Refs = {
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

export default useuseLogin;
