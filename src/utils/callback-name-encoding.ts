const hiddenSpace = "\u2063"; // invisible character applied before callback names

const isEncoded = (str: string) => str[0] === hiddenSpace;

export const encodeCallbackName = (str: string) => {
  return isEncoded(str) ? str : `${hiddenSpace}${str}`;
};

export const decodeCallbackName = (str: string) => {
  return str.replace(hiddenSpace, "");
};
