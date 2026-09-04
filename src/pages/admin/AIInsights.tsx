import { useNavigate } from 'react-router-dom';
import { Brain, Zap, Target, TrendingUp, AlertTriangle, RefreshCcw, Building2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockRecurringIssues, mockDepartments, categoryLabels } from '../../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#6366f1', '#8b5cf6', '#06b6d4', '#ec4899'];

export default function AIInsights() {
  const { state } = useApp();
  const navigate = useNavigate();

  const recurringIssueIds = new Set(mockRecurringIssues.flatMap(r => r.relatedIssueIds));
  const recurringPct = Math.round((recurringIssueIds.size / Math.max(state.issues.length, 1)) * 100 + 15);

  const categoryBreakdown = Object.entries(
    state.issues.reduce((acc, i) => { acc[i.category] = (acc[i.category] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).map(([key, value]) => ({ name: categoryLabels[key] || key, value }));

  const insights = [
    {
      icon: AlertTriangle,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      title: 'Critical Safety Concerns',
      description: `${state.issues.filter(i => i.priority === 'critical').length} critical issues detected. Fire safety equipment and lab equipment require immediate attention.`,
    },
    {
      icon: RefreshCcw,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      title: 'Pattern Detection',
      description: `AI identified ${mockRecurringIssues.length} recurring issue patterns. Wi-Fi problems (23 reports) and washroom maintenance (18 reports) are the most persistent.`,
    },
    {
      icon: Building2,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      title: 'Department Bottleneck',
      description: 'Maintenance Department has the highest active issue count (6). Consider reallocating resources or adding temporary staff.',
    },
    {
      icon: TrendingUp,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      title: 'Trend Analysis',
      description: 'Issue volume has increased by 15% over the last 3 months. Hostel-related complaints show the steepest rise.',
    },
    {
      icon: Clock,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
      title: 'Resolution Efficiency',
      description: 'Average resolution time improved from 3.2 days to 2.4 days. Security Department leads with 1.2 day average.',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary-600" />
          AI Insights
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">AI-powered analysis and intelligence from campus data</p>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-6 h-6" />
          <h2 className="text-lg font-bold">Key Intelligence</h2>
        </div>
        <p className="text-white/90 mb-2">
          AI analysis reveals that <span className="font-bold">{recurringPct}%</span> of all reported issues are recurring problems.
          Addressing just the top 3 recurring issues could reduce total complaints by an estimated <span className="font-bold">45%</span>.
        </p>
        <p className="text-white/60 text-sm">
          The AI engine has processed {state.issues.length} reports and detected {mockRecurringIssues.length} recurring patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insights */}
        <div className="lg:col-span-2 space-y-4">
          {insights.map((insight, i) => (
            <div key={i} className={`p-5 rounded-xl border border-gray-100 dark:border-slate-700 ${insight.bg}`}>
              <div className="flex items-start gap-3">
                <insight.icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{insight.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Issue Categories</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryBreakdown} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {categoryBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-4">
            {categoryBreakdown.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-gray-600 dark:text-gray-300 flex-1">{item.name}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
