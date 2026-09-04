import { useNavigate } from 'react-router-dom';
import { Brain, Activity, AlertTriangle, RefreshCcw, CheckCircle2, Clock, TrendingUp, Zap, ArrowRight, Shield, Target } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../../context/AppContext';
import PriorityScoreRing from '../../components/shared/PriorityScoreRing';
import { getCampusHealthScore } from '../../utils/aiEngine';
import { mockDepartments, mockRecurringIssues } from '../../data/mockData';

const recommendations = [
  {
    type: 'critical' as const,
    icon: AlertTriangle,
    message: 'Computer Department has unusually high network-related complaints. 14 similar reports detected in the last 30 days.',
    action: 'Inspect Computer Lab network infrastructure',
  },
  {
    type: 'warning' as const,
    icon: RefreshCcw,
    message: 'Hostel Block B has a recurring water supply issue. 7 reports filed this month with declining resolution quality.',
    action: 'Schedule Hostel Block B plumbing inspection',
  },
  {
    type: 'info' as const,
    icon: TrendingUp,
    message: 'Maintenance response time has increased by 18% this month compared to the previous month.',
    action: 'Increase maintenance staff allocation',
  },
  {
    type: 'warning' as const,
    icon: Shield,
    message: 'Fire safety equipment in Hostel Block A requires immediate replacement. Regulatory compliance at risk.',
    action: 'Conduct campus-wide fire safety audit',
  },
];

const deptPerformance = mockDepartments.map((d) => ({
  name: d.name.replace(' Department', ''),
  performance: d.performance,
  active: d.activeIssues,
  resolved: d.resolvedIssues,
}));

const radarData = [
  { subject: 'Infrastructure', A: 72, fullMark: 100 },
  { subject: 'IT Systems', A: 58, fullMark: 100 },
  { subject: 'Safety', A: 85, fullMark: 100 },
  { subject: 'Cleanliness', A: 65, fullMark: 100 },
  { subject: 'Transport', A: 78, fullMark: 100 },
  { subject: 'Electrical', A: 82, fullMark: 100 },
];

export default function AICommandCenter() {
  const { state } = useApp();
  const navigate = useNavigate();

  const healthScore = getCampusHealthScore(state.issues);
  const criticalCount = state.issues.filter((i) => i.priority === 'critical' && !['resolved', 'closed'].includes(i.status)).length;
  const recurringCount = mockRecurringIssues.length;
  const resolved = state.issues.filter((i) => ['resolved', 'closed'].includes(i.status)).length;
  const total = state.issues.length;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  const typeColors = {
    critical: 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800',
    warning: 'border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800',
    info: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800',
  };

  const typeIconColors = {
    critical: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-primary-900 to-purple-900 rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">AI Command Center</h1>
            <p className="text-sm text-white/60">Real-time campus intelligence & AI recommendations</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <PriorityScoreRing score={healthScore} size={90} strokeWidth={8} showLabel={false} />
            <p className="text-xs text-white/60 mt-2">Campus Health</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-3xl font-extrabold text-red-400">{criticalCount}</p>
            <p className="text-xs text-white/60 mt-1">Critical Issues</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-3xl font-extrabold text-amber-400">{recurringCount}</p>
            <p className="text-xs text-white/60 mt-1">Recurring Issues</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-3xl font-extrabold text-green-400">{resolutionRate}%</p>
            <p className="text-xs text-white/60 mt-1">Resolved This Month</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-3xl font-extrabold text-blue-400">2.4</p>
            <p className="text-xs text-white/60 mt-1">Avg Days to Resolve</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Recommendations</h2>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-slate-700">
          {recommendations.map((rec, i) => (
            <div key={i} className={`p-4 ${typeColors[rec.type]}`}>
              <div className="flex items-start gap-3">
                <rec.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${typeIconColors[rec.type]}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 dark:text-gray-200">{rec.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">Recommended Action:</span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{rec.action}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campus Health Radar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Campus Health by Area</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Health Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Department Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deptPerformance} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="performance" fill="#6366f1" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-600" />
          Recommended Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Inspect Computer Lab network infrastructure', dept: 'IT Department', priority: 'High', color: 'border-l-red-500' },
            { title: 'Schedule Hostel Block B plumbing inspection', dept: 'Infrastructure Dept', priority: 'High', color: 'border-l-orange-500' },
            { title: 'Increase maintenance staff allocation', dept: 'Administration', priority: 'Medium', color: 'border-l-amber-500' },
          ].map((action, i) => (
            <div key={i} className={`p-4 rounded-xl border border-gray-100 dark:border-slate-700 border-l-4 ${action.color} hover:shadow-md transition-shadow`}>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{action.title}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{action.dept}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  action.priority === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20'
                }`}>{action.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recurring Issues Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-primary-50 dark:from-purple-900/20 dark:to-primary-900/20 border border-purple-100 dark:border-purple-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">AI Insight: Recurring Issues</h3>
          </div>
          <button onClick={() => navigate('/admin/recurring')} className="text-sm text-primary-600 font-medium flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          🤖 AI detected that <span className="font-bold text-purple-600">31%</span> of reported issues are recurring problems.
          Addressing these systemic issues could reduce total complaints by an estimated <span className="font-bold text-green-600">45%</span>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {mockRecurringIssues.slice(0, 3).map((ri) => (
            <div key={ri.id} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-100 dark:border-slate-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{ri.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">{ri.reportCount} reports</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                  ri.priority === 'critical' ? 'bg-red-50 text-red-600' :
                  ri.priority === 'high' ? 'bg-orange-50 text-orange-600' : 'bg-yellow-50 text-yellow-600'
                }`}>{ri.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
