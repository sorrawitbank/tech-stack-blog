function validateIntroduction(introduction: string) {
  if (!introduction) return "Introduction is required";
  if (introduction.trim().length < 20)
    return "Introduction must be at least 20 characters long";
  if (introduction.trim().length > 400)
    return "Introduction must be less than 400 characters long";

  return null;
}

export default validateIntroduction;
