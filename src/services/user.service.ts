import format from "pg-format";
import {
  CreateUser,
  UserRead,
  UserResult,
  UserReturn,
} from "../interfaces/user.interface";
import { client } from "../database";
import { userReadSchema, userReturnSchema } from "../schemas/user.schema";
import { hash } from "bcryptjs";
import AppError from "../errors/AppError.errors";
import {
  UserOnCourseRead,
  UserOnCourseResult,
} from "../interfaces/userCourse.interface";
import { userOnCourseReadSchema } from "../schemas/userCourse.schema";

export const userCreateService = async (
  data: CreateUser
): Promise<UserReturn> => {
  data.password = await hash(data.password, 10);

  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const query: UserResult = await client.query(queryFormat);
  return userReturnSchema.parse(query.rows[0]);
};

export const userReadAllService = async (): Promise<UserRead> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  return userReadSchema.parse(query.rows);
};

export const userReadCoursesService = async (
  userID: string
): Promise<UserOnCourseRead> => {
  const queryString: string = `
  SELECT
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse",
    "u"."id" AS "userId",
    "u"."name" AS "userName"
  FROM
    "userCourses" "uc"
  INNER JOIN
    "users" "u" ON "uc"."userId" = "u"."id"
  INNER JOIN
    "courses" "c" ON "uc"."courseId" = "c"."id"
  WHERE
    "u"."id" = $1;
    `;

  const queryResult: UserOnCourseResult = await client.query(queryString, [
    userID,
  ]);

  if (!queryResult.rowCount) {
    throw new AppError("No course found", 404);
  }

  return userOnCourseReadSchema.parse(queryResult.rows);
};
