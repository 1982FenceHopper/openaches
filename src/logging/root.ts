import pinoHttp from "pino-http";
import pino_logger from "./loggers/logger";

const express_pino_bindings = pinoHttp({
  logger: pino_logger,
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      id: req.id,
    }),
  },
  customLogLevel(req, res, error) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || error) {
      return "error";
    }
    return "trace";
  },
  customSuccessMessage(res) {
    if (res.statusCode === 404) {
      return "Resource Not Found";
    }
    return `${res.statusCode} - Request Completed`;
  },
  customErrorMessage(error, res) {
    return `Request Errored With Status Code: ${res.statusCode} || Error Block: ${error}`;
  },
});

export default express_pino_bindings;
