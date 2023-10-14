export const checkArrayForStrings = (arr: any[]) => {
  return arr.every(item => typeof item === 'string');
};
