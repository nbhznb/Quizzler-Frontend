// src/schemas/passwordChangeSchema.js
import { z } from 'zod';
import { passwordSchema } from './passwordSchema';

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(6, 'Current Password must be at least 6 characters'),
  newPassword: passwordSchema,
  confirmNewPassword: z.string().min(6, 'Confirm New Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'New Passwords do not match',
  path: ['confirmNewPassword'],
});
