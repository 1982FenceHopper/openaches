import express from "express";
import { UNOCHA_alpha3_to_str } from "../../objects/OCHA_Codes";
import { HDXAsylumData, HDXCountries, HDXFoodPrice } from "../../utils/hdx/hdx";
import {
  ManifoldDataByFile,
  ManifoldDataByResource,
  ManifoldStatus,
} from "../../utils/manifold/manifold";
import {
  ExpressErrorResponse,
  ExpressSuccessResponse,
} from "../../utils/response/ResponseUtils";
import ROUTES from "../routes";

const APIController = express.Router();

//* Root API Endpoint

//? @GET: Available Endpoints
APIController.get(
  [ROUTES.api.local_root, `${ROUTES.api.local_root}v1`],
  (req, res, next) => {
    res.status(200).send({
      status: 200,
      endpoints: {
        hdx: {
          description: "Data retrieval from the Humanitarian Data Exchange",
          countries: {
            description: "Return list of available countries",
            route: "/api/v1/countries",
            params: {
              index: "Number of results to skip, useful for pagination",
            },
          },
          cds: {
            description: "Return country specific details",
            route: "/api/v1/cds",
            params: {
              country: "ISO3166-1 Alpha-3 country code to return details about",
              index:
                "Number of results to skip in each subattribute of details, useful for subattr. pagination",
            },
          },
          fp: {
            description:
              "Returns country food pricing data, result is given as a CSV",
            route: "/api/v1/fp",
            params: {
              country: "ISO3166-1 Alpha-3 country code to return details about",
            },
          },
        },
        manifold: {
          description:
            "Allows manipulation of various CSV data (e.g. data-prep, ML)",
          route: "/api/v1/manifold",
          subroutes: {
            status: {
              description: "Returns status of Manifolding Server",
              route: "/api/v1/manifold/status",
            },
            hxl: {
              description:
                "Manipulate data via HXL tags, query GET /api/v1/manifold for required params",
              route: "/api/v1/manifold/hxl",
            },
          },
        },
      },
    });
  }
);

//* HDX API Endpoints

//? @GET: Available Endpoints Relative To HDX
APIController.get(ROUTES.api.hdx.local_root, async (req, res, next) => {
  res.status(200).send({
    status: 200,
    endpoints: {
      countries: {
        description: "Return list of available countries",
        route: "/api/v1/countries",
        params: {
          index: "Number of results to skip, useful for pagination",
        },
      },
      cds: {
        description: "Return country specific details",
        route: "/api/v1/cds",
        params: {
          country: "ISO3166-1 Alpha-3 country code to return details about",
          index:
            "Number of results to skip in each subattribute of details, useful for subattr. pagination",
        },
      },
      fp: {
        description:
          "Returns country food pricing data, result is given as a CSV",
        route: "/api/v1/fp",
        params: {
          country: "ISO3166-1 Alpha-3 country code to return details about",
        },
      },
    },
  });
});

//? @GET: Get Available List Of Countries
APIController.get(
  ROUTES.api.hdx.countries.local_root,
  async (req, res, next) => {
    const paginate_offset = req.query.index ?? 0;

    try {
      const response = await HDXCountries(
        process.env.HDX_IDENT,
        100,
        Number(paginate_offset)
      );

      if (response) {
        const { result, error } = response;

        if (error) {
          res.log.error(`[OVERSEER]: ${error}`);
          ExpressErrorResponse(res, `${error}: ${result}`);
        } else {
          ExpressSuccessResponse(res, result);
        }
      }
    } catch (err: any) {
      ExpressErrorResponse(res, `${err}`);
    }
  }
);

//? @GET: Get Country Specific Details
APIController.get(ROUTES.api.hdx.cds.local_root, async (req, res, next) => {
  const paginate_offset = req.query.index ?? 0;
  const country = req.query.country;

  if (!country) {
    ExpressErrorResponse(
      res,
      "No country provided in query parameter by client",
      400
    );
    return;
  }

  if (
    UNOCHA_alpha3_to_str[
      String(country) as keyof typeof UNOCHA_alpha3_to_str
    ] === undefined
  ) {
    ExpressErrorResponse(
      res,
      "Invalid country provided in query parameter by client",
      400
    );
    return;
  }

  try {
    const response = await HDXAsylumData(
      process.env.HDX_IDENT,
      String(country),
      100,
      Number(paginate_offset)
    );

    if (response) {
      const { result, error } = response;

      if (error) {
        res.log.error(`[OVERSEER]: ${error}`);
        ExpressErrorResponse(res, `${error}: ${result}`);
      } else {
        ExpressSuccessResponse(res, result);
      }
    }
  } catch (err: any) {
    ExpressErrorResponse(res, `${err}`);
  }
});

