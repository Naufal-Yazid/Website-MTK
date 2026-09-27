import 'server-only'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'
import { findDocument, mergeValues, resolvePublished } from './model'
import type { ContentPageProps } from './values'

export async function requireContentAdmin() {
  const client = await createClient()
  const { data: { user } } = await client.auth.getUser()
  if (!user) throw new Error('content_unauthorized')
  const { data: admin } = await client.from('admins').select('id, is_active').eq('id', user.id).single()
  if (!admin?.is_active) throw new Error('content_unauthorized')
  return client
}

export async function getPublishedContent() {
  const fallback = resolvePublished([])
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return fallback
  try {
    // Deliberately anonymous: only the separate published table is public-readable.
    const client = createSupabaseClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store', signal: AbortSignal.timeout(4000) }) },
    })
    const { data, error } = await client.from('site_content_published').select('document_key, content')
    if (error) throw error
    return resolvePublished(data || [])
  } catch {
    console.warn('[content] Konten terbit tidak dapat dimuat; memakai konten bawaan. Periksa migrasi 004/koneksi database.')
    return fallback
  }
}

export type ContentPreview = { id: string; label: string; revision: number } | null

export async function getPageContent(searchParams: ContentPageProps['searchParams']) {
  const query = await searchParams
  const doc = findDocument(query.preview)
  // Reject anonymous preview BEFORE reading any draft, even when query parameters are forged.
  let adminClient: Awaited<ReturnType<typeof requireContentAdmin>> | undefined
  if (doc) {
    try { adminClient = await requireContentAdmin() } catch { redirect('/admin/login') }
  }
  const content = await getPublishedContent()
  let preview: ContentPreview = null
  if (doc && adminClient) {
    const { data, error } = await adminClient.from('site_content_drafts').select('content, revision').eq('document_key', doc.id).maybeSingle()
    if (error) throw new Error('Draft belum dapat dipreview. Periksa migrasi 004 dan koneksi database.')
    if (data) content[doc.id] = mergeValues(doc, data.content)
    preview = { id: doc.id, label: doc.label, revision: data?.revision || 0 }
  }
  return { content, preview }
}

export async function contentMetadata({ searchParams }: ContentPageProps) {
  return (await searchParams).preview ? { robots: { index: false, follow: false } } : {}
}
