'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils';
import { LayoutDashboard, BarChart3, Users, Settings, LogOut, ChevronLeft, ChevronRight, Menu, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

interface SidebarProps {
  className?: string;
  isMobile?: boolean;
}

export default function Sidebar({ className, isMobile = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { logout, unreadCount } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setIsLogoutDialogOpen(false);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Website Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Leads / Inquiry', href: '/admin/leads', icon: Users, badge: unreadCount },
    { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
  ];

  const renderSidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-[#1E3A5F] text-white">
      <div>
        <div className={cn("flex h-20 items-center border-b border-white/10", collapsed && !isMobile ? "justify-center px-2" : "justify-between px-4")}>
          <div className="flex items-center gap-3 overflow-hidden">
            <Image
              src="/images/brand/mtk logo 1.png"
              alt="Logo MTK"
              width={44}
              height={44}
              className={cn('shrink-0 object-contain', collapsed && !isMobile ? 'h-8 w-8' : 'h-11 w-11')}
              priority
            />
            {(!collapsed || isMobile) && (
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-white truncate text-sm">Admin Portal</span>
                <span className="text-xs text-white/70 truncate">PT Marga Tirta Kencana</span>
              </div>
            )}
          </div>
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white/70 hover:text-white shrink-0"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                  collapsed && !isMobile ? "justify-center" : "justify-start"
                )}
                title={collapsed && !isMobile ? item.name : undefined}
              >
                <item.icon
                  className={cn("shrink-0", collapsed && !isMobile ? "h-5 w-5" : "mr-3 h-5 w-5")}
                  aria-hidden="true"
                />
                {(!collapsed || isMobile) && <span className="flex-1 truncate">{item.name}</span>}
                {(!collapsed || isMobile) && item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto inline-block rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                )}
                {(collapsed && !isMobile) && item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full text-white/70 hover:bg-white/10 hover:text-white",
            collapsed && !isMobile ? "px-0 justify-center" : "justify-start"
          )}
          onClick={() => setIsLogoutDialogOpen(true)}
          disabled={isLoggingOut}
        >
          <LogOut className={cn("h-5 w-5", (!collapsed || isMobile) && "mr-3")} />
          {(!collapsed || isMobile) && (isLoggingOut ? 'Logging out...' : 'Logout')}
        </Button>
      </div>
    </div>
  );

  const logoutDialog = (
    <Dialog open={isLogoutDialogOpen} onOpenChange={(open) => !isLoggingOut && setIsLogoutDialogOpen(open)}>
      <DialogContent className="max-w-md rounded-2xl p-0">
        <div className="p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <LogOut className="h-6 w-6" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-900">Keluar dari Admin Portal?</DialogTitle>
            <DialogDescription className="pt-2 leading-6 text-gray-500">
              Sesi Anda akan diakhiri dan Anda perlu masuk kembali untuk mengakses dashboard admin.
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className="gap-2 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:space-x-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsLogoutDialogOpen(false)}
            disabled={isLoggingOut}
            className="border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-red-600 text-white hover:bg-red-700 hover:text-white"
          >
            {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
            {isLoggingOut ? 'Sedang keluar...' : 'Ya, Logout'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (isMobile) {
    return (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={className}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[260px] p-0 border-r-0">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            {renderSidebarContent()}
          </SheetContent>
        </Sheet>
        {logoutDialog}
      </>
    );
  }

  return (
    <>
      <aside
        className={cn(
          "hidden md:flex flex-col z-50 transition-all duration-300 shrink-0 border-r",
          collapsed ? "w-[72px]" : "w-[260px]",
          className
        )}
      >
        {renderSidebarContent()}
      </aside>
      {logoutDialog}
    </>
  );
}
