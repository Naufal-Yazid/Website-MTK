'use server'

import { runAdminAction } from '@/lib/logs/server'
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

async function updateInquiryStatusImpl(id: string, status: 'baru' | 'diproses' | 'sudah_dihubungi' | 'batal') {
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
    .select('id')
    .single()

  if (error) {
    throw new Error('Gagal memperbarui status')
  }

  revalidatePath('/admin/leads')
}

async function markInquiryAsReadImpl(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error('ID inquiry tidak valid')
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('inquiries')
    .update({ 
      is_read: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select('id')
    .single()

  if (error) {
    throw new Error('Gagal menandai telah dibaca')
  }

  revalidatePath('/admin/leads')
}

async function logWaClickImpl(inquiryId: string) {
  if (!/^[0-9a-f-]{36}$/i.test(inquiryId)) throw new Error('ID inquiry tidak valid')
  const { supabase, admin } = await requireAdmin()

  const { error: logError } = await supabase
    .from('wa_click_logs')
    .insert({
      inquiry_id: inquiryId,
      admin_id: admin.id,
    })

  if (logError) {
    throw new Error('Gagal mencatat log WA')
  }

  // Check both writes so a partial failure is not recorded as a successful action.
  const { error: updateError } = await supabase
    .from('inquiries')
    .update({ wa_clicked: true })
    .eq('id', inquiryId)
    .select('id')
    .single()

  if (updateError) {
    throw new Error('Gagal memperbarui status WhatsApp inquiry')
  }

  revalidatePath('/admin/leads')
}

async function deleteInquiryImpl(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error('ID inquiry tidak valid')
  const { supabase, admin } = await requireAdmin()

  if (admin?.role !== 'super_admin') {
    throw new Error('Hanya super admin yang dapat menghapus inquiry')
  }

  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id)
    .select('id')
    .single()

  if (error) {
    throw new Error('Gagal menghapus inquiry')
  }

  revalidatePath('/admin/leads')
}


export async function updateInquiryStatus(id: string, status: 'baru' | 'diproses' | 'sudah_dihubungi' | 'batal') {
  return runAdminAction({ action: 'inquiry.status', summary: 'Mengubah status inquiry', targetId: id, details: { status: ['baru', 'diproses', 'sudah_dihubungi', 'batal'].includes(status) ? status : 'invalid' } },
    () => updateInquiryStatusImpl(id, status))
}

export async function markInquiryAsRead(id: string) {
  return runAdminAction({ action: 'inquiry.read', summary: 'Menandai inquiry telah dibaca', targetId: id, details: {} },
    () => markInquiryAsReadImpl(id))
}

export async function logWaClick(inquiryId: string) {
  return runAdminAction({ action: 'inquiry.whatsapp', summary: 'Membuka tautan WhatsApp inquiry', targetId: inquiryId, details: {} },
    () => logWaClickImpl(inquiryId))
}

export async function deleteInquiry(id: string) {
  return runAdminAction({ action: 'inquiry.delete', summary: 'Menghapus inquiry', targetId: id, details: {} },
    () => deleteInquiryImpl(id))
}
