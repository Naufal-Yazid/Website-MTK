import type { ReactNode } from 'react'

type Props = {
  title: string
  summary?: string
  children: ReactNode
  sidebar: ReactNode
  steps?: readonly (readonly [string, string])[]
}

const defaultSteps = [
  ['Simpan Draft', 'Simpan perubahan tanpa mengubah website.'],
  ['Preview', 'Periksa tampilan sebelum ditayangkan.'],
  ['Publikasikan', 'Tampilkan draft kepada pengunjung.'],
] as const

export default function EditorDetailLayout({ title, summary, children, sidebar, steps = defaultSteps }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {summary && <p className="text-xs text-gray-500">{summary}</p>}
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-4">{children}</div>
        <aside aria-label="Status dan aksi publikasi" className="min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-0 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">
          <div className="space-y-4 p-5">{sidebar}</div>
          <ol aria-label="Alur pengelolaan" className="grid gap-4 border-t border-gray-100 p-5">
            {steps.map(([step, detail], index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#0B5EAA]">{index + 1}</span>
                <div><p className="text-sm font-semibold text-gray-900">{step}</p><p className="mt-1 text-xs leading-relaxed text-gray-500">{detail}</p></div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  )
}
