function validatePassword(password: string, checkRegex: boolean = true) {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (password.length > 32) return "Password cannot exceed 32 characters";

  return null;
}

export default validatePassword;
