import { addPlayer } from "data";

export const getSimulatedPlayer = () => {
  const testId = Math.floor(Math.random() * 9000) + 1000;
  const testPlayer = addPlayer({
    id: testId,
    simulated: true,
    userName: `Simmy_Smith${testId}`,
  });
  return testPlayer;
};
