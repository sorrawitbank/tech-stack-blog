import React, { useState } from "react";
import validateBio from "@/utils/validateBio";
import validateEmail from "@/utils/validateEmail";
import validateName from "@/utils/validateName";
import validatePassword from "@/utils/validatePassword";
import validateUsername from "@/utils/validateUsername";

type InputKeys = "name" | "username" | "email" | "password" | "newPassword";
type TextAreaKeys = "bio";

export type InputRefs = Record<InputKeys, React.RefObject<HTMLInputElement>>;
export type TextAreaRefs = Record<
  TextAreaKeys,
  React.RefObject<HTMLTextAreaElement>
>;

type InputValidations = Record<InputKeys, (value: string) => string | null>;
type TextAreaValidations = Record<
  TextAreaKeys,
  (value: string) => string | null
>;

type InputErrors = Partial<Record<InputKeys, string>>;
type TextAreaErrors = Partial<Record<TextAreaKeys, string>>;

const inputValidations: InputValidations = {
  name: validateName,
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
  newPassword: validatePassword,
};

const textareaValidations: TextAreaValidations = {
  bio: validateBio,
};

function useValidateForm() {
  const [inputErrors, setInputErrors] = useState<InputErrors>({});
  const [textareaErrors, setTextAreaErrors] = useState<TextAreaErrors>({});

  const validateInputFields = (refs: Partial<InputRefs>) => {
    const newErrors: InputErrors = {};
    for (const [key, ref] of Object.entries(refs)) {
      const error = inputValidations[key as InputKeys](ref.current.value);
      if (error) {
        newErrors[key as InputKeys] = error;
      }
    }
    setInputErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTextAreaFields = (refs: Partial<TextAreaRefs>) => {
    const newErrors: TextAreaErrors = {};
    for (const [key, ref] of Object.entries(refs)) {
      const error = textareaValidations[key as TextAreaKeys](ref.current.value);
      if (error) {
        newErrors[key as TextAreaKeys] = error;
      }
    }
    setTextAreaErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    inputErrors,
    textareaErrors,
    validateInputFields,
    validateTextAreaFields,
  };
}

export default useValidateForm;
