import { useNavigate } from 'react-router-dom';
import {
  Activity, Brain, BarChart3, Building2, CheckCircle2, Clock,
  FileText, ArrowRight, Zap, RefreshCcw, Target, TrendingUp,
  Shield, Users, ChevronRight, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const features = [
  { icon: FileText, title: 'Smart Problem Reporting', description: 'Easily report campus issues with detailed forms, image uploads, and anonymous reporting options.' },
  { icon: Brain, title: 'AI Issue Detection', description: 'Advanced AI analyzes reports to categorize, assess severity, and identify critical patterns.' },
  { icon: RefreshCcw, title: 'Recurring Issue Analysis', description: 'Automatically detects recurring problems and alerts administration for systemic fixes.' },
  { icon: Target, title: 'Automatic Prioritization', description: 'AI-powered priority scoring considers severity, frequency, and impact on students.' },
  { icon: Building2, title: 'Department Assignment', description: 'Intelligent routing assigns issues to the right department automatically.' },
  { icon: CheckCircle2, title: 'Resolution Tracking', description: 'Track every issue from report to resolution with real-time status updates.' },
];

const stats = [
  { value: '2,847', label: 'Problems Reported', icon: FileText },
  { value: '2,391', label: 'Problems Resolved', icon: CheckCircle2 },
  { value: '186', label: 'Recurring Issues Detected', icon: RefreshCcw },
  { value: '2.4 Days', label: 'Avg Resolution Time', icon: Clock },
];

const flowSteps = [
  { icon: FileText, label: 'Student Report', color: 'from-blue-500 to-blue-600' },
  { icon: Brain, label: 'AI Analysis', color: 'from-purple-500 to-purple-600' },
  { icon: Target, label: 'Priority Detection', color: 'from-orange-500 to-orange-600' },
  { icon: Building2, label: 'Dept Assignment', color: 'from-indigo-500 to-indigo-600' },
  { icon: CheckCircle2, label: 'Resolution', color: 'from-green-500 to-green-600' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { state } = useApp();

  const handleNavigate = (path: string) => {
    if (state.currentUser) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Campus<span className="text-primary-600">IQ</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-950/20 dark:to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">AI-Powered Campus Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Make Your Campus{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-primary-600">
              Smarter
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Students report campus problems and our AI helps institutions identify, prioritize,
            and resolve recurring issues — transforming complaints into actionable intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleNavigate('/student/report')}
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5 text-base"
            >
              <FileText className="w-5 h-5" />
              Report a Problem
            </button>
            <button
              onClick={() => handleNavigate('/admin')}
              className="flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all hover:-translate-y-0.5 text-base"
            >
              <BarChart3 className="w-5 h-5" />
              View Dashboard
            </button>
          </div>

          <p className="text-sm text-gray-400 dark:text-gray-500 mt-4 italic">
            "Report. Analyze. Resolve."
          </p>
        </div>
      </section>

      {/* Flow visualization */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">How CampusIQ Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2">
            {flowSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-2">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center whitespace-nowrap">{step.label}</span>
                </div>
                {i < flowSteps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 hidden md:block mt-[-20px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Powerful Features</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to transform campus problem management with intelligent automation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-white mb-12">Platform Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <p className="text-3xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Make Your Campus Smarter?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join the platform that converts unstructured student complaints into actionable intelligence for campus administrators.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5 text-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary-600" />
            <span className="font-bold text-gray-900 dark:text-white">Campus<span className="text-primary-600">IQ</span></span>
            <span className="text-sm text-gray-400 ml-2">© 2026</span>
          </div>
          <p className="text-sm text-gray-400">Campus Problem Intelligence Platform · Built for Smart Institutions</p>
        </div>
      </footer>
    </div>
  );
}
