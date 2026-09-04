import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Send, CheckCircle2, Brain, MapPin, Building, AlertTriangle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { analyzeReport, generateIssueId } from '../../utils/aiEngine';
import PriorityScoreRing from '../../components/shared/PriorityScoreRing';
import type { IssueCategory, IssueSeverity, ReportFormData, Issue, AIAnalysis } from '../../types';
import { categoryLabels } from '../../data/mockData';

const categories: { value: IssueCategory; label: string }[] = [
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'electricity', label: 'Electricity' },
  { value: 'water', label: 'Water' },
  { value: 'cleanliness', label: 'Cleanliness' },
  { value: 'wifi_internet', label: 'Wi-Fi/Internet' },
  { value: 'classroom', label: 'Classroom' },
  { value: 'laboratory', label: 'Laboratory' },
  { value: 'security', label: 'Security' },
  { value: 'transport', label: 'Transport' },
  { value: 'other', label: 'Other' },
];

const buildings = [
  'Main Building', 'Computer Department', 'Library', 'Hostel', 'Canteen',
  'Parking', 'Laboratory', 'Sports Ground', 'Engineering Block', 'Administration Block',
];

export default function ReportProblem() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    description: '',
    category: 'infrastructure',
    location: '',
    building: '',
    prioritySuggestion: 'medium',
    isAnonymous: false,
  });

  const [step, setStep] = useState<'form' | 'analyzing' | 'result'>('form');
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [issueId, setIssueId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.location || !formData.building) return;

    setStep('analyzing');
    const id = generateIssueId();
    setIssueId(id);

    // Simulate AI analysis delay
    setTimeout(() => {
      const result = analyzeReport(formData, state.issues);
      setAnalysis(result);

      const newIssue: Issue = {
        id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        building: formData.building,
        status: 'ai_analyzed',
        priority: result.severity,
        reportedBy: state.currentUser?.id || 'unknown',
        reporterName: formData.isAnonymous ? 'Anonymous' : (state.currentUser?.name || 'Unknown'),
        isAnonymous: formData.isAnonymous,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        upvotes: 0,
        aiAnalysis: result,
        assignedDepartment: result.suggestedDepartment,
        timeline: [
          {
            id: 't1',
            status: 'reported',
            timestamp: new Date().toISOString(),
            description: `Issue reported by ${formData.isAnonymous ? 'Anonymous' : state.currentUser?.name}`,
          },
          {
            id: 't2',
            status: 'ai_analyzed',
            timestamp: new Date().toISOString(),
            description: `AI analysis completed. Priority: ${result.severity.toUpperCase()} (${result.priorityScore}/100)`,
          },
        ],
      };

      dispatch({ type: 'ADD_ISSUE', payload: newIssue });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: `n-${Date.now()}`,
          type: 'info',
          title: 'Report Submitted',
          message: `Your report "${formData.title}" has been submitted and analyzed. Issue ID: ${id}`,
          timestamp: new Date().toISOString(),
          read: false,
          issueId: id,
        },
      });

      setStep('result');
    }, 2500);
  };

  if (step === 'analyzing') {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary-100 dark:border-primary-900/30" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary-600 animate-spin" />
            <Brain className="absolute inset-0 m-auto w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Analyzing Your Report</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Our AI is categorizing, calculating priority, and detecting similar issues...
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Categorizing</span>
            <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Assessing Severity</span>
            <span className="flex items-center gap-1"><Building className="w-3 h-3" /> Finding Department</span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result' && analysis) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Success banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-green-800 dark:text-green-200">Your problem has been successfully reported!</h2>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                Issue ID: <span className="font-mono font-bold">{issueId}</span>
              </p>
              <p className="text-sm text-green-600 dark:text-green-300 mt-0.5">
                AI analysis has been completed and the issue has been routed to the appropriate department.
              </p>
            </div>
          </div>
        </div>

        {/* AI Analysis Result */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Analysis Report</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Priority Score */}
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Priority Score</p>
                <PriorityScoreRing score={analysis.priorityScore} size={140} />
                <p className="text-xs text-gray-400 mt-2">{analysis.priorityScore}/100</p>
              </div>

              {/* Analysis details */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">AI Category</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{analysis.predictedCategory}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Severity</p>
                    <p className={`text-sm font-semibold capitalize ${
                      analysis.severity === 'critical' ? 'text-red-600' :
                      analysis.severity === 'high' ? 'text-orange-600' :
                      analysis.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{analysis.severity}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Recurring Issue</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {analysis.isRecurring ? '🔴 Yes' : '🟢 No'}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Similar Reports</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{analysis.similarReportsCount}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Assigned Department</p>
                    <p className="text-sm font-semibold text-primary-600">{analysis.suggestedDepartment}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Affected Students</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">~{analysis.affectedStudents}</p>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">💡 Suggested Action</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{analysis.suggestedAction}</p>
                </div>
              </div>
            </div>

            {/* Priority factors */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Priority Score Breakdown</p>
              <div className="space-y-2">
                {analysis.factors.map((factor) => (
                  <div key={factor.name} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-28 flex-shrink-0">{factor.name}</span>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                        style={{ width: `${factor.value}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 w-8 text-right">{factor.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/student/my-reports')}
            className="flex-1 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            View My Reports
          </button>
          <button
            onClick={() => {
              setStep('form');
              setFormData({ title: '', description: '', category: 'infrastructure', location: '', building: '', prioritySuggestion: 'medium', isAnonymous: false });
            }}
            className="flex-1 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Report a Problem</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Describe the campus issue and our AI will analyze and route it</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Problem Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Wi-Fi not working in Computer Lab 2"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide detailed description of the problem..."
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as IssueCategory })}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Building */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Building/Block *</label>
            <select
              value={formData.building}
              onChange={(e) => setFormData({ ...formData, building: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
            >
              <option value="">Select building</option>
              {buildings.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
              <MapPin className="inline w-3.5 h-3.5 mr-1" />
              Specific Location *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Room 301, 2nd Floor Corridor"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
            />
          </div>

          {/* Priority suggestion */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Priority Suggestion</label>
            <select
              value={formData.prioritySuggestion}
              onChange={(e) => setFormData({ ...formData, prioritySuggestion: e.target.value as IssueSeverity })}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Upload Image (optional)</label>
          <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-xl cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
            <Upload className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">Click to upload or drag image here</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] })} />
          </label>
          {formData.imageFile && (
            <p className="text-xs text-green-600 mt-1">📎 {formData.imageFile.name}</p>
          )}
        </div>

        {/* Anonymous */}
        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isAnonymous}
            onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <div className="flex items-center gap-2">
            {formData.isAnonymous ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
            <span className="text-sm text-gray-600 dark:text-gray-300">Submit anonymously</span>
          </div>
        </label>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all"
        >
          <Send className="w-4 h-4" />
          Submit Report
        </button>
      </form>
    </div>
  );
}
