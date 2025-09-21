import { z } from 'zod';

export const emailSchema = z.email({
  message: "Invalid email address",
});

export const passwordSchema = z
  .string()
  .min(6, {
    message: "Password must be at least 6 characters long",
  })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
  {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
