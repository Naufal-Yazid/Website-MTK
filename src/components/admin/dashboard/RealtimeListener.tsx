'use client';

import { useRealtimeInquiries } from '@/lib/hooks/useRealtimeInquiries';

export function RealtimeListener() {
  useRealtimeInquiries();
  return null;
}
