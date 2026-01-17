// https://core.telegram.org/bots/api#formatting-options
import { ParseMode } from "grammy/types";

// TODO figure out how to use telegram's markdown because it doesn't seem to work
export const sanitizeMarkdownV2 = (markdown: string) => {
  const regex = new RegExp(/[_*[\]()~`>#+-=|{}.!]/g);
  const sanitizedMarkdown = markdown;
  return sanitizedMarkdown.replace(regex, "\\$&");
};

export const sanitizeHtml = (html: string) => {
  const sanitizedHtml = html;
  sanitizedHtml.replaceAll("<", "&lt");
  sanitizedHtml.replaceAll(">", "&gt");
  sanitizedHtml.replaceAll("&", "&amp");
  return sanitizedHtml;
};

export const sanitizeText = (
  str: string,
  parseMode: ParseMode = "MarkdownV2",
): string => {
  switch (parseMode) {
    case "Markdown":
      return str;
    case "MarkdownV2":
      return sanitizeMarkdownV2(str);
    case "HTML":
      return sanitizeHtml(str);
  }
};

export const getSanitizedMessage = (
  msg: string,
  parseMode: ParseMode = "MarkdownV2",
) => {
  const sanitizedMessage = sanitizeText(msg, parseMode);
  const newMessage = `${sanitizedMessage.trim()}`;
  return newMessage;
};
