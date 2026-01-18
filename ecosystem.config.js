module.exports = {
  apps: [
    {
      name: "poem-bot",
      script: "src/server/index.ts",
      interpreter: "node",
      interpreter_args: [
        "-r",
        "ts-node/register",
        "-r",
        "tsconfig-paths/register",
      ],
      instances: 1,
      watch: false,
    },
  ],
};
