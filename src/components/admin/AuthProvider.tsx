'use client';

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useInquiryNotifications } from '@/lib/hooks/useInquiryNotifications';
import type { InquiryNotification } from '@/lib/admin/inquiry-notifications';
import { useIdleTimeout } from '@/lib/hooks/useIdleTimeout';

export type AdminUser = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string | null;
  role: 'super_admin' | 'admin';
  is_active: boolean;
};

interface AuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  isSuperAdmin: boolean;
  unreadCount: number;
  notifications: InquiryNotification[];
  notificationsLoading: boolean;
  notificationsError: string | null;
  refreshUnreadCount: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialAdmin }: { children: React.ReactNode; initialAdmin: AdminUser }) {
  const [admin, setAdmin] = useState<AdminUser | null>(initialAdmin);
  const { unreadCount, notifications, loading: notificationsLoading, error: notificationsError, refresh: refreshUnreadCount } = useInquiryNotifications(admin?.is_active ? admin.id : null);
  const supabase = createClient();
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // Fetch admin profile
      const { data: profile } = await supabase
        .from('admins')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (profile) {
        setAdmin({
          id: profile.id,
          email: session.user.email!,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          role: profile.role,
          is_active: profile.is_active,
        });
      }
    } else {
      setAdmin(null);
    }
  }, [supabase]);


  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setAdmin(null);
    router.push('/admin/login');
  }, [supabase, router]);

  useIdleTimeout(() => {
    if (admin) {
      logout();
    }
  });

  useEffect(() => {
    let authRefresh: number | undefined;
    // Supabase callbacks must return before another auth/database request starts.
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        window.clearTimeout(authRefresh);
        authRefresh = window.setTimeout(() => {
          void fetchUser();
          void refreshUnreadCount();
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        setAdmin(null);
        router.push('/admin/login');
      }
    });
    return () => {
      window.clearTimeout(authRefresh);
      authListener.subscription.unsubscribe();
    };
  }, [fetchUser, refreshUnreadCount, supabase, router]);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoading: false,
        isSuperAdmin: admin?.role === 'super_admin',
        unreadCount,
        notifications,
        notificationsLoading,
        notificationsError,
        refreshUnreadCount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
