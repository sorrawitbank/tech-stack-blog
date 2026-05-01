function validatePassword(password: string, prefix?: string) {
  const text = prefix ? `${prefix} password` : "Password";

  if (!password) return `${text} is required`;
  if (password.length < 8) return `${text} must be at least 8 characters long`;
  if (password.length > 32)
    return `${text} must be less than 32 characters long`;

  return null;
}

export default validatePassword;
