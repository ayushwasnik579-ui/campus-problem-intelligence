import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PriorityScoreRing from '../../components/shared/PriorityScoreRing';
import { StatusBadge, SeverityBadge } from '../../components/shared/Badges';
import { categoryLabels, statusLabels } from '../../data/mockData';
import type { IssueStatus } from '../../types';
import {
  ArrowLeft, Brain, MapPin, Calendar, User, Building2, ThumbsUp,
  Clock, CheckCircle2, AlertTriangle, Loader, FileText, ChevronRight
} from 'lucide-react';

const statusOrder: IssueStatus[] = ['reported', 'ai_analyzed', 'assigned', 'in_progress', 'resolved', 'closed'];

const statusIcons: Record<string, typeof CheckCircle2> = {
  reported: FileText,
  ai_analyzed: Brain,
  assigned: Building2,
  in_progress: Loader,
  resolved: CheckCircle2,
  closed: CheckCircle2,
};

export default function IssueDetails() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const issue = state.issues.find((i) => i.id === id);
  const isAdmin = state.userRole === 'admin' || state.userRole === 'staff';

  if (!issue) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Issue not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary-600 font-medium">Go Back</button>
      </div>
    );
  }

  const currentStatusIndex = statusOrder.indexOf(issue.status);

  const handleStatusUpdate = (newStatus: IssueStatus) => {
    const now = new Date().toISOString();
    dispatch({
      type: 'UPDATE_ISSUE',
      payload: {
        id: issue.id,
        updates: {
          status: newStatus,
          updatedAt: now,
          timeline: [
            ...issue.timeline,
            {
              id: `t-${Date.now()}`,
              status: newStatus,
              timestamp: now,
              description: `Status updated to ${statusLabels[newStatus]} by ${state.currentUser?.name}`,
              user: state.currentUser?.name,
            },
          ],
        },
      },
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `n-${Date.now()}`,
        type: newStatus === 'resolved' ? 'success' : 'info',
        title: newStatus === 'resolved' ? 'Issue Resolved' : 'Status Updated',
        message: `Issue "${issue.title}" status changed to ${statusLabels[newStatus]}`,
        timestamp: now,
        read: false,
        issueId: issue.id,
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-sm font-mono text-gray-400">{issue.id}</span>
              <SeverityBadge severity={issue.priority} />
              <StatusBadge status={issue.status} />
              {issue.aiAnalysis?.isRecurring && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 font-medium">🔄 Recurring</span>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{issue.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{issue.description}</p>
            <div className="flex items-center gap-5 mt-4 text-sm text-gray-400 flex-wrap">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{issue.building} · {issue.location}</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{issue.isAnonymous ? 'Anonymous' : issue.reporterName}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(issue.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" />{issue.upvotes} upvotes</span>
            </div>
          </div>
        </div>

        {/* Admin status controls */}
        {isAdmin && issue.status !== 'closed' && (
          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-slate-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {statusOrder
                .filter((_, i) => i > currentStatusIndex)
                .map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusUpdate(s)}
                    className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    Mark as {statusLabels[s]}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Analysis */}
        {issue.aiAnalysis && (
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">AI Analysis</h3>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="flex items-center gap-4">
                  <PriorityScoreRing score={issue.aiAnalysis.priorityScore} size={80} strokeWidth={8} showLabel={false} />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{issue.aiAnalysis.priorityScore}/100</p>
                    <p className={`text-sm font-semibold capitalize ${
                      issue.aiAnalysis.severity === 'critical' ? 'text-red-600' :
                      issue.aiAnalysis.severity === 'high' ? 'text-orange-600' :
                      issue.aiAnalysis.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{issue.aiAnalysis.severity} Priority</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium text-gray-900 dark:text-white">{issue.aiAnalysis.predictedCategory}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Similar Reports</span>
                    <span className="font-medium text-gray-900 dark:text-white">{issue.aiAnalysis.similarReportsCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Affected</span>
                    <span className="font-medium text-gray-900 dark:text-white">~{issue.aiAnalysis.affectedStudents} students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Department</span>
                    <span className="font-medium text-primary-600">{issue.aiAnalysis.suggestedDepartment}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 mb-4">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">💡 Suggested Action</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">{issue.aiAnalysis.suggestedAction}</p>
              </div>

              {/* Factor bars */}
              <div className="space-y-2">
                {issue.aiAnalysis.factors.map((f) => (
                  <div key={f.name} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-24 flex-shrink-0">{f.name}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style={{ width: `${f.value}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 w-6 text-right">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-slate-700">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" /> Timeline
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-0">
              {issue.timeline.map((event, i) => {
                const Icon = statusIcons[event.status] || FileText;
                return (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        i === issue.timeline.length - 1 ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30' : 'bg-gray-100 text-gray-400 dark:bg-slate-700'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {i < issue.timeline.length - 1 && (
                        <div className="w-0.5 h-10 bg-gray-200 dark:bg-slate-600 my-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{statusLabels[event.status]}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{event.description}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(event.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Info cards */}
      {!issue.aiAnalysis && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">AI analysis is pending for this issue</p>
          </div>
        </div>
      )}
    </div>
  );
}
