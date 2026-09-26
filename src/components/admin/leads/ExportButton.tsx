'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, FileSpreadsheet, FileDown } from 'lucide-react'
import { format } from 'date-fns'
import { Database } from '@/lib/types/database'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type Inquiry = Database['public']['Tables']['inquiries']['Row']

interface ExportButtonProps {
  data: Inquiry[]
}

export function ExportButton({ data }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const prepareData = () => {
    return data.map(item => ({
      'ID': item.id,
      'Tanggal Masuk': format(new Date(item.created_at), 'dd MMM yyyy, HH:mm'),
      'Nama Lengkap': item.full_name,
      'Nomor WA': item.whatsapp_number,
      'Proyek': item.selected_project || '-',
      'Tipe Rumah': item.selected_type || '-',
      'Isi Pesan': item.message || '-',
      'Status': item.status,
      'Tanggal Diperbarui': format(new Date(item.updated_at), 'dd MMM yyyy, HH:mm')
    }))
  }

  const handleExportCSV = () => {
    setIsExporting(true)
    try {
      const exportData = prepareData()
      const headers = Object.keys(exportData[0] || {})
      const escapeCell = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`
      const csvOutput = [
        headers.map(escapeCell).join(','),
        ...exportData.map((row) => headers.map((header) => escapeCell(row[header as keyof typeof row])).join(',')),
      ].join('\r\n')
      
      const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `MTK_Leads_${format(new Date(), 'yyyy-MM-dd')}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      const exportData = prepareData()
      const ExcelJS = await import('exceljs')
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Leads')
      const headers = Object.keys(exportData[0] || {})
      worksheet.columns = headers.map((header) => ({ header, key: header, width: Math.max(16, header.length + 4) }))
      exportData.forEach((row) => worksheet.addRow(row))
      worksheet.getRow(1).font = { bold: true }
      worksheet.views = [{ state: 'frozen', ySplit: 1 }]

      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.href = url
      link.download = `MTK_Leads_${format(new Date(), 'yyyy-MM-dd')}.xlsx`
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          disabled={isExporting}
          className="h-10 cursor-pointer bg-[#0B5EAA] px-4 text-white hover:bg-[#084B87] hover:text-white disabled:bg-[#0B5EAA] disabled:text-white disabled:opacity-100"
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV/Excel
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 border-gray-200">
        <DropdownMenuItem onSelect={handleExportCSV} className="cursor-pointer">
          <FileDown className="mr-2 h-4 w-4" /> Export CSV
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleExportExcel} className="cursor-pointer">
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
