import express from "express";
import ROUTES from "../routes";
import { HDXStatus } from "../../utils/hdx/hdx";
const RootController = express.Router();

RootController.get(ROUTES.lander, async (req, res, next) => {
  const hdx_stat = await HDXStatus();

  res.status(200).send({
    status: 200,
    info: {
      overseer: "OpenACHES Overseer is online",
      hdx: hdx_stat,
    },
  });
});

export default RootController;
