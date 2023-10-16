import { Router } from "express";
import { loginController } from "../controllers/session.controller";
import { validadeBody } from "../middlewares/validadeBody.middleware";
import { sessionSchema } from "../schemas/session.schema";

export const sessionRoute: Router = Router();

sessionRoute.post("/", validadeBody(sessionSchema), loginController);
