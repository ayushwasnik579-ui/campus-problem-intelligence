import { useNavigate } from 'react-router-dom';
import { FileText, AlertTriangle, Clock, CheckCircle2, TrendingUp, ArrowRight, Brain, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { useApp } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import { StatusBadge, SeverityBadge } from '../../components/shared/Badges';
import { categoryLabels } from '../../data/mockData';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e', '#06b6d4', '#f97316', '#ef4444', '#3b82f6', '#14b8a6'];

export default function AdminDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  const total = state.issues.length;
  const open = state.issues.filter((i) => !['resolved', 'closed'].includes(i.status)).length;
  const critical = state.issues.filter((i) => i.priority === 'critical' && !['resolved', 'closed'].includes(i.status)).length;
  const resolved = state.issues.filter((i) => ['resolved', 'closed'].includes(i.status)).length;

  // Category chart data
  const categoryData = Object.entries(
    state.issues.reduce((acc, i) => { acc[i.category] = (acc[i.category] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).map(([key, value]) => ({ name: categoryLabels[key] || key, value })).sort((a, b) => b.value - a.value);

  // Status distribution
  const statusData = Object.entries(
    state.issues.reduce((acc, i) => { acc[i.status] = (acc[i.status] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).map(([key, value]) => ({ name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()), value }));

  // Issues over time (simulated)
  const timeData = [
    { month: 'Apr', issues: 42, resolved: 38 },
    { month: 'May', issues: 56, resolved: 48 },
    { month: 'Jun', issues: 64, resolved: 55 },
    { month: 'Jul', issues: 78, resolved: 65 },
    { month: 'Aug', issues: 85, resolved: 72 },
    { month: 'Sep', issues: total, resolved },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Campus Problem Intelligence Dashboard</p>
        </div>
        <button
          onClick={() => navigate('/admin/ai-command')}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          <Brain className="w-4 h-4" />
          AI Command Center
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Issues" value={total} icon={<FileText className="w-5 h-5" />} color="primary" trend={{ value: 12, label: 'this month' }} />
        <StatCard title="Open Issues" value={open} icon={<Clock className="w-5 h-5" />} color="amber" />
        <StatCard title="Critical Issues" value={critical} icon={<AlertTriangle className="w-5 h-5" />} color="red" />
        <StatCard title="Resolved" value={resolved} icon={<CheckCircle2 className="w-5 h-5" />} color="green" trend={{ value: 8, label: 'vs last month' }} />
        <StatCard title="Avg Resolution" value="2.4 Days" icon={<TrendingUp className="w-5 h-5" />} color="blue" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by category */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Issues by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={3} label={({ name, value }) => `${name} (${value})`}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Issues over time */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Issues Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="issues" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="resolved" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent critical issues */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-700">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Recent Critical Issues</h3>
          <button onClick={() => navigate('/admin/issues')} className="text-sm text-primary-600 font-medium flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-slate-700">
          {state.issues
            .filter((i) => i.priority === 'critical' || i.priority === 'high')
            .slice(0, 5)
            .map((issue) => (
              <div
                key={issue.id}
                onClick={() => navigate(`/admin/issue/${issue.id}`)}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${
                  issue.aiAnalysis && issue.aiAnalysis.priorityScore >= 85 ? 'bg-red-500' : 'bg-orange-500'
                }`}>
                  {issue.aiAnalysis?.priorityScore || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{issue.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{issue.building}</span>
                    <StatusBadge status={issue.status} />
                  </div>
                </div>
                <SeverityBadge severity={issue.priority} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
