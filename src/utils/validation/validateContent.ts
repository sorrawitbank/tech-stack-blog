function validateContent(content: string) {
  if (!content) return "Content is required";
  if (content.trim().length < 40)
    return "Content must be at least 40 characters long";

  return null;
}

export default validateContent;
