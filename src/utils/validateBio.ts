function validateBio(bio: string) {
  if (bio.trim().length < 10) return "Bio must be at least 10 characters long";
  if (bio.trim().length > 400) return "Bio cannot exceed 400 characters";

  return null;
}

export default validateBio;
