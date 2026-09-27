'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { useDebounce } from '@/hooks/use-debounce'
import { useLeadsFilters } from '@/lib/hooks/useLeadsFilters'

export function LeadsToolbar() {
  const { searchParams, setFilter, resetFilters } = useLeadsFilters()

  const [search, setSearch] = useState(searchParams.get('q') || '')
  const debouncedSearch = useDebounce(search, 300)

  const [project, setProject] = useState(searchParams.get('project') || 'all')
  const [status, setStatus] = useState(searchParams.get('status') || 'all')

  useEffect(() => {
    if ((searchParams.get('q') || '') !== debouncedSearch) setFilter('q', debouncedSearch)
  }, [debouncedSearch, searchParams, setFilter])

  const handleProjectChange = (value: string) => {
    setProject(value)
    setFilter('project', value)
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    setFilter('status', value)
  }

  const handleReset = () => {
    setSearch('')
    setProject('all')
    setStatus('all')
    resetFilters()
  }

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="grid items-center gap-3 sm:grid-cols-2 xl:grid-cols-[360px_220px_220px_auto] xl:justify-start">
      <div className="relative w-full sm:col-span-2 xl:col-span-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Cari nama atau nomor WA..."
          className="w-full border-gray-200 bg-white pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

        <Select value={project} onValueChange={handleProjectChange}>
          <SelectTrigger className="w-full border-gray-200 bg-white">
            <SelectValue placeholder="Semua Proyek" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Proyek</SelectItem>
            <SelectItem value="TCI 1">TCI 1</SelectItem>
            <SelectItem value="TCI 2">TCI 2</SelectItem>
            <SelectItem value="TCI 3">TCI 3</SelectItem>
            <SelectItem value="Rancamanyar Indah">Rancamanyar Indah</SelectItem>
            <SelectItem value="Permata Buah Batu">Permata Buah Batu</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full border-gray-200 bg-white">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="baru">Baru</SelectItem>
            <SelectItem value="diproses">Diproses</SelectItem>
            <SelectItem value="sudah_dihubungi">Sudah Dihubungi</SelectItem>
            <SelectItem value="batal">Batal</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" onClick={handleReset} className="justify-self-start whitespace-nowrap text-gray-500 xl:justify-self-end">
            <X className="w-4 h-4 mr-2" />
            Reset Filter
          </Button>
        )}
    </div>
  )
}
