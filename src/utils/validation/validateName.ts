const nameRegex: RegExp = /^[a-zA-Z.\s]+$/;

function validateName(name: string) {
  if (!name) return "Name is required";
  if (name.trim().length < 4) return "Name must be at least 4 characters long";
  if (name.trim().length > 64)
    return "Name must be less than 64 characters long";
  if (!nameRegex.test(name))
    return "Name must contain only letters, dots and spaces";

  return null;
}

export default validateName;
