// src/schemas/registerSchema.js
import { z } from 'zod';
import { usernameSchema } from './usernameSchema';
import { passwordSchema } from './passwordSchema';

export const registerSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
