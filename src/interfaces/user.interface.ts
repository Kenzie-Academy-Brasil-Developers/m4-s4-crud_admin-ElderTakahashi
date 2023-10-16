import { QueryResult } from "pg";
import { z } from "zod";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userSchema,
} from "../schemas/user.schema";

export type User = z.infer<typeof userSchema>;

export type CreateUser = z.infer<typeof userCreateSchema>;

export type UserRead = z.infer<typeof userReadSchema>;

export type UserReturn = z.infer<typeof userReturnSchema>;

export type UserResult = QueryResult<User>;
