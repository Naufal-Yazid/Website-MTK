import type { Instrumentation } from 'next'

export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  const pathname = request.path.split('?')[0]
  // Restrict collection to admin and avoid log-page failures generating endless log entries.
  if ((pathname !== '/admin' && !pathname.startsWith('/admin/')) || pathname.startsWith('/admin/logs')) return
  try {
    const { writeLog } = await import('@/lib/logs/server')
    const digest = error && typeof error === 'object' && 'digest' in error &&
      typeof error.digest === 'string' && /^[\w-]{1,100}$/.test(error.digest) ? error.digest : null
    await writeLog({
      kind: 'error', source: 'server', actor_name: 'Sistem',
      action: `server.${context.routeType}`,
      summary: 'Error server tidak tertangani pada halaman admin.',
      details: { route: context.routePath, method: request.method, digest },
    })
  } catch {
    // Error reporting must never throw recursively.
  }
}