//? @GET: Get Country Food Pricing
APIController.get(ROUTES.api.hdx.fp.local_root, async (req, res, next) => {
  const country = req.query.country;

  if (!country) {
    ExpressErrorResponse(
      res,
      "No country provided in query parameter by client",
      400
    );
    return;
  }

  if (
    UNOCHA_alpha3_to_str[
      String(country) as keyof typeof UNOCHA_alpha3_to_str
    ] === undefined
  ) {
    ExpressErrorResponse(
      res,
      "Invalid country provided in query parameter by client",
      400
    );
    return;
  }

  try {
    const { result, error } = await HDXFoodPrice(
      process.env.HDX_IDENT,
      String(country)
    );

    if (error) {
      res.log.error(`[OVERSEER]: ${error}`);
      ExpressErrorResponse(res, `${error}: ${result}`, 500);
    } else {
      res.setHeader("ORIGIN-FILENAME", result.filename);
      res.status(200).send(result.data);
    }
  } catch (err: any) {
    ExpressErrorResponse(res, `${err}`);
  }
});

//* Manifold API Endpoints

//? @GET: Available Endpoints Relative To Manifold
APIController.get(ROUTES.api.manifold.local_root, (req, res, next) => {
  res.status(200).send({
    status: 200,
    description:
      "This and all child endpoints are able to manipulate any HXL-Supported data via the use of HXL tags for easier dataset creation (e.g. AI Training, Time-Series Analysis), note that this endpoint only supports CSV at the moment",
    endpoints: {
      hxl: {
        description:
          "Manipulate given CSV data via given HXL tags, supports year range selection and column filtering",
        q_params: {
          file: "Link to CSV dataset to manipulate (required if resource ID not given)",
          resource_id:
            "Resource ID of HDX dataset to manipulate (required if file not given, HDX only)",
          tags: "Tags to filter by (required) (Needs HXL tags, comma separated)",
        },
      },
    },
  });
});

//? @GET: HXL Manifold Status
APIController.get(
  ROUTES.api.manifold.status.local_root,
  async (req, res, next) => {
    const { result, error } = await ManifoldStatus();

    if (error) {
      res.log.error(`[OVERSEER]: ${error}`);
      ExpressErrorResponse(res, `${error}: ${result}`, 500);
    } else {
      ExpressSuccessResponse(res, result);
    }
  }
);

//? @GET: HXL Manipulation Endpoint
APIController.get(
  ROUTES.api.manifold.hxl.local_root,
  async (req, res, next) => {
    const { file, resource_id, tags } = req.query;

    if (!file && !resource_id) {
      ExpressErrorResponse(
        res,
        "No file or resource ID provided in query parameter by client",
        400
      );
      return;
    }

    if (!tags) {
      ExpressErrorResponse(
        res,
        "No column tags provided in query parameter by client",
        400
      );
      return;
    }

    if (file) {
      try {
        const { result, error } = await ManifoldDataByFile(
          file as string,
          tags as string
        );

        if (error) {
          ExpressErrorResponse(res, `${error}: ${result}`, 500);
        } else {
          res.contentType("text/csv");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=folded.csv"
          );
          res.status(200).send(result);
        }
      } catch (err: any) {
        ExpressErrorResponse(res, `${err}`);
      }
    }

    if (resource_id) {
      try {
        const { result, error } = await ManifoldDataByResource(
          process.env.HDX_IDENT,
          resource_id as string,
          tags as string
        );

        if (error) {
          ExpressErrorResponse(res, `${error}: ${result}`, 500);
        } else {
          res.contentType("text/csv");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=folded.csv"
          );
          res.status(200).send(result);
        }
      } catch (err: any) {
        ExpressErrorResponse(res, `${err}`);
      }
    }
  }
);

export default APIController;
