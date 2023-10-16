import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { UserResult } from "../interfaces/user.interface";
import AppError from "../errors/AppError.errors";

export const verifyIfUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  const query: string = `SELECT * FROM "users" WHERE "id" = $1`;
  const queryResult: UserResult = await client.query(query, [userId]);

  if (queryResult.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  return next();
};
