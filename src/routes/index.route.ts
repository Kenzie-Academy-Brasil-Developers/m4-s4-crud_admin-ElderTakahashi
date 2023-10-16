import { Router } from "express";
import { usersRoute } from "./user.route";
import { sessionRoute } from "./session.route";
import { coursesRoute } from "./course.route";

export const routes: Router = Router();
routes.use("/users", usersRoute);
routes.use("/login", sessionRoute);
routes.use("/courses", coursesRoute);
