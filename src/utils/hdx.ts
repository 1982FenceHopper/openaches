import type { ErrorResponse } from "../interfaces/FetchErrorResponse";
import { isErrorResponse } from "../interfaces/FetchErrorResponse";

import { batchFetchHDXAsylumData } from "./subcomponent/hdx_batch_fetch";

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
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const a1 = await fetch(
    `https://hapi.humdata.org/api/v1/metadata/admin1?output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const a2 = await fetch(
    `https://hapi.humdata.org/api/v1/metadata/admin2?output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
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

export async function HDXAsylumData(
  ident: string,
  cc: string,
  lim: number,
  offset: number
) {
  const {
    general: { domain, a1, a2 },
    affected_people: { refugees, human_needs, idps, returnees },
    c_and_c: { op_pres, funding, conflict_event, national_risk },
    fs_and_nutr: { food_sec, food_price },
    pop_and_se: { population, pov_rate },
  } = await batchFetchHDXAsylumData(ident, cc, lim, offset);

  if (
    isErrorResponse(domain) ||
    isErrorResponse(a1) ||
    isErrorResponse(a2) ||
    isErrorResponse(refugees) ||
    isErrorResponse(human_needs) ||
    isErrorResponse(idps) ||
    isErrorResponse(returnees) ||
    isErrorResponse(op_pres) ||
    isErrorResponse(funding) ||
    isErrorResponse(conflict_event) ||
    isErrorResponse(national_risk) ||
    isErrorResponse(food_sec) ||
    isErrorResponse(food_price) ||
    isErrorResponse(population) ||
    isErrorResponse(pov_rate)
  ) {
    if (isErrorResponse(domain)) {
      return {
        result: domain,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(a1)) {
      return {
        result: a1,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(a2)) {
      return {
        result: a2,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(refugees)) {
      return {
        result: refugees,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(human_needs)) {
      return {
        result: human_needs,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(idps)) {
      return {
        result: idps,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(returnees)) {
      return {
        result: returnees,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(op_pres)) {
      return {
        result: op_pres,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(funding)) {
      return {
        result: funding,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(conflict_event)) {
      return {
        result: conflict_event,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(national_risk)) {
      return {
        result: national_risk,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(food_sec)) {
      return {
        result: food_sec,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(food_price)) {
      return {
        result: food_price,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(population)) {
      return {
        result: population,
        error: "Error trying to retrieve asylum data",
      };
    }

    if (isErrorResponse(pov_rate)) {
      return {
        result: pov_rate,
        error: "Error trying to retrieve asylum data",
      };
    }
  } else {
    const concat_result = {
      domain: domain.data,
      admin_1: a1.data,
      admin_2: a2.data,
      contexts: {
        affected_people: {
          refugees: refugees.data,
          human_needs: human_needs.data,
          idps: idps.data,
          returnees: returnees.data,
        },
        coordination_and_context: {
          op_pres: op_pres.data,
          funding: funding.data,
          conflict_event: conflict_event.data,
          national_risk: national_risk.data,
        },
        food_and_nutrition: {
          food_sec: food_sec.data,
          food_price: food_price.data,
        },
        population_and_socioeconomy: {
          population: population.data,
          pov_rate: pov_rate.data,
        },
      },
    };

    return {
      result: concat_result,
      error: null,
    };
  }
}

export async function HDXFoodPrice(ident: string, cc: string) {
  try {
    const food_price = await fetch(
      `https://hapi.humdata.org/api/v1/food/food-price?location_code=${encodeURIComponent(
        cc
      )}&output_format=json&app_identifier=${encodeURIComponent(
        ident
      )}&limit=1&offset=0`
    )
      .then((res) => res.json())
      .catch((err: ErrorResponse) => err);

    if (isErrorResponse(food_price)) {
      return {
        result: food_price,
        error: "Error trying to retrieve food pricing data",
      };
    }

    const resource_id = food_price.data[0].resource_hdx_id;

    const food_price_resource = await fetch(
      `https://hapi.humdata.org/api/v1/metadata/resource?resource_hdx_id=${encodeURIComponent(
        resource_id
      )}&app_identifier=${encodeURIComponent(ident)}&limit=1&offset=0`
    )
      .then((res) => res.json())
      .catch((err: ErrorResponse) => err);

    if (isErrorResponse(food_price_resource)) {
      return {
        result: food_price_resource,
        error: "Error trying to retrieve food pricing data",
      };
    }

    const resource_file_location = food_price_resource.data[0].download_url;
    const filename = resource_file_location.split("download/").pop();

    const food_price_data_csv = await fetch(resource_file_location)
      .then((res) => res.text())
      .catch((err: ErrorResponse) => err);

    if (isErrorResponse(food_price_data_csv)) {
      return {
        result: food_price_data_csv,
        error: "Error trying to retrieve food pricing data",
      };
    }

    return {
      result: {
        data: food_price_data_csv,
        filename: filename,
      },
      error: null,
    };
  } catch (err: any) {
    return {
      result: err,
      error: "Error trying to retrieve food pricing data",
    };
  }
}
