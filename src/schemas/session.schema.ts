import { z } from "zod";

export const sessionSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().max(120).min(4),
});
