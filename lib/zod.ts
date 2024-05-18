import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required!'),
    email: z
      .string()
      .min(1, 'Email is required!')
      .email({ message: 'Please enter a valid email!' }),
    password: z.string().min(1, 'Password is required!'),
    confirmPassword: z.string().min(1, 'Confirm password is required!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required!')
    .email({ message: 'Please enter a valid email!' }),
  password: z.string().min(1, 'Password is required!'),
});
