'use client'

import AdminPageHeader from '@/components/admin/AdminPageHeader'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Search, ArrowRight, ChevronDown } from 'lucide-react'
import { helpTopics } from '@/lib/admin/help'

export default function HelpCenter() {
  const [query, setQuery] = useState('')
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const openTopic = () => {
      const topic = Array.from(container.current?.querySelectorAll('details') || []).find(item => '#' + item.id === window.location.hash)
      if (topic) { topic.open = true; topic.scrollIntoView({ block: 'start' }) }
    }
    openTopic()
    window.addEventListener('hashchange', openTopic)
    return () => window.removeEventListener('hashchange', openTopic)
  }, [])
  const filtered = helpTopics.filter(topic => [topic.title, topic.question, topic.description, ...topic.steps, ...(topic.notes || [])].join(' ').toLowerCase().includes(query.trim().toLowerCase()))
  return <div ref={container} className="space-y-6">
    <AdminPageHeader icon="help" title="Help" description="Pertanyaan umum seputar admin. Klik pertanyaan untuk melihat jawabannya." />
    <label className="relative block rounded-xl border border-gray-200 bg-white p-4 shadow-sm"><span className="sr-only">Cari petunjuk</span><Search aria-hidden="true" className="pointer-events-none absolute left-7 top-7 h-5 w-5 text-gray-400" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Cari: upload foto, simpan draft, notifikasi…" className="min-h-11 w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#0B5EAA]" /></label>
    <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-semibold text-gray-900">Pertanyaan yang sering ditanyakan</h2><p role="status" className="text-sm text-gray-500">{filtered.length} pertanyaan</p></div>
    {filtered.length > 0 && <div className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {filtered.map(topic => <details key={topic.id} id={topic.id} name="admin-help-faq" className="group scroll-mt-24">
        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-gray-900 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B5EAA] group-open:bg-blue-50/50 group-open:text-[#0B5EAA] sm:px-6 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 text-sm font-semibold leading-relaxed sm:text-base">{topic.question}</span>
          <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 group-open:text-[#0B5EAA] motion-reduce:transition-none" />
        </summary>
        <div className="space-y-5 border-t border-gray-100 px-5 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0B5EAA]">{topic.title}</p>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-600">{topic.steps.map(step => <li key={step}>{step}</li>)}</ol>
          {topic.notes && <aside className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-gray-600"><h2 className="font-semibold text-gray-900">Perlu diketahui</h2>{topic.notes.map(note => <p key={note}>{note}</p>)}</aside>}
          <div className="flex flex-wrap gap-3">
            {topic.guide && <Link href={topic.guide} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#0B5EAA] px-4 text-sm font-semibold text-white hover:bg-[#094c89] focus-visible:ring-2 focus-visible:ring-[#0B5EAA]">Petunjuk lengkap <BookOpen aria-hidden="true" className="h-4 w-4" /></Link>}
            <Link href={topic.href} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-semibold text-[#0B5EAA] hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-[#0B5EAA]">Buka fitur <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </div>
      </details>)}
    </div>}
    {!filtered.length && <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-600"><p>Petunjuk tidak ditemukan. Coba kata yang lebih singkat.</p><button onClick={() => setQuery('')} className="mt-3 min-h-11 rounded-lg px-4 font-semibold text-[#0B5EAA] hover:bg-blue-50">Reset pencarian</button></div>}
  </div>
}
