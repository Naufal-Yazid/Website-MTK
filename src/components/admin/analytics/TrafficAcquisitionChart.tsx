'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type TrafficPoint = { date: string; sessions: number; visitors: number };

function formatDate(value: string) {
  if (value.length !== 8) return value;
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

function formatFullDate(value: string) {
  if (value.length !== 8) return value;
  const date = new Date(Number(value.slice(0, 4)), Number(value.slice(4, 6)) - 1, Number(value.slice(6, 8)));
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function TrafficAcquisitionChart({ data }: { data: TrafficPoint[] }) {
  const displayData = data.slice(-30);

  if (!displayData.some((item) => item.sessions > 0 || item.visitors > 0)) {
    return (
      <div className="flex h-[330px] items-center justify-center text-center">
        <div>
          <p className="text-sm font-medium text-gray-600">Belum ada data traffic</p>
          <p className="mt-1 text-xs text-gray-400">Hubungkan GA4 untuk menampilkan acquisition chart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[330px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={displayData} margin={{ top: 15, right: 10, left: -18, bottom: 5 }}>
          <defs>
            <linearGradient id="analyticsSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2CB3AA" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#2CB3AA" stopOpacity={0.04} />
            </linearGradient>
            <linearGradient id="analyticsVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#153757" stopOpacity={0.38} />
              <stop offset="95%" stopColor="#153757" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="4 5" />
          <XAxis dataKey="date" interval={6} tickFormatter={formatDate} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
          <Tooltip
            labelFormatter={(label) => formatFullDate(String(label))}
            contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 8px 20px rgba(15,23,42,.08)' }}
            cursor={{ stroke: '#0B5EAA', strokeWidth: 1.5 }}
          />
          <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#2CB3AA" strokeWidth={2.5} fill="url(#analyticsSessions)" activeDot={{ r: 5 }} />
          <Area type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#153757" strokeWidth={2.5} fill="url(#analyticsVisitors)" activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
