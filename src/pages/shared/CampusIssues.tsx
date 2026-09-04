import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge, SeverityBadge } from '../../components/shared/Badges';
import { categoryLabels, statusLabels } from '../../data/mockData';
import { Search, Filter, MapPin, Calendar, ThumbsUp, SlidersHorizontal, X } from 'lucide-react';
import type { IssueCategory, IssueSeverity, IssueStatus } from '../../types';

export default function CampusIssues() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const basePath = state.userRole === 'admin' ? '/admin' : '/student';

  const filtered = state.issues.filter((issue) => {
    const matchSearch = !search || issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.id.toLowerCase().includes(search.toLowerCase()) ||
      issue.location.toLowerCase().includes(search.toLowerCase()) ||
      issue.building.toLowerCase().includes(search.toLowerCase()) ||
      issue.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === 'all' || issue.category === filterCategory;
    const matchStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchPriority = filterPriority === 'all' || issue.priority === filterPriority;
    return matchSearch && matchCategory && matchStatus && matchPriority;
  });

  const hasActiveFilters = filterCategory !== 'all' || filterStatus !== 'all' || filterPriority !== 'all';

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {state.userRole === 'admin' ? 'All Issues' : 'Campus Issues'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{filtered.length} issues found</p>
        </div>
      </div>

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, title, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
            hasActiveFilters
              ? 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-900/20 dark:border-primary-700 dark:text-primary-300'
              : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
              {[filterCategory, filterStatus, filterPriority].filter(f => f !== 'all').length}
            </span>
          )}
        </button>
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 animate-slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white">
              <option value="all">All Categories</option>
              {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white">
              <option value="all">All Statuses</option>
              {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white">
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          {hasActiveFilters && (
            <button onClick={() => { setFilterCategory('all'); setFilterStatus('all'); setFilterPriority('all'); }}
              className="flex items-center gap-1 mt-3 text-xs text-primary-600 hover:text-primary-700 font-medium">
              <X className="w-3 h-3" /> Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Issues list */}
      <div className="space-y-3">
        {filtered.map((issue) => (
          <div
            key={issue.id}
            onClick={() => navigate(`${basePath}/issue/${issue.id}`)}
            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-mono text-gray-400">{issue.id}</span>
                  <SeverityBadge severity={issue.priority} />
                  <StatusBadge status={issue.status} />
                  {issue.aiAnalysis?.isRecurring && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 font-medium">🔄 Recurring</span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{issue.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{issue.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{issue.building}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(issue.createdAt).toLocaleDateString()}</span>
                  {issue.assignedDepartment && (
                    <span className="text-primary-500 font-medium">{issue.assignedDepartment}</span>
                  )}
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{issue.upvotes}</span>
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
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">No issues match your search criteria</div>
        )}
      </div>
    </div>
  );
}
