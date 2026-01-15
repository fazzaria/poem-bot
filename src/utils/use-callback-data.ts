import { CallbackWithData } from "types";

type CallbackParams = Record<string, string | number>;

export const encodeCallbackData = (
  action: CallbackWithData,
  params: CallbackParams = {}
) => {
  const query = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  return query ? `${action}|${query}` : action;
};

export function decodeCallbackData(data: string) {
  const [action, paramString] = data.split("|");

  const params: Record<string, string> = {};

  if (paramString) {
    for (const pair of paramString.split("&")) {
      const [key, value] = pair.split("=");
      params[key] = value;
    }
  }

  return { action, params };
}
