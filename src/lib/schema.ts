import { z } from "zod";

export const sendEmailSchema = z.object({
  toEmail: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export type SendEmailInput = z.infer<typeof sendEmailSchema>;