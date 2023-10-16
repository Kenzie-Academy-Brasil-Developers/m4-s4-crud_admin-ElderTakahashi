import * as z from "zod";

export const userCourseSchema = z.object({
  id: z.number().positive(),
  active: z.boolean().default(true),
  userId: z.number().positive(),
  courseId: z.number().positive(),
});

export const userCourseCreateSchema = userCourseSchema.omit({ id: true });

export const userCourseReturnSchema = userCourseSchema;

export const userCourseReadSchema = userCourseReturnSchema.array();

export const userOnCourseSchema = z.object({
  userId: z.number().positive(),
  userName: z.string(),
  userActiveInCourse: z.boolean(),
  courseId: z.number().positive(),
  courseName: z.string(),
  courseDescription: z.string(),
});

export const userOnCourseReturnSchema = userOnCourseSchema;

export const userOnCourseReadSchema = userOnCourseSchema.array();
