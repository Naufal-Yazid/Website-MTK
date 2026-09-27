'use server'

import { createClient } from '@/lib/supabase/server'
import { inquirySchema } from '@/lib/validations/inquiry'

export async function createInquiry(input: unknown) {
  const parsed = inquirySchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Data inquiry tidak valid.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('inquiries').insert(parsed.data)
  if (error) return { success: false, error: 'Inquiry belum dapat disimpan. Silakan coba lagi.' }
  return { success: true }
}
