'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { updateInquiryStatusSchema } from '@/lib/validations/inquiry'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { data: admin } = await supabase.from('admins').select('id, role, is_active').eq('id', user.id).single()
  if (!admin?.is_active) throw new Error('Unauthorized')
  return { supabase, user, admin }
}

export async function updateInquiryStatus(id: string, status: 'baru' | 'diproses' | 'sudah_dihubungi' | 'batal') {
  const parsed = updateInquiryStatusSchema.safeParse({ id, status })
  if (!parsed.success) throw new Error('Data status tidak valid')
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('inquiries')
    .update({ 
      status, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)

  if (error) {
    throw new Error('Gagal memperbarui status')
  }

  revalidatePath('/admin/leads')
}

export async function markInquiryAsRead(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error('ID inquiry tidak valid')
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('inquiries')
    .update({ 
      is_read: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) {
    throw new Error('Gagal menandai telah dibaca')
  }

  revalidatePath('/admin/leads')
}

export async function logWaClick(inquiryId: string) {
  if (!/^[0-9a-f-]{36}$/i.test(inquiryId)) throw new Error('ID inquiry tidak valid')
  const { supabase, admin } = await requireAdmin()

  const { error: logError } = await supabase
    .from('wa_click_logs')
    .insert({
      inquiry_id: inquiryId,
      admin_id: admin.id,
    })

  // Mark inquiry as wa_clicked
  await supabase
    .from('inquiries')
    .update({ wa_clicked: true })
    .eq('id', inquiryId)

  if (logError) {
    throw new Error('Gagal mencatat log WA')
  }

  revalidatePath('/admin/leads')
}

export async function deleteInquiry(id: string) {
  const { supabase, admin } = await requireAdmin()

  if (admin?.role !== 'super_admin') {
    throw new Error('Hanya super admin yang dapat menghapus inquiry')
  }

  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error('Gagal menghapus inquiry')
  }

  revalidatePath('/admin/leads')
}
