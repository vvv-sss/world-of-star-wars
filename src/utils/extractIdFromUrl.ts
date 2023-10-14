export const extractIdFromUrl = (url: string): number | null => {
  const parts = url.split('/');

  const number = parseInt(parts[parts.length - 2], 10);

  if (!isNaN(number)) {
    return number;
  } else {
    return null;
  }
};
