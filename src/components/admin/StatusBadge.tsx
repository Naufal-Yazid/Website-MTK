import { cn } from "@/lib/utils";

export type InquiryStatus = 'baru' | 'diproses' | 'sudah_dihubungi' | 'batal';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: InquiryStatus;
}

const statusConfig: Record<InquiryStatus, { label: string; className: string }> = {
  baru: {
    label: 'Baru',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  diproses: {
    label: 'Diproses',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  sudah_dihubungi: {
    label: 'Sudah Dihubungi',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  batal: {
    label: 'Batal',
    className: 'bg-rose-50 text-rose-700 border-rose-200',
  },
};

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const config = statusConfig[status];

  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
      {...props}
    >
      {config.label}
    </span>
  );
}
