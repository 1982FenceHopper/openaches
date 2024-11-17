import type { ErrorResponse } from "../interfaces/FetchErrorResponse";
import { isErrorResponse } from "../interfaces/FetchErrorResponse";

export async function HDXStatus() {
  const hdx_stat = await fetch(`https://hapi.humdata.org/api/v1/util/version`)
    .then((res) => res.status === 200)
    .catch((err: ErrorResponse) => err);

  if (typeof hdx_stat === "boolean") {
    switch (hdx_stat) {
      case true:
        return "Humanitarian Data Exchange HAPI is online";
      case false:
        return "Unable to reach Humanitarian Data Exchange HAPI";
      default:
        return "Unable to reach Humanitarian Data Exchange HAPI";
    }
  } else {
    return `Error trying to reach Humanitarian Data Exchange HAPI (Overseer Error, please check logs)`;
  }
}

export async function HDXCountries(ident: string, lim: number, offset: number) {
  const domain = await fetch(
    `https://hapi.humdata.org/api/v1/metadata/location?output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${lim}&offset=${offset * lim}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const a1 = await fetch(
    `https://hapi.humdata.org/api/v1/metadata/admin1?output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${lim}&offset=${offset * lim}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const a2 = await fetch(
    `https://hapi.humdata.org/api/v1/metadata/admin2?output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${lim}&offset=${offset * lim}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  if (isErrorResponse(domain) || isErrorResponse(a1) || isErrorResponse(a2)) {
    if (isErrorResponse(domain)) {
      return {
        result: domain,
        error: "Error trying to retrieve countries",
      };
    }

    if (isErrorResponse(a1)) {
      return {
        result: a1,
        error: "Error trying to retrieve countries",
      };
    }

    if (isErrorResponse(a2)) {
      return {
        result: a2,
        error: "Error trying to retrieve countries",
      };
    }
  } else {
    const concat_result = domain.data.map((domain_val: any, idx: number) => {
      const a1_area = a1.data.filter(
        (a1_val: any) => a1_val.location_code === domain_val.code
      );
      const a2_area = a2.data.filter(
        (a2_val: any) => a2_val.location_code === domain_val.code
      );

      return {
        ...domain_val,
        admin_1:
          a1_area.length > 0
            ? a1_area.map((_a1_val: any) => ({
                id: _a1_val.id,
                code: _a1_val.code,
                name: _a1_val.name,
                from_cods: _a1_val.from_cods,
                reference_period_start: _a1_val.reference_period_start,
                reference_period_end: _a1_val.reference_period_end,
              }))
            : "unavailable",
        admin_2:
          a2_area.length > 0
            ? a2_area.map((_a2_val: any) => ({
                id: _a2_val.id,
                code: _a2_val.code,
                name: _a2_val.name,
                from_cods: _a2_val.from_cods,
                reference_period_start: _a2_val.reference_period_start,
                reference_period_end: _a2_val.reference_period_end,
                admin1_code: _a2_val.admin1_code,
                admin1_name: _a2_val.admin1_name,
              }))
            : "unavailable",
      };
    });

    return {
      result: concat_result,
      error: null,
    };
  }
}
