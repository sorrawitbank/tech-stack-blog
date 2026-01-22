function validateName(password: string) {
  if (!password) return "Name is required";
  if (password.length < 6) return "Name must be at least 6 characters";
  return null;
}

export default validateName;
