import type { ErrorResponse } from "../../interfaces/FetchErrorResponse";
import { isErrorResponse } from "../../interfaces/FetchErrorResponse";
import { ReturnObject } from "../returns/FunctionReturnObject";

export async function ManifoldStatus() {
  const stat = await fetch("http://localhost:4170/")
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  if (isErrorResponse(stat)) {
    return ReturnObject(stat, "Unable to reach Manifold API");
  }

  return ReturnObject(stat, null);
}

export async function ManifoldDataByFile(file: string, column: string) {
  const filtered = await fetch(`http://127.0.0.1:15411/manifold`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file: file,
      tags: column,
    }),
  })
    .then((res) => res.text())
    .catch((err: ErrorResponse) => err);

  if (isErrorResponse(filtered)) {
    return ReturnObject(
      filtered,
      "HXL filtering server failed to respond properly"
    );
  }

  return ReturnObject(filtered, null);
}

export async function ManifoldDataByResource(
  ident: string,
  resource_id: string,
  column: string
) {
  const data_dl = await fetch(
    `https://hapi.humdata.org/api/v1/metadata/resource?resource_hdx_id=${encodeURIComponent(
      resource_id!
    )}&app_identifier=${encodeURIComponent(
      ident
    )}&limit=1&offset=0&output_format=json&format=CSV`
  )
    .then((res) => res.json())
    .catch((err: ErrorResponse) => err);

  if (isErrorResponse(data_dl)) {
    return ReturnObject(data_dl, "HDX server failed to respond properly");
  }

  const data_loc = data_dl.data[0].download_url;

  const filtered = await fetch(`http://127.0.0.1:15411/manifold`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file: data_loc,
      tags: column,
    }),
  })
    .then((res) => res.text())
    .catch((err: ErrorResponse) => err);

  if (isErrorResponse(filtered)) {
    return ReturnObject(
      filtered,
      "HXL filtering server failed to respond properly"
    );
  }
  return ReturnObject(filtered, null);
}
