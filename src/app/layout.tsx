import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marga Tirta Kencana — Hunian Berkualitas di Bandung & Sekitarnya",
  description: "Pengembang perumahan terpercaya di Bandung. Wujudkan impian memiliki rumah modern minimalis dengan aksesibilitas terbaik dan lingkungan asri.",
  keywords: ["Marga Tirta Kencana", "Perumahan Bandung", "Taman Cibaduyut Indah", "Rancamanyar Indah", "Permata Buah Batu", "Rumah KPR Bandung"],
  authors: [{ name: "Marga Tirta Kencana" }],
  openGraph: {
    title: "Marga Tirta Kencana — Hunian Berkualitas di Bandung",
    description: "Wujudkan impian memiliki rumah dengan desain arsitektur modern di Bandung & sekitarnya.",
    url: "https://margatirtakencana.co.id",
    siteName: "Marga Tirta Kencana",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${plusJakartaSans.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#6B7280] antialiased selection:bg-[#0B5EAA] selection:text-white">
        <PublicLayoutWrapper>
          {children}
        </PublicLayoutWrapper>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
