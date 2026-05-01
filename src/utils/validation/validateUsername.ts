const usernameRegex: RegExp = /^[a-zA-Z0-9._-]+$/;

function validateUsername(username: string) {
  if (!username) return "Username is required";
  if (username.trim().length < 4)
    return "Username must be at least 4 characters long";
  if (username.trim().length > 16)
    return "Username must be less than 16 characters long";
  if (!usernameRegex.test(username.trim()))
    return "Username must contain only letters, numbers, dots, dashes and underscores";

  return null;
}

export default validateUsername;
