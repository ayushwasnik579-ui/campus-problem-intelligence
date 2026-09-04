import { useNavigate } from 'react-router-dom';
import { FileText, Clock, Loader, CheckCircle2, PlusCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import { StatusBadge, SeverityBadge } from '../../components/shared/Badges';
import { categoryLabels } from '../../data/mockData';

export default function StudentDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  const myIssues = state.issues.filter((i) => i.reportedBy === state.currentUser?.id);
  const pending = myIssues.filter((i) => ['reported', 'ai_analyzed'].includes(i.status));
  const inProgress = myIssues.filter((i) => ['assigned', 'in_progress'].includes(i.status));
  const resolved = myIssues.filter((i) => ['resolved', 'closed'].includes(i.status));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {state.currentUser?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Here's an overview of your campus reports</p>
        </div>
        <button
          onClick={() => navigate('/student/report')}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          Report Problem
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Reports" value={myIssues.length} icon={<FileText className="w-5 h-5" />} color="primary" />
        <StatCard title="Pending" value={pending.length} icon={<Clock className="w-5 h-5" />} color="amber" />
        <StatCard title="In Progress" value={inProgress.length} icon={<Loader className="w-5 h-5" />} color="blue" />
        <StatCard title="Resolved" value={resolved.length} icon={<CheckCircle2 className="w-5 h-5" />} color="green" />
      </div>

      {/* Recent Reports */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Reports</h2>
          <button
            onClick={() => navigate('/student/my-reports')}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-slate-700">
          {myIssues.slice(0, 5).map((issue) => (
            <div
              key={issue.id}
              onClick={() => navigate(`/student/issue/${issue.id}`)}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-400">{issue.id}</span>
                  <SeverityBadge severity={issue.priority} />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{issue.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-400">{categoryLabels[issue.category]}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-400">{issue.building}</span>
                </div>
              </div>
              <StatusBadge status={issue.status} />
            </div>
          ))}
          {myIssues.length === 0 && (
            <div className="p-8 text-center">
              <FileText className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No reports yet. Report your first campus issue!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions + Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Issues by Category</h3>
          <div className="space-y-3">
            {Object.entries(
              state.issues.reduce((acc, i) => {
                acc[i.category] = (acc[i.category] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            )
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([cat, count]) => {
                const total = state.issues.length;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{categoryLabels[cat] || cat}</span>
                      <span className="text-xs font-semibold text-gray-500">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Resolution Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Resolution Progress</h3>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" className="text-gray-100 dark:text-slate-700" />
                <circle
                  cx="80" cy="80" r="70" fill="none" stroke="url(#gradient)" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - (resolved.length / Math.max(myIssues.length, 1)))}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {myIssues.length > 0 ? Math.round((resolved.length / myIssues.length) * 100) : 0}%
                </span>
                <span className="text-xs text-gray-400">Resolved</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20">
              <p className="text-lg font-bold text-amber-600">{pending.length}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <p className="text-lg font-bold text-blue-600">{inProgress.length}</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
              <p className="text-lg font-bold text-green-600">{resolved.length}</p>
              <p className="text-xs text-gray-500">Resolved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
