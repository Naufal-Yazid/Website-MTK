'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { NOTIFICATION_POLL_MS } from '@/lib/admin/inquiry-notifications';

export function useRealtimeInquiries(onUpdate?: () => void) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const refresh = () => {
      if (document.visibilityState !== 'visible') return;
      if (onUpdate) onUpdate();
      else router.refresh();
    };

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inquiries',
        },
        refresh
      )
      .subscribe();

    const timer = window.setInterval(refresh, NOTIFICATION_POLL_MS);
    window.addEventListener('focus', refresh);
    window.addEventListener('online', refresh);
    document.addEventListener('visibilitychange', refresh);

    return () => {
      supabase.removeChannel(channel);
      window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('online', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [router, onUpdate]);
}
