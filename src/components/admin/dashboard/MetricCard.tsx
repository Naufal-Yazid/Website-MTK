import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  href?: string;
  isLoading?: boolean;
  className?: string;
  iconClassName?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  href,
  isLoading,
  className,
  iconClassName,
}: MetricCardProps) {
  const content = (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md",
        href && "cursor-pointer hover:border-blue-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-600",
            iconClassName
          )}
        >
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-baseline gap-2">
        {isLoading ? (
          <Skeleton className="h-9 w-24" />
        ) : (
          <span className="text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </span>
        )}
      </div>

      {trend && !isLoading && (
        <div className="mt-2 flex items-center gap-1.5 text-sm">
          <span
            className={cn(
              "flex items-center gap-0.5 font-medium",
              trend.isPositive ? "text-emerald-600" : "text-rose-600"
            )}
          >
            {trend.isPositive ? (
              <ArrowUpIcon className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownIcon className="h-3.5 w-3.5" />
            )}
            {Math.abs(trend.value)}%
          </span>
          <span className="text-gray-500">{trend.label}</span>
        </div>
      )}
      
      {isLoading && trend && <Skeleton className="mt-2 h-5 w-32" />}
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }

  return content;
}
