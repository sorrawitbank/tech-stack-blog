import React, { useState } from "react";
import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import validateName from "@/utils/validateName";
import validateUsername from "@/utils/validateUsername";

type Keys = "name" | "username" | "email" | "password";

export type Refs = Partial<Record<Keys, React.RefObject<HTMLInputElement>>>;
type Validations = Record<Keys, (value: string) => string | null>;
type Errors = Partial<Record<Keys, string>>;

const validations: Validations = {
  name: validateName,
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
};

function useValidateForm() {
  const [errors, setErrors] = useState<Errors>({});

  const validateFields = (refs: Refs) => {
    const newErrors: Errors = {};
    for (const [key, ref] of Object.entries(refs)) {
      const error = validations[key as Keys](ref.current.value);
      if (error) {
        newErrors[key as Keys] = error;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateFields };
}

export default useValidateForm;
