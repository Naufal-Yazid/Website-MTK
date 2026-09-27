import { z } from 'zod'

export const inquirySchema = z.object({
  full_name: z.string().trim().min(2, 'Nama minimal 2 karakter').max(100),
  whatsapp_number: z.string().trim().regex(/^\+?[0-9][0-9\s-]{7,18}$/, 'Nomor WhatsApp tidak valid'),
  selected_project: z.string().trim().max(100).nullable().optional(),
  selected_type: z.string().trim().max(100).nullable().optional(),
  message: z.string().trim().max(2000).nullable().optional(),
})

export type InquiryInput = z.infer<typeof inquirySchema>

export const updateInquiryStatusSchema = z.object({
  id: z.string().uuid('Invalid inquiry ID'),
  status: z.enum(['baru', 'diproses', 'sudah_dihubungi', 'batal']),
})

export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>
