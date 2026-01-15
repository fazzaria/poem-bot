import { GrammyError } from "grammy";

export const messageNotModified = (err?: GrammyError) => {
  return (
    err?.error_code === 400 &&
    err?.description.includes("Bad Request: message is not modified")
  );
};

export const messageNotFound = (err?: GrammyError) => {
  return (
    err?.error_code === 400 &&
    err?.description === "Bad Request: message to edit not found"
  );
};

export const chatNotFound = (err?: GrammyError) => {
  return (
    err?.error_code === 400 &&
    err?.description.includes("Bad Request: chat not found")
  );
};
