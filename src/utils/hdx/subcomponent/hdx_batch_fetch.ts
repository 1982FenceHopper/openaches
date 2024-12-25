import type { ErrorResponse } from "../../interfaces/FetchErrorResponse";

export async function batchFetchHDXAsylumData(
  ident: string,
  cc: string,
  lim: number,
  offset: number
) {
  const domain = await fetch(
    `https://hapi.humdata.org/api/v1/metadata/location?code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=10&offset=0`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const a1 = await fetch(
    `https://hapi.humdata.org/api/v1/metadata/admin1?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const a2 = await fetch(
    `https://hapi.humdata.org/api/v1/metadata/admin2?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const refugees = await fetch(
    `https://hapi.humdata.org/api/v1/affected-people/refugees?origin_location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const human_needs = await fetch(
    `https://hapi.humdata.org/api/v1/affected-people/humanitarian-needs?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const idps = await fetch(
    `https://hapi.humdata.org/api/v1/affected-people/idps?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const returnees = await fetch(
    `https://hapi.humdata.org/api/v1/affected-people/returnees?origin_location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const op_pres = await fetch(
    `https://hapi.humdata.org/api/v1/coordination-context/operational-presence?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const funding = await fetch(
    `https://hapi.humdata.org/api/v1/coordination-context/funding?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const conflict_event = await fetch(
    `https://hapi.humdata.org/api/v1/coordination-context/conflict-event?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const national_risk = await fetch(
    `https://hapi.humdata.org/api/v1/coordination-context/national-risk?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const food_sec = await fetch(
    `https://hapi.humdata.org/api/v1/food/food-security?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const food_price = await fetch(
    `https://hapi.humdata.org/api/v1/food/food-price?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const population = await fetch(
    `https://hapi.humdata.org/api/v1/population-social/population?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  const pov_rate = await fetch(
    `https://hapi.humdata.org/api/v1/population-social/poverty-rate?location_code=${encodeURIComponent(
      cc
    )}&output_format=json&app_identifier=${encodeURIComponent(
      ident
    )}&limit=${encodeURIComponent(lim)}&offset=${encodeURIComponent(
      offset * lim
    )}`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  return {
    general: {
      domain,
      a1,
      a2,
    },
    affected_people: {
      refugees,
      human_needs,
      idps,
      returnees,
    },
    c_and_c: {
      op_pres,
      funding,
      conflict_event,
      national_risk,
    },
    fs_and_nutr: {
      food_sec,
      food_price,
    },
    pop_and_se: {
      population,
      pov_rate,
    },
  };
}
