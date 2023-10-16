import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validadeBody =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
  };
