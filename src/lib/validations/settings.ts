import { z } from 'zod'

export const contactSettingsSchema = z.object({
  wa_number: z.string().nullable().optional(),
  wa_greeting_template: z.string().nullable().optional(),
  company_email: z.string().email('Invalid email format').nullable().optional().or(z.literal('')),
  company_phone: z.string().nullable().optional(),
  company_address: z.string().nullable().optional(),
  instagram_url: z.string().url('Invalid URL format').nullable().optional().or(z.literal('')),
  tiktok_url: z.string().url('Invalid URL format').nullable().optional().or(z.literal('')),
})

export type ContactSettingsInput = z.infer<typeof contactSettingsSchema>

export const integrationSettingsSchema = z.object({
  ga_measurement_id: z
    .string()
    .regex(/^G-[A-Z0-9]+$/, 'Must be a valid GA4 Measurement ID (e.g., G-XXXXXXXXXX)')
    .nullable()
    .optional()
    .or(z.literal('')),
  meta_pixel_id: z.string().nullable().optional(),
})

export type IntegrationSettingsInput = z.infer<typeof integrationSettingsSchema>

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d).*$/, 'Password must contain at least one letter and one number'),
  confirmNewPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords don't match",
  path: ['confirmNewPassword'],
})

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

export const profileSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
})

export type ProfileInput = z.infer<typeof profileSchema>
