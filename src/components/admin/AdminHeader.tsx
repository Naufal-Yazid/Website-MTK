'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, Bell, CheckCircle2, LayoutDashboard, Loader2, Search, Settings, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { useAuth } from '@/lib/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/types/database';
import Sidebar from './Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/use-debounce';

type InquiryNotification = Pick<
  Database['public']['Tables']['inquiries']['Row'],
  'id' | 'full_name' | 'selected_project' | 'created_at'
>;

type InquirySearchResult = Pick<
  Database['public']['Tables']['inquiries']['Row'],
  'id' | 'full_name' | 'whatsapp_number' | 'selected_project'
>;

const adminPages = [
  { name: 'Dashboard', description: 'Ringkasan performa website', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Website Analytics', description: 'Detail traffic dan pengunjung', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Leads / Inquiry', description: 'Kelola seluruh inquiry', href: '/admin/leads', icon: Users },
  { name: 'Pengaturan', description: 'Akun dan konfigurasi website', href: '/admin/settings', icon: Settings },
];

export default function AdminHeader() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [inquiryResults, setInquiryResults] = useState<InquirySearchResult[]>([]);
  const debouncedSearch = useDebounce(search, 250);
  const [notifications, setNotifications] = useState<InquiryNotification[]>([]);
  const { admin, unreadCount } = useAuth();

  const normalizedSearch = search.trim().toLowerCase();
  const pageResults = adminPages.filter((page) =>
    `${page.name} ${page.description}`.toLowerCase().includes(normalizedSearch)
  );

  useEffect(() => {
    const supabase = createClient();

    const loadNotifications = async () => {
      const { data } = await supabase
        .from('inquiries')
        .select('id, full_name, selected_project, created_at')
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(5);

      setNotifications(data || []);
    };

    void loadNotifications();
  }, [unreadCount]);

  useEffect(() => {
    const query = debouncedSearch.trim();
    if (query.length < 2) {
      return;
    }

    const supabase = createClient();
    let ignore = false;

    const searchInquiries = async () => {
      setIsSearching(true);
      const safeQuery = query.replace(/[,%()]/g, ' ').trim();
      const { data } = await supabase
        .from('inquiries')
        .select('id, full_name, whatsapp_number, selected_project')
        .or(`full_name.ilike.%${safeQuery}%,whatsapp_number.ilike.%${safeQuery}%`)
        .order('created_at', { ascending: false })
        .limit(5);

      if (!ignore) {
        setInquiryResults(data || []);
        setIsSearching(false);
      }
    };

    void searchInquiries();
    return () => {
      ignore = true;
    };
  }, [debouncedSearch]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;

    if (pageResults.length > 0) {
      router.push(pageResults[0].href);
    } else {
      router.push(`/admin/leads?q=${encodeURIComponent(query)}`);
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden">
        <Sidebar isMobile={true} className="-ml-2.5 text-gray-700 hover:text-gray-900" />
      </div>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <form onSubmit={handleSearch} className="relative w-full max-w-lg">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => { setSearch(event.target.value); setIsSearchOpen(true); }}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => window.setTimeout(() => setIsSearchOpen(false), 150)}
              placeholder="Cari menu atau inquiry..."
              aria-label="Pencarian global admin"
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

            {isSearchOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[360px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                <div className="max-h-[420px] overflow-y-auto p-2">
                  {pageResults.length > 0 && (
                    <div>
                      <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Menu Admin</p>
                      {pageResults.map((page) => (
                        <Link
                          key={page.href}
                          href={page.href}
                          onClick={() => { setSearch(''); setIsSearchOpen(false); }}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0B5EAA]">
                            <page.icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-gray-900">{page.name}</span>
                            <span className="block truncate text-xs text-gray-500">{page.description}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {normalizedSearch.length >= 2 && (
                    <div className={pageResults.length > 0 ? 'mt-1 border-t border-gray-100 pt-1' : ''}>
                      <div className="flex items-center justify-between px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Inquiry</p>
                        {isSearching && <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-400" />}
                      </div>
                      {!isSearching && inquiryResults.map((inquiry) => (
                        <Link
                          key={inquiry.id}
                          href={`/admin/leads?q=${encodeURIComponent(inquiry.full_name)}`}
                          onClick={() => { setSearch(''); setIsSearchOpen(false); }}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-blue-50"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1E3A5F] text-xs font-semibold text-white">
                            {inquiry.full_name.charAt(0).toUpperCase()}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-gray-900">{inquiry.full_name}</span>
                            <span className="block truncate text-xs text-gray-500">{inquiry.whatsapp_number} · {inquiry.selected_project || 'Belum memilih proyek'}</span>
                          </span>
                        </Link>
                      ))}
                      {!isSearching && inquiryResults.length === 0 && pageResults.length === 0 && (
                        <div className="px-4 py-8 text-center">
                          <p className="text-sm font-medium text-gray-900">Hasil tidak ditemukan</p>
                          <p className="mt-1 text-xs text-gray-500">Coba gunakan nama menu, nama pelanggan, atau nomor WhatsApp.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          
          <div className="group relative">
            <Button variant="ghost" size="icon" className="relative cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-900" aria-label="Notifikasi">
              <span className="sr-only">Lihat notifikasi</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Button>
            <div className="invisible absolute right-0 top-full z-50 w-[min(400px,calc(100vw-2rem))] translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                    <p className="mt-0.5 text-xs text-gray-500">{unreadCount} inquiry belum dibaca</p>
                  </div>
                  {unreadCount > 0 && <span className="h-2 w-2 rounded-full bg-red-500" />}
                </div>

                <div className="max-h-80 overflow-y-auto p-2">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Link
                        key={notification.id}
                        href="/admin/leads"
                        className="flex cursor-pointer gap-3 rounded-lg px-3 py-3 hover:bg-blue-50"
                      >
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-gray-900">Inquiry baru dari {notification.full_name}</span>
                          <span className="mt-0.5 block truncate text-xs text-gray-500">
                            {notification.selected_project || 'Belum memilih proyek'} · {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: localeId })}
                          </span>
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="flex flex-col items-center px-4 py-8 text-center">
                      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                      <p className="text-sm font-medium text-gray-900">Tidak ada notifikasi baru</p>
                      <p className="mt-1 text-xs text-gray-500">Semua inquiry sudah dibaca.</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 p-2">
                  <Link href="/admin/leads" className="block cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-medium text-[#0B5EAA] hover:bg-blue-50">
                    Lihat semua inquiry
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          <div className="group relative">
            <Button variant="ghost" className="flex h-10 w-10 cursor-pointer rounded-full p-0 hover:bg-gray-100" aria-label="Profil admin">
              <Avatar className="h-9 w-9 border border-gray-200 bg-gray-100">
                <AvatarImage src={admin?.avatar_url || ''} />
                <AvatarFallback>{admin?.full_name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
            </Button>
            <div className="invisible absolute right-0 top-full z-50 w-72 translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                <div className="flex items-center gap-3 p-4">
                  <Avatar className="h-11 w-11 border border-gray-200 bg-gray-100">
                    <AvatarImage src={admin?.avatar_url || ''} />
                    <AvatarFallback>{admin?.full_name?.charAt(0) || 'A'}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{admin?.full_name || 'Admin'}</p>
                    <p className="truncate text-xs text-gray-500">{admin?.email || 'Administrator'}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 p-2">
                  <Link href="/admin/settings" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#1E3A5F]">
                    <Settings className="h-4 w-4" />
                    Pengaturan akun
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
