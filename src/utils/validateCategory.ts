const categoryRegex: RegExp = /^[a-zA-Z0-9\s]+$/;

function validateCategory(category: string) {
  if (!category) return "Category is required";
  if (category.trim().length < 2)
    return "Category must be at least 2 characters long";
  if (category.trim().length > 20)
    return "Category must be less than 20 characters long";
  if (!categoryRegex.test(category))
    return "Category must contain only letters, numbers and spaces";

  return null;
}

export default validateCategory;
