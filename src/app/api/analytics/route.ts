import { NextResponse } from 'next/server'
import { getAnalyticsSummary } from '@/lib/google-analytics'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: admin } = await supabase
    .from('admins')
    .select('is_active')
    .eq('id', user.id)
    .maybeSingle()
  if (!admin?.is_active) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  if (!process.env.GA4_PROPERTY_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
    return NextResponse.json({ configured: false, data: null })
  }

  try {
    return NextResponse.json({ configured: true, data: await getAnalyticsSummary() })
  } catch (error) {
    console.error('Unable to fetch GA4 analytics:', error)
    return NextResponse.json({ error: 'Unable to fetch analytics data.' }, { status: 502 })
  }
}
