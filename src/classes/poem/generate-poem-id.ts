import { getArchivedPoems } from "data";

export const generatePoemId = () => {
  const archivedPoems = getArchivedPoems();
  const maxAttempts = 10;
  let id = 0;
  for (let i = 0; i < maxAttempts; i++) {
    // random 4-digit number
    id = Math.floor(Math.random() * 9000) + 1000;
    if (!archivedPoems[id]) break;
  }

  return id;
};
