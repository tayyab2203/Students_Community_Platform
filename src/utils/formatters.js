export const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
};