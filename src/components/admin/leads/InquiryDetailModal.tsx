'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Copy, MessageCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Database } from '@/lib/types/database'
import { updateInquiryStatus, markInquiryAsRead, logWaClick } from '@/app/admin/(dashboard)/leads/actions'

type Inquiry = Database['public']['Tables']['inquiries']['Row']
type Status = Inquiry['status']

interface InquiryDetailModalProps {
  inquiry: Inquiry | null
  isOpen: boolean
  onClose: () => void
  siteSettings: {
    wa_greeting_template: string | null
  } | null
}

export function InquiryDetailModal({ inquiry, isOpen, onClose, siteSettings }: InquiryDetailModalProps) {
  const [status, setStatus] = useState<Status>(inquiry?.status || 'baru')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (inquiry && isOpen) {
      if (!inquiry.is_read) {
        markInquiryAsRead(inquiry.id).catch(console.error)
      }
    }
  }, [inquiry, isOpen])

  if (!inquiry) return null

  const handleCopyWa = () => {
    navigator.clipboard.writeText(inquiry.whatsapp_number)
    toast.success('Nomor WhatsApp disalin')
  }

  const handleStatusChange = async () => {
    if (status === inquiry.status) return
    setIsUpdating(true)
    try {
      await updateInquiryStatus(inquiry.id, status)
      toast.success('Status berhasil diperbarui')
    } catch {
      toast.error('Gagal memperbarui status')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleWaClick = async () => {
    try {
      let template = siteSettings?.wa_greeting_template || 'Halo {nama}, terima kasih telah tertarik dengan proyek {proyek}.'
      template = template.replace(/{nama}/g, inquiry.full_name)
      template = template.replace(/{proyek}/g, inquiry.selected_project || 'kami')
      
      const text = encodeURIComponent(template)
      const waUrl = `https://wa.me/${inquiry.whatsapp_number.replace(/\D/g, '')}?text=${text}`
      
      window.open(waUrl, '_blank')
      
      await logWaClick(inquiry.id)
    } catch (error) {
      console.error('Failed to log WA click:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{inquiry.full_name}</DialogTitle>
          <DialogDescription>
            {format(new Date(inquiry.created_at), 'dd MMM yyyy, HH:mm', { locale: id })}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-1">
            <span className="text-sm font-medium text-gray-500">Nomor WhatsApp</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{inquiry.whatsapp_number}</span>
              <Button variant="ghost" size="icon" onClick={handleCopyWa} className="h-8 w-8">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-1">
            <span className="text-sm font-medium text-gray-500">Proyek & Tipe</span>
            <span>{inquiry.selected_project || '-'} {inquiry.selected_type ? `— ${inquiry.selected_type}` : ''}</span>
          </div>

          <div className="grid gap-1">
            <span className="text-sm font-medium text-gray-500">Pesan</span>
            <div className="p-3 bg-gray-50 rounded-md text-sm whitespace-pre-wrap">
              {inquiry.message || 'Tidak ada pesan.'}
            </div>
          </div>

          <div className="grid gap-1 mt-2">
            <span className="text-sm font-medium text-gray-500">Status Inquiry</span>
            <div className="flex items-center gap-2">
              <Select value={status} onValueChange={(val) => setStatus(val as Status)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baru">Baru</SelectItem>
                  <SelectItem value="diproses">Diproses</SelectItem>
                  <SelectItem value="sudah_dihubungi">Sudah Dihubungi</SelectItem>
                  <SelectItem value="batal">Batal</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleStatusChange} disabled={isUpdating || status === inquiry.status}>
                {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Simpan
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-200 pt-4">
          <Button onClick={handleWaClick} className="bg-green-600 hover:bg-green-700">
            <MessageCircle className="w-4 h-4 mr-2" />
            Hubungi via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
