import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { useApp } from '../../context/AppContext';
import { categoryLabels, mockDepartments } from '../../data/mockData';
import { BarChart3, TrendingUp, Clock, MapPin, RefreshCcw, Building2 } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e', '#06b6d4', '#f97316', '#ef4444', '#3b82f6', '#14b8a6'];

export default function Analytics() {
  const { state } = useApp();
  const total = state.issues.length;
  const resolved = state.issues.filter((i) => ['resolved', 'closed'].includes(i.status)).length;
  const resolutionPct = total > 0 ? Math.round((resolved / total) * 100) : 0;

  const categoryData = Object.entries(
    state.issues.reduce((acc, i) => { acc[i.category] = (acc[i.category] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).map(([key, value]) => ({ name: categoryLabels[key] || key, value })).sort((a, b) => b.value - a.value);

  const priorityData = [
    { name: 'Critical', value: state.issues.filter(i => i.priority === 'critical').length, color: '#ef4444' },
    { name: 'High', value: state.issues.filter(i => i.priority === 'high').length, color: '#f97316' },
    { name: 'Medium', value: state.issues.filter(i => i.priority === 'medium').length, color: '#eab308' },
    { name: 'Low', value: state.issues.filter(i => i.priority === 'low').length, color: '#22c55e' },
  ];

  const monthlyData = [
    { month: 'Apr', reported: 42, resolved: 38 },
    { month: 'May', reported: 56, resolved: 48 },
    { month: 'Jun', reported: 64, resolved: 55 },
    { month: 'Jul', reported: 78, resolved: 65 },
    { month: 'Aug', reported: 85, resolved: 72 },
    { month: 'Sep', reported: total, resolved },
  ];

  const locationData = [
    { name: 'Hostel', issues: 15 },
    { name: 'Computer Dept', issues: 12 },
    { name: 'Main Building', issues: 8 },
    { name: 'Canteen', issues: 6 },
    { name: 'Library', issues: 5 },
    { name: 'Parking', issues: 4 },
    { name: 'Laboratory', issues: 3 },
    { name: 'Sports', issues: 2 },
  ];

  const deptData = mockDepartments.map(d => ({
    name: d.name.replace(' Department', ''),
    resolved: d.resolvedIssues,
    active: d.activeIssues,
    performance: d.performance,
  }));

  const resolutionTimeData = [
    { month: 'Apr', days: 3.2 },
    { month: 'May', days: 2.9 },
    { month: 'Jun', days: 2.7 },
    { month: 'Jul', days: 2.5 },
    { month: 'Aug', days: 2.4 },
    { month: 'Sep', days: 2.4 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Comprehensive campus issue analytics and insights</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Reports', value: total, icon: BarChart3 },
          { label: 'Resolution %', value: `${resolutionPct}%`, icon: TrendingUp },
          { label: 'Avg Resolution', value: '2.4 days', icon: Clock },
          { label: 'Top Location', value: 'Hostel', icon: MapPin },
          { label: 'Top Category', value: categoryData[0]?.name || '-', icon: Building2 },
          { label: 'Recurring %', value: '31%', icon: RefreshCcw },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 text-center">
            <stat.icon className="w-5 h-5 text-primary-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues over time */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Issues Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="reported" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} name="Reported" />
              <Area type="monotone" dataKey="resolved" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Priority distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={priorityData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={3} label={({ name, value }) => `${name} (${value})`}>
                {priorityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Most problematic locations */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Most Problematic Locations</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="issues" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Categories */}
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

        {/* Department performance */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Department Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="resolved" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} name="Resolved" />
              <Bar dataKey="active" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Active" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resolution time trend */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Avg Resolution Time (Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={resolutionTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="days" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: '#6366f1' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
