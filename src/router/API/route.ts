import express from "express";
import { UNOCHA_alpha3_to_str } from "../../objects/OCHA_Codes";
import { HDXAsylumData, HDXCountries, HDXFoodPrice } from "../../utils/hdx";
import {
  ExpressErrorResponse,
  ExpressSuccessResponse,
} from "../../utils/response/ResponseUtils";
import ROUTES from "../routes";
import MulterSingleton from "../../utils/multer/MulterSingleton";

const mult = MulterSingleton.getInstance();
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
        palestine: {
          description:
            "Return current Palestine Conflict death toll based on web search",
          caution:
            "This endpoint returns an arbitrary value that should not be used in any data-critical applications",
          route: "/api/v1/palestine",
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
      "This and all child endpoints are able to manipulate any HXL-Supported data via the use of HXL tags for easier dataset creation (e.g. AI Training, Time-Series Analysis)",
    endpoints: {
      hxl: {
        accepts: "multipart/form-data",
        description:
          "Manipulate given data via given HXL tags, supports year range selection and column filtering",
        params: {
          ascending:
            "Ascending or descending order where '+' is ascending and '-' is descending (options: year+, year-, column+, column-) (optional)",
          year: "Year range to filter by (optional)",
          column: "Column to filter by (required) (Needs HXL tags)",
          file: "The CSV file to manipulate (required)",
        },
      },
    },
  });
});

//? @GET: HXL Manipulation Endpoint
APIController.post(
  ROUTES.api.manifold.hxl.local_root,
  mult.single("file"),
  async (req, res, next) => {}
);

export default APIController;
