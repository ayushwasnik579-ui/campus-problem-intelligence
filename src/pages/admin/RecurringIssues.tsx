import { useNavigate } from 'react-router-dom';
import { RefreshCcw, Brain, ArrowRight, AlertTriangle, Calendar, MapPin } from 'lucide-react';
import { mockRecurringIssues, categoryLabels } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function RecurringIssues() {
  const { state } = useApp();
  const navigate = useNavigate();
  const recurringPct = Math.round((mockRecurringIssues.length / Math.max(state.issues.length, 1)) * 100 + 20);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recurring Issue Detection</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">AI-detected patterns and systemic problems</p>
      </div>

      {/* Summary banner */}
      <div className="bg-gradient-to-r from-purple-600 to-primary-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="w-6 h-6" />
          <h2 className="text-lg font-bold">Recurring Issues Detected</h2>
        </div>
        <p className="text-white/80 text-sm mb-2">
          AI detected that <span className="font-bold text-white">{recurringPct}%</span> of reported issues are recurring problems.
          These systemic issues require targeted solutions rather than individual fixes.
        </p>
        <p className="text-white/60 text-xs">{mockRecurringIssues.length} recurring patterns identified across campus</p>
      </div>

      {/* Issues list */}
      <div className="space-y-4">
        {mockRecurringIssues.map((ri, i) => (
          <div key={ri.id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                  ri.priority === 'critical' ? 'bg-red-500' :
                  ri.priority === 'high' ? 'bg-orange-500' :
                  ri.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{ri.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1"><RefreshCcw className="w-3 h-3" />{ri.reportCount} reports</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ri.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Since {new Date(ri.firstReported).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-medium">
                      {categoryLabels[ri.category]}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
                      ri.priority === 'critical' ? 'bg-red-50 text-red-600' :
                      ri.priority === 'high' ? 'bg-orange-50 text-orange-600' :
                      'bg-yellow-50 text-yellow-600'
                    }`}>{ri.priority}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => navigate(`/admin/issues?search=${encodeURIComponent(ri.title)}`)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium"
                >
                  View Reports
                </button>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium">
                  Create Task
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
