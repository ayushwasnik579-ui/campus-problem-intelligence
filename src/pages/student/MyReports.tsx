import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge, SeverityBadge } from '../../components/shared/Badges';
import { categoryLabels } from '../../data/mockData';
import { FileText, Calendar, MapPin } from 'lucide-react';

export default function MyReports() {
  const { state } = useApp();
  const navigate = useNavigate();
  const myIssues = state.issues.filter((i) => i.reportedBy === state.currentUser?.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reports</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{myIssues.length} reports submitted</p>
      </div>

      <div className="space-y-3">
        {myIssues.map((issue) => (
          <div
            key={issue.id}
            onClick={() => navigate(`/student/issue/${issue.id}`)}
            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-mono text-gray-400">{issue.id}</span>
                  <SeverityBadge severity={issue.priority} />
                  <StatusBadge status={issue.status} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{issue.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{issue.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{issue.building} · {issue.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              {issue.aiAnalysis && (
                <div className="text-center flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    issue.aiAnalysis.priorityScore >= 85 ? 'bg-red-500' :
                    issue.aiAnalysis.priorityScore >= 65 ? 'bg-orange-500' :
                    issue.aiAnalysis.priorityScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                    {issue.aiAnalysis.priorityScore}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">AI Score</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {myIssues.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No reports yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
