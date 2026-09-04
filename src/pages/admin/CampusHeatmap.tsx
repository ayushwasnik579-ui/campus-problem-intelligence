import { useState } from 'react';
import { mockCampusLocations } from '../../data/mockData';
import { Map, AlertTriangle, CheckCircle2, BarChart3, X } from 'lucide-react';
import type { CampusLocation } from '../../types';

export default function CampusHeatmap() {
  const [selected, setSelected] = useState<CampusLocation | null>(null);

  const getColor = (loc: CampusLocation) => {
    if (loc.priority === 'critical') return { bg: '#ef4444', fill: 'rgba(239,68,68,0.15)', border: '#fca5a5' };
    if (loc.priority === 'high') return { bg: '#f97316', fill: 'rgba(249,115,22,0.15)', border: '#fdba74' };
    if (loc.priority === 'medium') return { bg: '#eab308', fill: 'rgba(234,179,8,0.15)', border: '#fde047' };
    return { bg: '#22c55e', fill: 'rgba(34,197,94,0.15)', border: '#86efac' };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Problem Heatmap</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Visual overview of issue density across campus locations</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 flex-wrap">
        {[
          { color: '#ef4444', label: 'Critical / High Issues' },
          { color: '#f97316', label: 'High Issues' },
          { color: '#eab308', label: 'Medium Issues' },
          { color: '#22c55e', label: 'Low Issues' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <div className="relative w-full" style={{ paddingBottom: '65%' }}>
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #eff6ff 100%)' }}>
              {/* Campus outline */}
              <rect x="3" y="3" width="94" height="94" rx="4" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />

              {/* Roads */}
              <line x1="50" y1="3" x2="50" y2="97" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1="3" y1="50" x2="97" y2="50" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1="3" y1="75" x2="97" y2="75" stroke="#e2e8f0" strokeWidth="0.8" />
              <line x1="3" y1="35" x2="97" y2="35" stroke="#e2e8f0" strokeWidth="0.8" />

              {/* Buildings */}
              {mockCampusLocations.map((loc) => {
                const colors = getColor(loc);
                return (
                  <g
                    key={loc.id}
                    onClick={() => setSelected(loc)}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      x={loc.x}
                      y={loc.y}
                      width={loc.width}
                      height={loc.height}
                      rx="2"
                      fill={colors.fill}
                      stroke={colors.border}
                      strokeWidth="0.5"
                      className="transition-all duration-200 hover:opacity-80"
                    />
                    {/* Marker */}
                    <circle
                      cx={loc.x + loc.width / 2}
                      cy={loc.y + loc.height / 2 - 2}
                      r={Math.max(2, Math.min(4, loc.totalReports / 3))}
                      fill={colors.bg}
                      opacity={0.9}
                    >
                      <animate
                        attributeName="r"
                        values={`${Math.max(2, Math.min(4, loc.totalReports / 3))};${Math.max(2.5, Math.min(5, loc.totalReports / 3 + 1))};${Math.max(2, Math.min(4, loc.totalReports / 3))}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Label */}
                    <text
                      x={loc.x + loc.width / 2}
                      y={loc.y + loc.height / 2 + 4}
                      textAnchor="middle"
                      fill="#475569"
                      fontSize="2.5"
                      fontWeight="600"
                    >
                      {loc.name}
                    </text>
                    {/* Report count */}
                    <text
                      x={loc.x + loc.width - 2}
                      y={loc.y + 4}
                      textAnchor="end"
                      fill={colors.bg}
                      fontSize="3"
                      fontWeight="bold"
                    >
                      {loc.totalReports}
                    </text>
                  </g>
                );
              })}

              {/* Title */}
              <text x="50" y="8" textAnchor="middle" fill="#94a3b8" fontSize="3" fontWeight="600">CAMPUS MAP</text>
            </svg>
          </div>
        </div>

        {/* Detail panel */}
        <div className="space-y-4">
          {selected ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selected.name}</h3>
                <button onClick={() => setSelected(null)} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <span className="text-sm text-gray-500">Total Reports</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{selected.totalReports}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <span className="text-sm text-gray-500">Most Common Issue</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{selected.commonIssue}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <span className="text-sm text-gray-500">Priority Level</span>
                  <span className={`text-sm font-bold capitalize ${
                    selected.priority === 'critical' ? 'text-red-600' :
                    selected.priority === 'high' ? 'text-orange-600' :
                    selected.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>{selected.priority}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <span className="text-sm text-gray-500">Resolution Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${selected.resolutionRate}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{selected.resolutionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-8 text-center">
              <Map className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Click a location on the map to view details</p>
            </div>
          )}

          {/* Location ranking */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Issue Density Ranking</h4>
            <div className="space-y-2">
              {[...mockCampusLocations]
                .sort((a, b) => b.totalReports - a.totalReports)
                .map((loc, i) => {
                  const colors = getColor(loc);
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setSelected(loc)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                    >
                      <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: colors.bg }} />
                      <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{loc.name}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{loc.totalReports}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
