import React, { useState } from "react";
import validateBio from "@/utils/validation/validateBio";
import validateCategory from "@/utils/validation/validateCategory";
import validateContent from "@/utils/validation/validateContent";
import validateEmail from "@/utils/validation/validateEmail";
import validateImageAlt from "@/utils/validation/validateImageAlt";
import validateIntroduction from "@/utils/validation/validateIntroduction";
import validateName from "@/utils/validation/validateName";
import validatePassword from "@/utils/validation/validatePassword";
import validateTitle from "@/utils/validation/validateTitle";
import validateUsername from "@/utils/validation/validateUsername";

type InputKeys =
  | "name"
  | "username"
  | "email"
  | "password"
  | "category"
  | "imageAlt"
  | "title"
  | "newPassword";
type TextAreaKeys = "bio" | "introduction" | "content";

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
  category: validateCategory,
  imageAlt: validateImageAlt,
  title: validateTitle,
  newPassword: (value) => validatePassword(value, "New"),
};

const textareaValidations: TextAreaValidations = {
  bio: validateBio,
  introduction: validateIntroduction,
  content: validateContent,
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
