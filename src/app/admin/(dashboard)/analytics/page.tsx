import { Activity, Clock3, Globe2, Laptop, MonitorSmartphone, Smartphone, Tablet, Users } from 'lucide-react';
import { getAnalyticsSummarySafe } from '@/lib/google-analytics';
import { MetricCard } from '@/components/admin/dashboard/MetricCard';
import { TrafficAcquisitionChart } from '@/components/admin/analytics/TrafficAcquisitionChart';

export const metadata = { title: 'Website Analytics | MTK Admin' };

function formatDuration(seconds: number) {
  const rounded = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(rounded / 60);
  const remainingSeconds = rounded % 60;
  return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
}

function deviceIcon(device: string) {
  if (device === 'desktop') return <Laptop className="h-4 w-4" />;
  if (device === 'mobile') return <Smartphone className="h-4 w-4" />;
  if (device === 'tablet') return <Tablet className="h-4 w-4" />;
  return <MonitorSmartphone className="h-4 w-4" />;
}

function deviceLabel(device: string) {
  return device.charAt(0).toUpperCase() + device.slice(1);
}

export default async function WebsiteAnalyticsPage() {
  const analytics = await getAnalyticsSummarySafe();
  const devices = analytics?.devices || [];
  const topPages = analytics?.topPages || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Website Analytics</h1>
        <p className="text-gray-500">Pantau traffic, perilaku pengunjung, perangkat, dan performa halaman website.</p>
      </div>

      {!analytics && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Google Analytics belum terhubung. Tambahkan <strong>GA4_PROPERTY_ID</strong> dan <strong>GOOGLE_SERVICE_ACCOUNT_CREDENTIALS</strong> untuk menampilkan data aktual.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Sessions" value={analytics?.totalSessions || 0} icon={<Globe2 className="h-5 w-5" />} iconClassName="bg-teal-50 text-teal-600" />
        <MetricCard title="Unique Visitors" value={analytics?.uniqueVisitors || 0} icon={<Users className="h-5 w-5" />} iconClassName="bg-cyan-50 text-cyan-600" />
        <MetricCard title="Bounce Rate" value={`${((analytics?.bounceRate || 0) * 100).toFixed(1)}%`} icon={<Activity className="h-5 w-5" />} iconClassName="bg-teal-50 text-teal-600" />
        <MetricCard title="Avg. Duration" value={formatDuration(analytics?.averageSessionDuration || 0)} icon={<Clock3 className="h-5 w-5" />} iconClassName="bg-cyan-50 text-cyan-600" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Traffic Acquisition</h2>
              <p className="mt-1 text-sm text-gray-500">Sessions dan unique visitors dalam 30 hari terakhir.</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#2CB3AA]" /> Sessions</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#153757]" /> Visitors</span>
            </div>
          </div>
          <TrafficAcquisitionChart data={analytics?.trafficByDate || []} />
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Device Analytics</h2>
          <p className="mt-1 text-sm text-gray-500">Distribusi session berdasarkan perangkat.</p>
          <div className="mt-8 space-y-6">
            {devices.length > 0 ? devices.map((item) => (
              <div key={item.device}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">{deviceIcon(item.device)}</span>
                    {deviceLabel(item.device)}
                  </span>
                  <strong className="text-gray-900">{item.percentage}%</strong>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-[#1E3A5F] transition-all" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            )) : (
              <div className="flex h-[250px] items-center justify-center text-sm text-gray-400">Belum ada data perangkat.</div>
            )}
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Pages</h2>
          <p className="mt-1 text-sm text-gray-500">Halaman dengan jumlah views tertinggi dalam 30 hari terakhir.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Page Path</th>
                <th className="px-6 py-3 font-medium">Views</th>
                <th className="px-6 py-3 font-medium">Avg. Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topPages.length > 0 ? topPages.map((page) => (
                <tr key={page.path} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{page.path}</td>
                  <td className="px-6 py-4 text-gray-600">{page.views.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-gray-600">{formatDuration(page.averageTime)}</td>
                </tr>
              )) : (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">Belum ada data performa halaman.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
