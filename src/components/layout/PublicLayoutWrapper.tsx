'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWA from './FloatingWA';
import GoogleAnalyticsTag from '@/components/analytics/GoogleAnalyticsTag';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <GoogleAnalyticsTag />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWA />
    </>
  );
}
