const nameRegex: RegExp = /^[a-zA-Z.\s]+$/;

function validateName(name: string) {
  if (!name) return "Name is required";
  if (name.length < 4) return "Name must be at least 4 characters long";
  if (name.length > 64) return "Name cannot exceed 64 characters";
  if (!nameRegex.test(name))
    return "Name must contain only letters, dots and spaces";

  return null;
}

export default validateName;
