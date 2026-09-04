import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, GraduationCap, Shield, Wrench, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

const roles: { role: UserRole; icon: typeof GraduationCap; title: string; description: string; color: string }[] = [
  { role: 'student', icon: GraduationCap, title: 'Student', description: 'Report campus problems and track their resolution', color: 'from-blue-500 to-blue-600' },
  { role: 'staff', icon: Wrench, title: 'Department Staff', description: 'Manage assigned issues and update resolution status', color: 'from-amber-500 to-amber-600' },
  { role: 'admin', icon: Shield, title: 'Administrator', description: 'Full dashboard access with AI insights and analytics', color: 'from-primary-500 to-primary-600' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleLogin = () => {
    if (!selectedRole) return;
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: 'LOGIN', payload: { role: selectedRole } });
      navigate(selectedRole === 'student' ? '/student' : '/admin');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50/30 to-slate-50 dark:from-slate-950 dark:via-primary-950/20 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xl shadow-primary-500/25">
              <Activity className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Campus<span className="text-primary-600">IQ</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Campus Problem Intelligence</p>
        </div>

        {/* Login card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Select your role to continue</p>

          <div className="space-y-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.role}
                onClick={() => setSelectedRole(r.role)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200
                  ${selectedRole === r.role
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                    : 'border-gray-200 dark:border-slate-600 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white shadow-lg`}>
                  <r.icon className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{r.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{r.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selectedRole === r.role ? 'border-primary-500 bg-primary-500' : 'border-gray-300 dark:border-slate-500'}`}>
                  {selectedRole === r.role && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleLogin}
            disabled={!selectedRole || loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
            Demo mode — no credentials required
          </p>
        </div>
      </div>
    </div>
  );
}
