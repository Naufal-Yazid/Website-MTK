'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useLeadsFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setFilter = useCallback((name: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') params.set(name, value)
    else params.delete(name)
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }, [pathname, router, searchParams])

  const resetFilters = useCallback(() => router.push(pathname), [pathname, router])

  return { searchParams, setFilter, resetFilters }
}
