import 'server-only'

import { BetaAnalyticsDataClient } from '@google-analytics/data'

export type AnalyticsSummary = {
  totalSessions: number
  uniqueVisitors: number
  bounceRate: number
  averageSessionDuration: number
  trafficByDate: { date: string; sessions: number; visitors: number }[]
  devices: { device: string; sessions: number; percentage: number }[]
  topPages: { path: string; views: number; averageTime: number }[]
  waClicks: number
  generatedAt: string
}

let cache: { expiresAt: number; value: AnalyticsSummary } | null = null

function getClient() {
  const rawCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
  if (!rawCredentials) throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is not configured')

  const credentials = JSON.parse(rawCredentials) as {
    client_email: string
    private_key: string
    project_id?: string
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/g, '\n'),
    },
    projectId: credentials.project_id,
  })
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  if (cache && cache.expiresAt > Date.now()) return cache.value

  const propertyId = process.env.GA4_PROPERTY_ID
  if (!propertyId) throw new Error('GA4_PROPERTY_ID is not configured')

  const client = getClient()
  const property = `properties/${propertyId}`
  const [summaryResponse, trafficResponse, pagesResponse, devicesResponse, eventsResponse] = await Promise.all([
    client.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: '365daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'userEngagementDuration' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'wa_click', matchType: 'EXACT' } } },
    }),
  ])

  const summaryMetrics = summaryResponse[0].rows?.[0]?.metricValues || []
  const deviceRows = (devicesResponse[0].rows || []).map((row) => ({
    device: row.dimensionValues?.[0]?.value || 'unknown',
    sessions: Number(row.metricValues?.[0]?.value || 0),
  }))
  const deviceSessions = deviceRows.reduce((total, item) => total + item.sessions, 0)

  const value: AnalyticsSummary = {
    totalSessions: Number(summaryMetrics[0]?.value || 0),
    uniqueVisitors: Number(summaryMetrics[1]?.value || 0),
    bounceRate: Number(summaryMetrics[2]?.value || 0),
    averageSessionDuration: Number(summaryMetrics[3]?.value || 0),
    trafficByDate: (trafficResponse[0].rows || []).map((row) => ({
      date: row.dimensionValues?.[0]?.value || '',
      sessions: Number(row.metricValues?.[0]?.value || 0),
      visitors: Number(row.metricValues?.[1]?.value || 0),
    })),
    devices: deviceRows.map((item) => ({
      ...item,
      percentage: deviceSessions ? Math.round((item.sessions / deviceSessions) * 100) : 0,
    })),
    topPages: (pagesResponse[0].rows || []).map((row) => {
      const views = Number(row.metricValues?.[0]?.value || 0)
      const engagementDuration = Number(row.metricValues?.[1]?.value || 0)
      return {
        path: row.dimensionValues?.[0]?.value || '/',
        views,
        averageTime: views ? engagementDuration / views : 0,
      }
    }),
    waClicks: Number(eventsResponse[0].rows?.[0]?.metricValues?.[0]?.value || 0),
    generatedAt: new Date().toISOString(),
  }

  cache = { expiresAt: Date.now() + 15 * 60 * 1000, value }
  return value
}

export async function getAnalyticsSummarySafe(): Promise<AnalyticsSummary | null> {
  if (!process.env.GA4_PROPERTY_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) return null

  try {
    return await getAnalyticsSummary()
  } catch (error) {
    console.error('Unable to fetch GA4 analytics:', error)
    return null
  }
}
