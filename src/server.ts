import { configDotenv } from "dotenv";
import express from "express";

import pino_logger from "./logging/loggers/logger";
import express_pino_bindings from "./logging/root";
import all_routes from "./middleware/all_routes";
import RootController from "./router/Lander/route";
import ROUTES from "./router/routes";
import APIController from "./router/API/route";

configDotenv();

const app = express();

app.use(express.json());
app.use(express_pino_bindings);
app.use(all_routes);

app.use(ROUTES.lander, RootController);
app.use(ROUTES.api.global_root, APIController);

app.listen(process.env.PORT, () => {
  pino_logger.info(`[OVERSEER]: Server listening on port ${process.env.PORT}`);
});
