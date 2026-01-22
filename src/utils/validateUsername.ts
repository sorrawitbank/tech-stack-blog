function validateUsername(password: string) {
  if (!password) return "Username is required";
  if (password.length < 6) return "Username must be at least 6 characters";
  return null;
}

export default validateUsername;
