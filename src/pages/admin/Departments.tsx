import { mockDepartments } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Building2, Users, Clock, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Departments() {
  const { state } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Departments</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Department performance and issue assignment overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockDepartments.map((dept) => (
          <div key={dept.id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{dept.name}</h3>
                <p className="text-xs text-gray-400">{dept.head}</p>
              </div>
            </div>

            {/* Performance bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Performance Score</span>
                <span className={`text-xs font-bold ${dept.performance >= 85 ? 'text-green-600' : dept.performance >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                  {dept.performance}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    dept.performance >= 85 ? 'bg-green-500' : dept.performance >= 70 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${dept.performance}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <Users className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{dept.staffCount}</p>
                  <p className="text-[10px] text-gray-400">Staff</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{dept.activeIssues}</p>
                  <p className="text-[10px] text-gray-400">Active</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{dept.resolvedIssues}</p>
                  <p className="text-[10px] text-gray-400">Resolved</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <Clock className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{dept.avgResolutionTime}d</p>
                  <p className="text-[10px] text-gray-400">Avg Time</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
