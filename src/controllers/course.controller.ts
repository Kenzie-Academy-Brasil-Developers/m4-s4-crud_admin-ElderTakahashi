import { Request, Response } from "express";
import { Course, CourseRead } from "../interfaces/course.interface";
import {
  courseAddUserService,
  courseCreateService,
  courseDeleteUserService,
  courseReadAllUsersService,
  courseReadService,
} from "../services/course.service";
import { UserOnCourseRead } from "../interfaces/userCourse.interface";

export const courseCreateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const course: Course = await courseCreateService(req.body);
  return res.status(201).json(course);
};

export const courseReadController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courses: CourseRead = await courseReadService();
  return res.status(200).json(courses);
};

export const courseAddUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, courseId } = req.params;

  await courseAddUserService(userId, courseId);

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const courseDeleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, courseId } = req.params;

  await courseDeleteUserService(userId, courseId);

  return res.status(204).json();
};

export const courseReadAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const courseUsers: UserOnCourseRead = await courseReadAllUsersService(id);

  return res.status(200).json(courseUsers);
};
