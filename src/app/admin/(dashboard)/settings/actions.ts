'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { contactSettingsSchema, integrationSettingsSchema, profileSchema } from '@/lib/validations/settings'
import type { Database } from '@/lib/types/database'

type SettingsUpdate = Database['public']['Tables']['site_settings']['Update']
type AdminRole = Database['public']['Tables']['admins']['Row']['role']

async function requireAdmin(superAdminOnly = false) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: admin } = await supabase
    .from('admins')
    .select('id, email, role, is_active')
    .eq('id', user.id)
    .single()

  if (!admin?.is_active || (superAdminOnly && admin.role !== 'super_admin')) throw new Error('Unauthorized')
  return { supabase, user }
}

async function saveSiteSettings(updates: SettingsUpdate) {
  const adminClient = createAdminClient()
  const { data: current } = await adminClient.from('site_settings').select('id').limit(1).maybeSingle()
  return current
    ? adminClient.from('site_settings').update(updates).eq('id', current.id)
    : adminClient.from('site_settings').insert(updates)
}

export async function updateContactSettings(formData: FormData) {
  try {
    const { user } = await requireAdmin(true)
    const parsed = contactSettingsSchema.safeParse(Object.fromEntries(formData))
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message }
    const { error } = await saveSiteSettings({ ...parsed.data, updated_at: new Date().toISOString(), updated_by: user.id })
    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/settings')
    return { success: true }
  } catch {
    return { success: false, error: 'Hanya super admin yang dapat mengubah pengaturan.' }
  }
}

export async function updateIntegrationSettings(gaMeasurementId: string, metaPixelId: string) {
  try {
    const { user } = await requireAdmin(true)
    const parsed = integrationSettingsSchema.safeParse({ ga_measurement_id: gaMeasurementId, meta_pixel_id: metaPixelId })
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message }
    const { error } = await saveSiteSettings({ ...parsed.data, updated_at: new Date().toISOString(), updated_by: user.id })
    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/settings')
    return { success: true }
  } catch {
    return { success: false, error: 'Hanya super admin yang dapat mengubah pengaturan.' }
  }
}

export async function updateProfile(fullName: string, avatarUrl?: string) {
  try {
    const { user } = await requireAdmin()
    const parsed = profileSchema.safeParse({ full_name: fullName })
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message }
    const updates: Database['public']['Tables']['admins']['Update'] = {
      full_name: parsed.data.full_name,
      updated_at: new Date().toISOString(),
    }
    if (avatarUrl !== undefined) updates.avatar_url = avatarUrl || null
    const { error } = await createAdminClient().from('admins').update(updates).eq('id', user.id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/settings')
    return { success: true }
  } catch {
    return { success: false, error: 'Sesi tidak valid.' }
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    const { supabase, user } = await requireAdmin()
    if (!user.email) return { success: false, error: 'Email akun tidak tersedia.' }
    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      return { success: false, error: 'Password baru minimal 8 karakter dan harus berisi huruf serta angka.' }
    }
    const { error: verifyError } = await supabase.auth.signInWithPassword({ email: user.email, password: currentPassword })
    if (verifyError) return { success: false, error: 'Password saat ini tidak benar.' }
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    return error ? { success: false, error: error.message } : { success: true }
  } catch {
    return { success: false, error: 'Sesi tidak valid.' }
  }
}

export async function createAdminAccount(email: string, fullName: string, role: AdminRole) {
  try {
    await requireAdmin(true)
    const parsed = profileSchema.safeParse({ full_name: fullName })
    if (!parsed.success || !/^\S+@\S+\.\S+$/.test(email)) return { success: false, error: 'Nama atau email tidak valid.' }

    const adminClient = createAdminClient()
    const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email, {
      data: { full_name: parsed.data.full_name, role },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password`,
    })
    if (error || !data.user) return { success: false, error: error?.message || 'Gagal mengundang admin.' }
    const { error: profileError } = await adminClient.from('admins').upsert({
      id: data.user.id,
      email,
      full_name: parsed.data.full_name,
      role,
      is_active: true,
    })
    if (profileError) return { success: false, error: profileError.message }
    revalidatePath('/admin/settings')
    return { success: true }
  } catch {
    return { success: false, error: 'Hanya super admin yang dapat menambah akun.' }
  }
}

export async function toggleAdminActive(adminId: string, isActive: boolean) {
  try {
    const { user } = await requireAdmin(true)
    if (adminId === user.id) return { success: false, error: 'Akun sendiri tidak dapat dinonaktifkan.' }
    const adminClient = createAdminClient()
    const { error } = await adminClient.from('admins').update({ is_active: isActive }).eq('id', adminId)
    if (error) return { success: false, error: error.message }
    if (!isActive) await adminClient.auth.admin.signOut(adminId, 'global')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch {
    return { success: false, error: 'Hanya super admin yang dapat mengubah akun.' }
  }
}

export async function deleteAdminAccount(adminId: string) {
  try {
    const { user } = await requireAdmin(true)
    if (adminId === user.id) return { success: false, error: 'Akun sendiri tidak dapat dihapus.' }
    const { error } = await createAdminClient().auth.admin.deleteUser(adminId)
    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/settings')
    return { success: true }
  } catch {
    return { success: false, error: 'Hanya super admin yang dapat menghapus akun.' }
  }
}
