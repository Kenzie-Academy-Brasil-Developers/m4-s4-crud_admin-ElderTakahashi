import { Request, Response } from "express";
import { UserRead, UserReturn } from "../interfaces/user.interface";
import {
  userCreateService,
  userReadAllService,
  userReadCoursesService,
} from "../services/user.service";

export const userCreateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: UserReturn = await userCreateService(req.body);
  return res.status(201).json(user);
};

export const userReadAllController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: UserRead = await userReadAllService();
  return res.status(200).json(users);
};

export const userReadCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courses = await userReadCoursesService(req.params.id);
  return res.status(200).json(courses);
};
