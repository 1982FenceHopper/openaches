import express from "express";
import ROUTES from "../routes";
import { HDXCountries } from "../../utils/hdx";

const APIController = express.Router();

APIController.get(ROUTES.api.local_root, (req, res, next) => {
  res.status(200).send({
    status: 200,
    endpoints: {
      countries: {
        description: "Return list of available countries",
        route: "/api/v1/countries",
      },
    },
  });
});

APIController.get(ROUTES.api.countries.local, async (req, res, next) => {
  const paginate_offset = req.query.index;

  try {
    const response = await HDXCountries(
      process.env.HDX_IDENT,
      100,
      Number(paginate_offset)
    );

    if (response) {
      const { result, error } = response;

      if (error) {
        res.status(500).send({
          status: 500,
          error: {
            outcome: "Failed to fulfill request",
            reason: `${error}: ${result}`,
          },
        });
      } else {
        res.status(200).send({
          status: 200,
          result: result,
        });
      }
    }
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      error: {
        outcome: "Failed to fulfill request",
        reason: `${err}`,
      },
    });
  }
});

export default APIController;
