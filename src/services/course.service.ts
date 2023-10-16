import format from "pg-format";
import {
  Course,
  CourseCreate,
  CourseRead,
  CourseResult,
} from "../interfaces/course.interface";
import { client } from "../database";
import {
  UserOnCourseRead,
  UserOnCourseResult,
} from "../interfaces/userCourse.interface";
import { userOnCourseReadSchema } from "../schemas/userCourse.schema";

export const courseCreateService = async (
  data: CourseCreate
): Promise<Course> => {
  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const query: CourseResult = await client.query(queryFormat);
  return query.rows[0];
};

export const courseReadService = async (): Promise<CourseRead> => {
  const query: CourseResult = await client.query('SELECT * FROM "courses";');
  return query.rows;
};

export const courseAddUserService = async (
  userId: string,
  courseId: string
): Promise<CourseRead> => {
  const query =
    'INSERT INTO "userCourses" ("active", "userId", "courseId") VALUES ($1, $2, $3)';
  const queryResult: CourseResult = await client.query(query, [
    true,
    userId,
    courseId,
  ]);

  return queryResult.rows;
};

export const courseDeleteUserService = async (
  userId: string,
  courseId: string
): Promise<CourseRead> => {
  const query: string = `UPDATE "userCourses" SET active = false WHERE "userId" = $1 AND "courseId" = $2`;
  const queryResult: CourseResult = await client.query(query, [
    userId,
    courseId,
  ]);

  return queryResult.rows;
};

export const courseReadAllUsersService = async (
  courseId: string
): Promise<UserOnCourseRead> => {
  const query = `
      SELECT 
        "u"."id" AS "userId", 
        "u"."name" AS "userName",
        "uc"."active" AS "userActiveInCourse",
        "c"."id" AS "courseId",
        "c"."name" AS "courseName",
        "c"."description" AS "courseDescription"
      FROM 
        "users" "u"
      JOIN 
        "userCourses" "uc" ON "u"."id" = "uc"."userId"
      JOIN
        "courses" "c" ON "uc"."courseId" = "c"."id"
      WHERE
        "c"."id" = $1
    `;
  const queryResult: UserOnCourseResult = await client.query(query, [courseId]);

  return userOnCourseReadSchema.parse(queryResult.rows);
};
