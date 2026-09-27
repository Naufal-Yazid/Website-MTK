'use client';

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
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
  refreshUnreadCount: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialAdmin }: { children: React.ReactNode; initialAdmin: AdminUser }) {
  const [admin, setAdmin] = useState<AdminUser | null>(initialAdmin);
  const [unreadCount, setUnreadCount] = useState(0);
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

  const refreshUnreadCount = useCallback(async () => {
    const { count } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);
      
    if (count !== null) {
      setUnreadCount(count);
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
    const initialRefresh = window.setTimeout(() => {
      void refreshUnreadCount();
    }, 0);

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        fetchUser();
        refreshUnreadCount();
      } else if (event === 'SIGNED_OUT') {
        setAdmin(null);
        router.push('/admin/login');
      }
    });

    // Realtime subscription for unread inquiries
    const channel = supabase
      .channel('inquiries_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inquiries' },
        () => {
          refreshUnreadCount();
        }
      )
      .subscribe();

    return () => {
      window.clearTimeout(initialRefresh);
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [fetchUser, refreshUnreadCount, supabase, router]);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoading: false,
        isSuperAdmin: admin?.role === 'super_admin',
        unreadCount,
        refreshUnreadCount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
