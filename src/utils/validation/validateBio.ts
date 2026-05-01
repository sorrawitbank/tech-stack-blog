function validateBio(bio: string) {
  if (!bio) return "Bio is required";
  if (bio.trim().length < 20) return "Bio must be at least 20 characters long";
  if (bio.trim().length > 400)
    return "Bio must be less than 400 characters long";

  return null;
}

export default validateBio;
