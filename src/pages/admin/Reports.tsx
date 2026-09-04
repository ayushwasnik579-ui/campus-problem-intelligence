import { FileBarChart, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categoryLabels, statusLabels } from '../../data/mockData';

export default function Reports() {
  const { state } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate and export campus issue reports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Reports table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-600">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Issue ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Priority</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Department</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
              {state.issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{issue.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[200px] truncate">{issue.title}</td>
                  <td className="px-4 py-3 text-gray-500">{categoryLabels[issue.category]}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold capitalize px-2 py-0.5 rounded-full ${
                      issue.priority === 'critical' ? 'bg-red-50 text-red-600' :
                      issue.priority === 'high' ? 'bg-orange-50 text-orange-600' :
                      issue.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                    }`}>{issue.priority}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium">{statusLabels[issue.status]}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{issue.assignedDepartment || '-'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(issue.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
