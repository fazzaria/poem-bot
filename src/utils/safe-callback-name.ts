const hiddenSpace = "\u2063"; // invisible character applied before callback names

export const addHiddenCharacter = (str: string) => {
  return `${hiddenSpace}${str}`;
};

export const removeHiddenCharacter = (str: string) => {
  return str.replace(hiddenSpace, "");
};
