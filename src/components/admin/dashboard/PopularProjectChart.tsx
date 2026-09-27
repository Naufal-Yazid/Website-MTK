'use client';

import { cn } from '@/lib/utils';

interface ProjectData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface PopularProjectChartProps {
  data: ProjectData[];
  className?: string;
}

export function PopularProjectChart({ data, className }: PopularProjectChartProps) {
  // Sort data by count descending
  const sortedData = [...data].sort((a, b) => b.count - a.count);
  
  return (
    <div className={cn("flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm", className)}>
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Proyek Terpopuler</h3>
      
      <div className="flex flex-col gap-4">
        {sortedData.map((project) => (
          <div key={project.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{project.name}</span>
              <span className="text-gray-500 text-xs">
                {project.percentage}% <span className="text-gray-400">({project.count} leads)</span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-in-out"
                style={{ 
                  width: `${project.percentage}%`,
                  backgroundColor: project.color 
                }}
              />
            </div>
          </div>
        ))}
        
        {sortedData.length === 0 && (
          <div className="flex items-center justify-center py-8 text-sm text-gray-500">
            Belum ada data proyek
          </div>
        )}
      </div>
    </div>
  );
}
