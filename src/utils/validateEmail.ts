const emailRegExp: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email: string) {
  if (!email) return "Email is required";
  if (!emailRegExp.test(email)) return "Email must be a valid email";
  return null;
}

export default validateEmail;
