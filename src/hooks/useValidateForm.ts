import React, { useCallback, useState } from "react";
import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import validateName from "@/utils/validateName";
import validateUsername from "@/utils/validateUsername";

const keys = ["name", "username", "email", "password"] as const;

export type Refs = Partial<
  Record<(typeof keys)[number], React.RefObject<HTMLInputElement | null>>
>;
type Validations = Record<
  (typeof keys)[number],
  (arg0: string) => string | null
>;
type Errors = Partial<Record<(typeof keys)[number], string>>;

const validations: Validations = {
  name: validateName,
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
};

function useValidateForm() {
  const [errors, setErrors] = useState<Errors>({});

  const validateFields = useCallback((refs: Refs) => {
    const newErrors: Errors = {};
    for (const key of keys) {
      const ref = refs[key];
      if (ref?.current) {
        const error = validations[key](ref.current.value);
        if (error) {
          newErrors[key] = error;
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  return { errors, validateFields };
}

export default useValidateForm;
