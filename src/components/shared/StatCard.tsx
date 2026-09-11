import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: number; label: string };
  color?: string;
  className?: string;
}

export default function StatCard({ title, value, subtitle, icon, trend, color = 'primary', className = '' }: StatCardProps) {
  const colorMap: Record<string, string> = {
    primary: 'from-cyan-500 to-indigo-600',
    green: 'from-emerald-500 to-teal-600',
    amber: 'from-amber-500 to-orange-600',
    red: 'from-rose-500 to-red-600',
    blue: 'from-sky-500 to-blue-600',
    purple: 'from-purple-500 to-indigo-600',
    indigo: 'from-indigo-500 to-purple-600',
  };

  return (
    <div className={`cyber-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-mono tracking-wider uppercase text-slate-400">{title}</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${trend.value >= 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-slate-400">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[color]} text-slate-950 font-bold shadow-lg shadow-cyan-500/10`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface MiniStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export function MiniStatCard({ title, value, icon, color }: MiniStatCardProps) {
  const bgMap: Record<string, string> = {
    primary: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    green: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    amber: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    red: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    blue: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
  };

  return (
    <div className="cyber-card rounded-xl p-4 hover:border-cyan-500/40 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${bgMap[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-xl font-bold text-white">{value}</p>
          <p className="text-xs text-slate-400 font-mono">{title}</p>
        </div>
      </div>
    </div>
  );
}
