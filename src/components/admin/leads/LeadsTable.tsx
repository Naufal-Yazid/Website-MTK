'use client'

import { useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, ChevronsUpDown, Eye, Inbox, MessageCircle } from 'lucide-react'
import { Database } from '@/lib/types/database'
import { InquiryDetailModal } from './InquiryDetailModal'
import { logWaClick } from '@/app/admin/(dashboard)/leads/actions'

type Inquiry = Database['public']['Tables']['inquiries']['Row']

interface LeadsTableProps {
  data: Inquiry[]
  siteSettings: { wa_greeting_template: string | null } | null
}

const statusColorMap: Record<string, string> = {
  baru: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  diproses: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
  sudah_dihubungi: 'bg-green-100 text-green-700 hover:bg-green-100',
  batal: 'bg-red-100 text-red-700 hover:bg-red-100',
}

const statusLabelMap: Record<string, string> = {
  baru: 'Baru',
  diproses: 'Diproses',
  sudah_dihubungi: 'Sudah Dihubungi',
  batal: 'Batal',
}

export function LeadsTable({ data, siteSettings }: LeadsTableProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState<{ key: 'created_at' | 'full_name' | 'status'; ascending: boolean }>({ key: 'created_at', ascending: false })

  const sortedData = useMemo(() => [...data].sort((a, b) => {
    const left = a[sort.key].toLocaleLowerCase()
    const right = b[sort.key].toLocaleLowerCase()
    return left.localeCompare(right) * (sort.ascending ? 1 : -1)
  }), [data, sort])
  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const visibleData = sortedData.slice((page - 1) * pageSize, page * pageSize)

  const toggleSort = (key: typeof sort.key) => {
    setSort((current) => ({ key, ascending: current.key === key ? !current.ascending : true }))
    setPage(1)
  }

  const handleOpenDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
  }

  const handleCloseDetail = () => {
    setSelectedInquiry(null)
  }

  const handleQuickWa = async (inquiry: Inquiry) => {
    let template = siteSettings?.wa_greeting_template || 'Halo {nama}, terima kasih telah tertarik dengan proyek {proyek}.'
    template = template.replace(/{nama}/g, inquiry.full_name)
    template = template.replace(/{proyek}/g, inquiry.selected_project || 'kami')
    
    const text = encodeURIComponent(template)
    const waUrl = `https://wa.me/${inquiry.whatsapp_number.replace(/\D/g, '')}?text=${text}`
    
    window.open(waUrl, '_blank')
    await logWaClick(inquiry.id)
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-gray-200">
        <Inbox className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Tidak ada data inquiry</h3>
        <p className="text-gray-500 mt-1">Belum ada inquiry yang sesuai dengan filter Anda.</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><button onClick={() => toggleSort('created_at')} className="flex items-center gap-1">ID / Tanggal <ChevronsUpDown className="h-3.5 w-3.5" /></button></TableHead>
              <TableHead><button onClick={() => toggleSort('full_name')} className="flex items-center gap-1">Nama Lengkap <ChevronsUpDown className="h-3.5 w-3.5" /></button></TableHead>
              <TableHead>Nomor WA</TableHead>
              <TableHead>Proyek & Tipe</TableHead>
              <TableHead>Pesan</TableHead>
              <TableHead><button onClick={() => toggleSort('status')} className="flex items-center gap-1">Status <ChevronsUpDown className="h-3.5 w-3.5" /></button></TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleData.map((inquiry) => (
              <TableRow key={inquiry.id} className={!inquiry.is_read ? 'bg-blue-50/50 font-medium' : ''}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-mono">
                      #{inquiry.id.substring(0, 8)}
                    </span>
                    <span className="text-sm">
                      {format(new Date(inquiry.created_at), 'dd MMM yyyy, HH:mm', { locale: localeId })}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{inquiry.full_name}</TableCell>
                <TableCell>
                  <a 
                    href={`https://wa.me/${inquiry.whatsapp_number.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {inquiry.whatsapp_number}
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{inquiry.selected_project || '-'}</span>
                    <span className="text-xs text-gray-500">
                      {inquiry.selected_type ? `Tipe ${inquiry.selected_type}` : ''}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate" title={inquiry.message || ''}>
                  {inquiry.message || '-'}
                </TableCell>
                <TableCell>
                  <Badge className={statusColorMap[inquiry.status]} variant="secondary">
                    {statusLabelMap[inquiry.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDetail(inquiry)} className="border-[#1E3A5F] bg-[#1E3A5F] text-white hover:bg-[#294f7d] hover:text-white">
                      <Eye className="w-4 h-4 mr-1" />
                      Detail
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleQuickWa(inquiry)}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex flex-col gap-3 border-t border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Baris per halaman</span>
            <select
              value={pageSize}
              onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1) }}
              className="rounded-md border border-gray-200 bg-white px-2 py-1 text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              {[20, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
            <span>{sortedData.length} lead</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Halaman {page} dari {pageCount}</span>
            <Button variant="outline" size="icon" disabled={page === 1} onClick={() => setPage((value) => value - 1)} aria-label="Halaman sebelumnya">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled={page === pageCount} onClick={() => setPage((value) => value + 1)} aria-label="Halaman berikutnya">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <InquiryDetailModal 
        key={selectedInquiry?.id || 'empty'}
        inquiry={selectedInquiry}
        isOpen={!!selectedInquiry}
        onClose={handleCloseDetail}
        siteSettings={siteSettings}
      />
    </>
  )
}
