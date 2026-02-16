const usernameRegex: RegExp = /^[a-zA-Z0-9._-]+$/;

function validateUsername(username: string) {
  if (!username) return "Username is required";
  if (username.length < 4) return "Username must be at least 4 characters long";
  if (username.length > 16) return "Username cannot exceed 16 characters";
  if (!usernameRegex.test(username))
    return "Username must contain only letters, numbers, dots, dashes and underscores";

  return null;
}

export default validateUsername;
