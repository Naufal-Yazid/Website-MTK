import React from 'react';
import { redirect } from 'next/navigation';
import { AuthProvider } from '@/components/admin/AuthProvider';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  const { data: profile } = await supabase
    .from('admins')
    .select('id, email, full_name, avatar_url, role, is_active')
    .eq('id', user.id)
    .single();

  if (!profile?.is_active) redirect('/admin/login?error=disabled');

  return (
    <AuthProvider initialAdmin={profile}>
      <div className="flex h-screen overflow-hidden bg-slate-50 text-gray-900" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
