import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";
import {
  courseAddUserController,
  courseCreateController,
  courseDeleteUserController,
  courseReadAllUsersController,
  courseReadController,
} from "../controllers/course.controller";
import { validadeBody } from "../middlewares/validadeBody.middleware";
import { courseCreateSchema } from "../schemas/course.schema";
import { verifyIfUserExists } from "../middlewares/verifyIfUserExists.middleware";
import { verifyIfCourseExists } from "../middlewares/verifyIfCourseExists.middleware";

export const coursesRoute: Router = Router();

coursesRoute.get("/", courseReadController);

coursesRoute.post(
  "/",
  validadeBody(courseCreateSchema),
  verifyToken,
  verifyPermissions,
  courseCreateController
);

coursesRoute.get(
  "/:id/users",
  verifyToken,
  verifyPermissions,
  courseReadAllUsersController
);

coursesRoute.use(
  "/:courseId/users/:userId",
  verifyToken,
  verifyPermissions,
  verifyIfUserExists,
  verifyIfCourseExists
);
coursesRoute.post("/:courseId/users/:userId", courseAddUserController);
coursesRoute.delete("/:courseId/users/:userId", courseDeleteUserController);
