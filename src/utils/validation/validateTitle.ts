function validateTitle(title: string) {
  if (!title) return "Title is required";
  if (title.trim().length < 10)
    return "Title must be at least 10 characters long";
  if (title.trim().length > 80)
    return "Title must be less than 80 characters long";

  return null;
}

export default validateTitle;
