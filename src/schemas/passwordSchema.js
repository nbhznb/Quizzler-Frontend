// src/schemas/passwordSchema.js
import { z } from 'zod';

export const passwordSchema = z.string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password must be at most 100 characters')
  .refine(value => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter')
  .refine(value => /[a-z]/.test(value), 'Password must contain at least one lowercase letter')
  .refine(value => /[0-9]/.test(value), 'Password must contain at least one number')
  .refine(value => /[^A-Za-z0-9]/.test(value), 'Password must contain at least one special character');
