const hiddenSpace = "\u2063"; // invisible character applied before callback names

export const encodeCallbackName = (str: string) => {
  return `${hiddenSpace}${str}`;
};

export const decodeCallbackName = (str: string) => {
  return str.replace(hiddenSpace, "");
};
