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

export const checkoutSchema = z.object({
  shipping: z.object({
    name: z.string().min(1, 'Name is required!'),
    email: z
      .string()
      .min(1, 'Email is required!')
      .email({ message: 'Please enter a valid email!' }),
    contactNumber: z.string().min(1, 'Contact number is required!'),
    streetAddress: z.string().min(1, 'Street address is required!'),
    city: z.string().min(1, 'City is required!'),
    country: z.string().min(1, 'Country is required!'),
  }),
  delivery: z.object({
    name: z.string().min(1, 'Name is required!'),
    email: z
      .string()
      .min(1, 'Email is required!')
      .email({ message: 'Please enter a valid email!' }),
    contactNumber: z.string().min(1, 'Contact number is required!'),
    streetAddress: z.string().min(1, 'Street address is required!'),
    city: z.string().min(1, 'City is required!'),
    country: z.string().min(1, 'Country is required!'),
  }),
});
