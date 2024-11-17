import pino from "pino";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const primaryTransport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: { colorize: true },
    },
    // {
    //   target: "pino/file",
    //   options: {
    //     destination: resolve(__dirname, "../../../logs/latest.acheslog"),
    //   },
    // },
  ],
});

export default primaryTransport;
