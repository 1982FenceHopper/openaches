import type { Request, Response } from "express";
import type { NextFunction } from "express";

export default function all_routes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.setHeader("ORIGIN-INFO", "OpenACHES Overseer v2.1");
  req.log.info(
    `[OVERSEER]: Requested ${req.originalUrl} by ${req.socket.remoteAddress}`
  );
  next();
}
