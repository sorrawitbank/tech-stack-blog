function validateBio(bio: string) {
  if (bio.length < 10) return "Bio must be at least 10 characters long";
  if (bio.length > 120) return "Bio cannot exceed 120 characters";

  return null;
}

export default validateBio;
