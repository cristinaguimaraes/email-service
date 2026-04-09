import { z } from "zod";

export const sendEmailSchema = z.object({
  toEmail: z.email("Please enter a valid email address"),
  subject: z.string().min(1,"Subject is required").max(200),
  message: z.string().min(1, "Message cannot be empty").max(5000),
});

export type SendEmailInput = z.infer<typeof sendEmailSchema>;