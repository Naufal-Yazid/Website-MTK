import 'server-only'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import type { Database, Json } from '@/lib/types/database'
import { actionFailed, safeErrorCode } from './filters'

type LogInsert = Database['public']['Tables']['admin_logs']['Insert']

export async function writeLog(entry: LogInsert) {
  // Logging is best-effort and time-bounded; never break a completed admin mutation.
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Log storage configuration unavailable')
    const client = createSupabaseClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(3000) }) },
    })
    const { error } = await client.from('admin_logs').insert(entry)
    if (error) throw error
    return true
  } catch {
    // Do not print credentials, request bodies, raw provider errors or user data.
    console.warn('[admin-logs] Log tidak tersimpan. Periksa migrasi 003 dan konfigurasi server.')
    return false
  }
}

type ActionContext = {
  action: string
  summary: string
  targetId?: string
  details?: Record<string, Json>
}

export async function runAdminAction<T>(context: ActionContext, operation: () => Promise<T>): Promise<T> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { data: actor } = await supabase.from('admins').select('id, full_name, is_active').eq('id', user.id).single()
  if (!actor?.is_active) throw new Error('Unauthorized')

  const entry = {
    source: 'admin_action' as const,
    actor_id: actor.id,
    actor_name: actor.full_name,
    action: context.action,
    target_id: context.targetId && /^[0-9a-f-]{36}$/i.test(context.targetId) ? context.targetId : null,
    details: context.details || {},
  }
  try {
    const result = await operation()
    const failed = actionFailed(result)
    await writeLog({ ...entry, kind: failed ? 'error' : 'audit', summary: `${failed ? 'Gagal' : 'Berhasil'}: ${context.summary}` })
    return result
  } catch (error) {
    await writeLog({ ...entry, kind: 'error', summary: `Gagal: ${context.summary}`, details: { ...entry.details, code: safeErrorCode(error) } })
    throw error
  }
}
