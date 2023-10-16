import { Router } from "express";
import {
  userCreateController,
  userReadAllController,
  userReadCoursesController,
} from "../controllers/user.controller";
import { userCreateSchema } from "../schemas/user.schema";
import { verifyUserEmail } from "../middlewares/verifyUserEmail.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";
import { validadeBody } from "../middlewares/validadeBody.middleware";

export const usersRoute: Router = Router();

usersRoute.post(
  "/",
  validadeBody(userCreateSchema),
  verifyUserEmail,
  userCreateController
);

usersRoute.get("/", verifyToken, verifyPermissions, userReadAllController);

usersRoute.get(
  "/:id/courses",
  verifyToken,
  verifyPermissions,
  userReadCoursesController
);
