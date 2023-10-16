import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { UserResult } from "../interfaces/user.interface";
import AppError from "../errors/AppError.errors";
import { CourseResult } from "../interfaces/course.interface";

export const verifyIfCourseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } = req.params;

  const query: string = `SELECT * FROM "courses" WHERE "id" = $1`;
  const queryResult: CourseResult = await client.query(query, [courseId]);

  if (queryResult.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  return next();
};
