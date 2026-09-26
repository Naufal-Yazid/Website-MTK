'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import { StatusBadge, InquiryStatus } from '@/components/admin/StatusBadge';
import { InquiryDetailModal } from '@/components/admin/leads/InquiryDetailModal';
import { logWaClick } from '@/app/admin/(dashboard)/leads/actions';
import type { Database } from '@/lib/types/database';

type Inquiry = Database['public']['Tables']['inquiries']['Row'];

export function RecentMessagesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const handleChatWA = async (inquiry: Inquiry) => {
    try {
      await logWaClick(inquiry.id);
    } catch (error) {
      console.error('Error logging WA click:', error);
    }
    
    // Format phone number and open WhatsApp
    const rawPhone = inquiry.whatsapp_number;
    const phone = rawPhone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${phone.startsWith('0') ? '62' + phone.slice(1) : phone}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">Pesan Terbaru</h3>
        <Link 
          href="/admin/leads" 
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Lihat Semua →
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Nama</th>
              <th className="px-6 py-3 font-medium">Nomor WA</th>
              <th className="px-6 py-3 font-medium">Proyek</th>
              <th className="px-6 py-3 font-medium">Tanggal</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {inquiry.full_name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{inquiry.whatsapp_number}</td>
                  <td className="whitespace-nowrap px-6 py-4">{inquiry.selected_project || '-'}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {format(new Date(inquiry.created_at), 'd MMM yyyy, HH:mm', { locale: id })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <StatusBadge status={inquiry.status as InquiryStatus} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        title="Detail"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleChatWA(inquiry)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
                        title="Chat WA"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Belum ada pesan terbaru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <InquiryDetailModal 
        key={selectedInquiry?.id || 'empty'}
        inquiry={selectedInquiry}
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        siteSettings={null}
      />
    </div>
  );
}
