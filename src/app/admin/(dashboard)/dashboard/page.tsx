import { createClient } from '@/lib/supabase/server';
import { startOfMonth } from 'date-fns';
import { Globe2, MousePointerClick, Users } from 'lucide-react';
import { getAnalyticsSummarySafe } from '@/lib/google-analytics';

import { MetricCard } from '@/components/admin/dashboard/MetricCard';
import { VisitorTrendChart } from '@/components/admin/dashboard/VisitorTrendChart';
import { PopularProjectChart } from '@/components/admin/dashboard/PopularProjectChart';
import { RecentMessagesTable } from '@/components/admin/dashboard/RecentMessagesTable';
import { RealtimeListener } from '@/components/admin/dashboard/RealtimeListener';

export const metadata = {
  title: 'Dashboard | MTK Admin',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now).toISOString();
  const [analytics, waResult, projectsResult, recentResult] = await Promise.all([
    getAnalyticsSummarySafe(),
    supabase.from('wa_click_logs').select('*', { count: 'exact', head: true }).gte('clicked_at', startOfCurrentMonth),
    supabase.from('inquiries').select('selected_project'),
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(10),
  ]);

  const waClicks = waResult.count || 0;

  const popularProjectsData = projectsResult.data;
    
  const projectCounts = (popularProjectsData || []).reduce((acc: Record<string, number>, curr) => {
    if (curr.selected_project) {
      acc[curr.selected_project] = (acc[curr.selected_project] || 0) + 1;
    }
    return acc;
  }, {});

  const totalProjects = Object.values(projectCounts).reduce((a, b) => a + b, 0);
  const projectColors = ['#0B5EAA', '#1E3A5F', '#38bdf8', '#fbbf24', '#f87171'];
  
  const popularProjects = Object.entries(projectCounts).map(([name, count], index) => ({
    name,
    count,
    percentage: totalProjects ? Math.round((count / totalProjects) * 100) : 0,
    color: projectColors[index % projectColors.length],
  }));

  return (
    <div className="space-y-6">
      <RealtimeListener />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Ringkasan performa website dan aktivitas terbaru.</p>
      </div>

      {/* Bento Grid - Row 1 */}
      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard
          title="Total Visitors (30 Hari)"
          value={analytics?.totalSessions || 0}
          icon={<Globe2 className="h-5 w-5" />}
          iconClassName="bg-teal-50 text-teal-600"
        />
        <MetricCard
          title="Unique Visitors (30 Hari)"
          value={analytics?.uniqueVisitors || 0}
          icon={<Users className="h-5 w-5" />}
          href="/admin/analytics"
          iconClassName="bg-cyan-50 text-cyan-600"
        />
        <MetricCard
          title="Klik WhatsApp (Bulan Ini)"
          value={waClicks}
          icon={<MousePointerClick className="h-5 w-5" />}
          iconClassName="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Bento Grid - Row 2 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VisitorTrendChart data={analytics?.trafficByDate || []} className="h-full" />
        </div>
        <div className="lg:col-span-1">
          <PopularProjectChart data={popularProjects} className="h-full" />
        </div>
      </div>

      {/* Bento Grid - Row 3 */}
      <div>
        <RecentMessagesTable inquiries={recentResult.data || []} />
      </div>
    </div>
  );
}
