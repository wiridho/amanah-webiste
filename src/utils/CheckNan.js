export const checkNaN = (number) => {
  if (isNaN(number)) {
    return 0;
  } else {
    return number;
  }
};
