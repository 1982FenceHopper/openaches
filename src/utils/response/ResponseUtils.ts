import type { Response } from "express";

export function ExpressSuccessResponse(res: Response, data: any) {
  return res.status(200).send({
    status: 200,
    result: data,
  });
}

export function ExpressErrorResponse(
  res: Response,
  data: any,
  code: number = 500
) {
  return res.status(code).send({
    status: code,
    error: {
      outcome: "Failed to fulfill request",
      reason: data,
    },
  });
}
