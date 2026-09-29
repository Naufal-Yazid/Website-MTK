'use server'

import { createClient } from '@/lib/supabase/server'
import { inquirySchema, contactInquirySchema } from '@/lib/validations/inquiry'

export async function createInquiry(input: unknown) {
  const parsed = inquirySchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Data inquiry tidak valid.' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from('inquiries').insert({ ...parsed.data, is_read: false, status: 'baru' })
    if (error) return { success: false, error: 'Inquiry belum dapat disimpan. Silakan coba lagi.' }
    return { success: true }
  } catch {
    return { success: false, error: 'Koneksi bermasalah. Inquiry belum dapat dipastikan tersimpan; silakan coba lagi.' }
  }
}

export async function createContactInquiry(input: unknown) {
  const parsed = contactInquirySchema.safeParse(input)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Data kontak tidak valid.' }
  const { email, ...values } = parsed.data
  // Existing inquiry schema has no email column. Keep the reply address in the message.
  return createInquiry({ ...values, message: 'Email: ' + email + '\n\n' + values.message })
}
