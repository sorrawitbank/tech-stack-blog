const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email: string) {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email address";

  return null;
}

export default validateEmail;
