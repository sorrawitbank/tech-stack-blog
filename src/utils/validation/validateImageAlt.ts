function validateImageAlt(imageAlt: string) {
  if (imageAlt) {
    if (imageAlt.trim().length < 4)
      return "Image alternative text must be at least 4 characters long";
    if (imageAlt.trim().length > 40)
      return "Image alternative text must be less than 40 characters long";
  }

  return null;
}

export default validateImageAlt;
