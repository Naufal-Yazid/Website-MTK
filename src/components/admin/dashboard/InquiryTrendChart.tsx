'use client';

import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';

interface InquiryTrendChartProps {
  data: {
    date: string;
    count: number;
    fullDate?: string;
    rawDate: string;
  }[];
  className?: string;
}

type FilterType = '7 Hari' | '30 Hari' | '1 Tahun';

export function InquiryTrendChart({ data, className }: InquiryTrendChartProps) {
  const [filter, setFilter] = useState<FilterType>('30 Hari');

  const displayData = useMemo(() => {
    const days = filter === '7 Hari' ? 7 : filter === '30 Hari' ? 30 : 365;
    return data.slice(-days);
  }, [data, filter]);

  return (
    <div className={cn("flex flex-col space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm", className)}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Tren Inquiry</h3>
        <div className="flex items-center space-x-1 rounded-lg border border-gray-200 bg-gray-50/50 p-1">
          {(['7 Hari', '30 Hari', '1 Tahun'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                filter === f
                  ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B5EAA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0B5EAA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                      <div className="grid gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-gray-500">
                            {payload[0].payload.fullDate || payload[0].payload.date}
                          </span>
                          <span className="font-bold text-gray-900">
                            {payload[0].value} Inquiries
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#0B5EAA"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCount)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
