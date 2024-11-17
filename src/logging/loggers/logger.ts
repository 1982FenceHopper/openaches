import pino from "pino";
import primaryTransport from "../transports/primary";

const pino_logger = pino(primaryTransport);

export default pino_logger;
