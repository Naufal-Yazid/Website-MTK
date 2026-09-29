import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

export type InquiryNotification = Pick<Database['public']['Tables']['inquiries']['Row'], 'id' | 'full_name' | 'selected_project' | 'created_at'>
export type NotificationSnapshot = { unreadCount: number; notifications: InquiryNotification[] }
export type NotificationState = NotificationSnapshot & { loading: boolean; error: string | null }
export const emptyNotifications: NotificationState = { unreadCount: 0, notifications: [], loading: true, error: null }
export const NOTIFICATION_POLL_MS = 15000

export async function loadUnreadNotifications(client: SupabaseClient<Database>): Promise<NotificationSnapshot> {
  // Count and list come from the same filtered request, including when count is unchanged.
  const { data, count, error } = await client.from('inquiries')
    .select('id, full_name, selected_project, created_at', { count: 'exact' })
    .eq('is_read', false).order('created_at', { ascending: false }).order('id', { ascending: false }).limit(5)
    .abortSignal(AbortSignal.timeout(10000))
  if (error || data === null || count === null) throw new Error('Notifications unavailable')
  return { unreadCount: count, notifications: data }
}

type SyncOptions = {
  load: () => Promise<NotificationSnapshot>
  update: (state: NotificationState) => void
  visible: () => boolean
  subscribe: (refresh: () => void) => () => void
  listenResume: (refresh: () => void) => () => void
  every: (refresh: () => void, milliseconds: number) => () => void
}

export function startNotificationSync(options: SyncOptions) {
  let stopped = false
  let queued = false
  let inFlight: Promise<void> | null = null
  let state = { ...emptyNotifications }
  function refresh(): Promise<void> {
    if (stopped) return Promise.resolve()
    if (inFlight) { queued = true; return inFlight }
    inFlight = (async () => {
      do {
        queued = false
        try {
          const snapshot = await options.load()
          if (stopped) return
          state = { ...snapshot, loading: false, error: null }
        } catch {
          if (stopped) return
          // Never turn a failed request into a false "all messages read" state.
          state = { ...state, loading: false, error: 'Notifikasi belum dapat diperbarui. Periksa koneksi atau sesi admin, lalu coba lagi.' }
        }
        options.update(state)
      } while (queued && !stopped)
    })().finally(() => { inFlight = null })
    return inFlight
  }
  const resume = () => { if (options.visible()) void refresh() }
  const unsubscribe = options.subscribe(resume)
  const stopResume = options.listenResume(resume)
  const stopTimer = options.every(resume, NOTIFICATION_POLL_MS)
  void refresh()
  return {
    refresh,
    stop() { stopped = true; stopTimer(); stopResume(); unsubscribe() },
  }
}
