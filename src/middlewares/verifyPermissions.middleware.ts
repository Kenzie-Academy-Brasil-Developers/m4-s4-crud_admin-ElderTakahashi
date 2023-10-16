import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.errors";

export const verifyPermissions = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals.decoded;

  if (admin === true) {
    return next();
  } else {
    throw new AppError("Insufficient permission", 403);
  }
};
