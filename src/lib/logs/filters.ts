export function normalizeLogFilters(params: Record<string, string | string[] | undefined>) {
  const single = (key: string) => typeof params[key] === 'string' ? params[key] as string : ''
  const validDate = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return ''
    const date = new Date(`${value}T00:00:00Z`)
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : ''
  }
  const kind: 'audit' | 'error' = single('kind') === 'error' ? 'error' : 'audit'
  const q = single('q').replace(/[^\p{L}\p{N}\s_.@-]/gu, ' ').trim().slice(0, 80)
  const from = validDate(single('from'))
  const to = validDate(single('to'))
  const rawPage = Number(single('page'))
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? Math.min(rawPage, 10000) : 1
  return { kind, q, from, to, page, invalidRange: Boolean(from && to && from > to) }
}

// Log only safe correlation codes, never arbitrary error messages, stacks or payloads.
export function safeErrorCode(error: unknown): string | null {
  if (!error || typeof error !== 'object' || !('code' in error)) return null
  const code = error.code
  return typeof code === 'string' && /^[A-Z0-9_]{2,40}$/.test(code) ? code : null
}

export function actionFailed(result: unknown): boolean {
  return Boolean(result && typeof result === 'object' && (
    ('success' in result && result.success === false) || ('error' in result && result.error)
  ))
}
