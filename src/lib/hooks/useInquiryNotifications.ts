'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { emptyNotifications, loadUnreadNotifications, startNotificationSync, type NotificationState } from '@/lib/admin/inquiry-notifications'

export function useInquiryNotifications(adminId: string | null) {
  const [result, setResult] = useState<{ owner: string | null; state: NotificationState }>({ owner: null, state: emptyNotifications })
  const refreshRef = useRef<() => Promise<void>>(async () => {})
  const refresh = useCallback(() => refreshRef.current(), [])

  useEffect(() => {
    if (!adminId) return
    const client = createClient()
    const sync = startNotificationSync({
      load: () => loadUnreadNotifications(client),
      update: state => setResult({ owner: adminId, state }),
      visible: () => document.visibilityState === 'visible',
      subscribe: refresh => {
        const channel = client.channel('admin-inquiry-notifications')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, refresh)
          .subscribe(status => { if (status === 'SUBSCRIBED') refresh() })
        return () => { void client.removeChannel(channel) }
      },
      listenResume: refresh => {
        window.addEventListener('focus', refresh)
        window.addEventListener('online', refresh)
        document.addEventListener('visibilitychange', refresh)
        return () => {
          window.removeEventListener('focus', refresh)
          window.removeEventListener('online', refresh)
          document.removeEventListener('visibilitychange', refresh)
        }
      },
      every: (refresh, delay) => {
        const timer = window.setInterval(refresh, delay)
        return () => window.clearInterval(timer)
      },
    })
    refreshRef.current = sync.refresh
    return () => { refreshRef.current = async () => {}; sync.stop() }
  }, [adminId])

  const state = adminId && result.owner === adminId ? result.state : emptyNotifications
  return { ...state, refresh }
}
