import { z } from "zod";
import {
  userCourseCreateSchema,
  userCourseReadSchema,
  userCourseSchema,
  userOnCourseReadSchema,
  userOnCourseReturnSchema,
  userOnCourseSchema,
} from "../schemas/userCourse.schema";
import { QueryResult } from "pg";

export type UserCourse = z.infer<typeof userCourseSchema>;

export type UserCourseCreate = z.infer<typeof userCourseCreateSchema>;

export type UserCourseRead = z.infer<typeof userCourseReadSchema>;

export type UserOnCourse = z.infer<typeof userOnCourseSchema>;

export type UserOnCourseReturn = z.infer<typeof userOnCourseReturnSchema>;

export type UserOnCourseRead = z.infer<typeof userOnCourseReadSchema>;

export type UserOnCourseResult = QueryResult<UserOnCourse>;
