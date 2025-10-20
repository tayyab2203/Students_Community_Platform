export const validateForm = (data, isEdit = false) => {
  const errors = {};
  if (!data.name) errors.name = 'Name is required';
  if (!data.category) errors.category = 'Category is required';
  if (!isEdit && !data.picture) errors.picture = 'Picture is required';
  if (!data.semester) errors.semester = 'Semester is required';
  if (!data.bio) errors.bio = 'Bio is required';
  return errors;
};