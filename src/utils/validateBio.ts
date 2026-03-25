function validateBio(bio: string) {
  if (bio.length < 10) return "Bio must be at least 10 characters long";
  if (bio.length > 400) return "Bio cannot exceed 400 characters";

  return null;
}

export default validateBio;
