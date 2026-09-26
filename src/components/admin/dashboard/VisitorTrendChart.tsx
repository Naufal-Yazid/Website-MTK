'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisitorTrendChartProps {
  data: { date: string; sessions: number; visitors: number }[];
  className?: string;
}

type FilterType = '7 Hari' | '30 Hari' | '1 Tahun';

function formatDate(value: string) {
  if (value.length !== 8) return value;
  return `${value.slice(6, 8)}/${value.slice(4, 6)}`;
}

function formatFullDate(value: string) {
  if (value.length !== 8) return value;
  const date = new Date(Number(value.slice(0, 4)), Number(value.slice(4, 6)) - 1, Number(value.slice(6, 8)));
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function VisitorTrendChart({ data, className }: VisitorTrendChartProps) {
  const [filter, setFilter] = useState<FilterType>('30 Hari');
  const displayData = useMemo(() => {
    const days = filter === '7 Hari' ? 7 : filter === '30 Hari' ? 30 : 365;
    return data.slice(-days);
  }, [data, filter]);
  const hasData = displayData.some((item) => item.sessions > 0 || item.visitors > 0);
  const tickInterval = filter === '7 Hari' ? 0 : filter === '30 Hari' ? 6 : 29;

  return (
    <div className={cn('flex flex-col space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm', className)}>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Tren Visitor Website</h3>
          <p className="mt-1 text-sm text-gray-500">Data sessions dan unique visitors dari Google Analytics.</p>
        </div>
        <div className="flex items-center space-x-1 rounded-lg border border-gray-200 bg-gray-50/50 p-1">
          {(['7 Hari', '30 Hari', '1 Tahun'] as FilterType[]).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-all',
                filter === item
                  ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        {!hasData ? (
          <div className="flex h-full flex-col items-center justify-center rounded-lg bg-gray-50/60 text-center">
            <BarChart3 className="mb-3 h-9 w-9 text-gray-300" />
            <p className="text-sm font-medium text-gray-600">Belum ada data visitor</p>
            <p className="mt-1 text-xs text-gray-400">Data akan muncul setelah Google Analytics terhubung.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sessionFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2CB3AA" stopOpacity={0.38} />
                  <stop offset="95%" stopColor="#2CB3AA" stopOpacity={0.03} />
                </linearGradient>
                <linearGradient id="visitorFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.24} />
                  <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#dbe4ee" strokeDasharray="5 6" />
              <XAxis dataKey="date" interval={tickInterval} tickFormatter={formatDate} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip
                labelFormatter={(label) => formatFullDate(String(label))}
                contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 8px 20px rgba(15,23,42,.08)' }}
                cursor={{ stroke: '#0B5EAA', strokeWidth: 1.5 }}
              />
              <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#2CB3AA" strokeWidth={2.5} fill="url(#sessionFill)" activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#1E3A5F" strokeWidth={2.5} fill="url(#visitorFill)" activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
