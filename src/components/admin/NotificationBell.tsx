'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, CheckCircle2, Loader2, RefreshCw } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const { unreadCount, notifications, notificationsLoading, notificationsError, refreshUnreadCount } = useAuth()
  return <Popover open={open} onOpenChange={value => { setOpen(value); if (value) void refreshUnreadCount() }}>
    <PopoverTrigger asChild>
      <Button variant="ghost" size="icon" className="relative cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-900" aria-label={notificationsError ? 'Notifikasi belum dapat diperbarui' : notificationsLoading ? 'Memuat notifikasi' : `Notifikasi, ${unreadCount} inquiry belum dibaca`}>
        <Bell className="h-6 w-6" aria-hidden="true" />
        {unreadCount > 0 && <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">{unreadCount > 99 ? '99+' : unreadCount}</span>}
        {notificationsError && unreadCount === 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-amber-500" />}
      </Button>
    </PopoverTrigger>
    <PopoverContent align="end" sideOffset={8} className="w-[min(400px,calc(100vw-2rem))] overflow-hidden rounded-xl border-gray-200 bg-white p-0 shadow-xl" aria-label="Notifikasi inquiry">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div><h2 className="text-sm font-semibold text-gray-900">Notifikasi</h2><p className="mt-1 text-xs text-gray-500">{notificationsLoading ? 'Memuat pesan…' : notificationsError ? 'Data belum diperbarui' : `${unreadCount} inquiry belum dibaca`}</p></div>
        <Button variant="ghost" size="icon" aria-label="Muat ulang notifikasi" onClick={() => void refreshUnreadCount()}><RefreshCw className="h-4 w-4" /></Button>
      </div>
      {notificationsError && <p role="alert" className="m-3 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">{notificationsError}</p>}
      <div className="max-h-80 overflow-y-auto p-2">
        {notificationsLoading ? <p role="status" className="flex items-center justify-center gap-2 p-6 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" />Memuat notifikasi…</p>
          : notifications.length ? notifications.map(notification => <Link key={notification.id} href="/admin/leads" onClick={() => setOpen(false)} className="flex gap-3 rounded-lg px-3 py-3 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span className="min-w-0"><span className="block truncate text-sm font-medium text-gray-900">Inquiry baru dari {notification.full_name}</span><span className="mt-1 block text-xs text-gray-500">{notification.selected_project || 'Belum memilih proyek'} · {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: id })}</span></span>
          </Link>)
          : !notificationsError && <div className="flex flex-col items-center px-4 py-8 text-center"><CheckCircle2 className="mb-3 h-6 w-6 text-emerald-600" /><p className="text-sm font-medium text-gray-900">Tidak ada notifikasi baru</p><p className="mt-1 text-xs text-gray-500">Semua inquiry sudah dibaca.</p></div>}
      </div>
      <div className="border-t border-gray-200 p-2"><Link href="/admin/leads" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-[#0B5EAA] hover:bg-blue-50">Lihat semua inquiry</Link><p className="px-3 pb-2 text-center text-[11px] text-gray-500">Dari formulir website; bukan chat langsung WhatsApp.</p></div>
    </PopoverContent>
  </Popover>
}
