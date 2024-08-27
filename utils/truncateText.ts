export const truncateText = (str: string) => {
  if (str.length < 250) {
    return str;
  } else {
    return str.substring(0, 250) + "...";
  }
};
