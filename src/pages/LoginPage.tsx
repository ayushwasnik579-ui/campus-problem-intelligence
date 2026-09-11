import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, GraduationCap, Shield, Wrench, ArrowRight, Sparkles, CheckCircle2, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

const roles: { role: UserRole; icon: typeof GraduationCap; title: string; description: string; color: string }[] = [
  { role: 'student', icon: GraduationCap, title: 'Student', description: 'Report campus problems, upload photos, and track resolution status in real-time', color: 'from-cyan-400 to-blue-600' },
  { role: 'staff', icon: Wrench, title: 'Department Staff', description: 'Manage assigned tickets, log maintenance updates, and report actions', color: 'from-amber-400 to-orange-500' },
  { role: 'admin', icon: Shield, title: 'Administrator', description: 'Full AI Command Center access with neural telemetry and recurring heatmap analytics', color: 'from-purple-500 to-pink-500' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>('student');
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
    <div className="min-h-screen bg-[#040711] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      
      {/* Ambient Radial Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]" />
      </div>

      {/* Cyber Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] z-0" />

      <div className="w-full max-w-lg relative z-10 my-auto">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div 
            onClick={() => navigate('/')} 
            className="inline-flex items-center gap-3 cursor-pointer group mb-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-[1.5px] shadow-[0_0_25px_rgba(0,198,255,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070b1e] rounded-[14px] flex items-center justify-center">
                <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <span className="font-extrabold text-3xl tracking-tight text-white">
              Campus<span className="text-cyan-400">TIQ</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase shadow-[0_0_12px_rgba(6,182,212,0.15)]">
            <Cpu className="w-3.5 h-3.5" />
            <span>AUTHENTICATION GATEWAY</span>
          </div>
        </div>

        {/* Cyber Login Role Selection Card */}
        <div className="cyber-card rounded-3xl p-6 sm:p-8 relative backdrop-blur-xl">
          
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Select Access Role</h2>
            <p className="text-xs text-slate-400 mt-1">Choose your account role to initialize session parameters</p>
          </div>

          {/* Role Cards List */}
          <div className="space-y-3.5 mb-8">
            {roles.map((r) => {
              const isSelected = selectedRole === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => setSelectedRole(r.role)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                    isSelected
                      ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/15 via-indigo-500/10 to-purple-500/10 shadow-[0_0_25px_rgba(0,198,255,0.25)]'
                      : 'border-slate-800 bg-slate-950/60 hover:border-cyan-500/40 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Glowing selection highlight edge */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-500" />
                  )}

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-slate-950 font-bold shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <r.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`font-bold text-sm ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                        {r.title}
                      </p>
                      {isSelected && (
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed truncate sm:whitespace-normal">
                      {r.description}
                    </p>
                  </div>

                  {/* Radio Indicator */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'border-cyan-400 bg-cyan-500/20' : 'border-slate-700'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleLogin}
            disabled={!selectedRole || loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-extrabold text-white gradient-btn-primary shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>INITIALIZING SESSION...</span>
              </div>
            ) : (
              <>
                <span>Launch Portal</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </>
            )}
          </button>

          <p className="text-[11px] font-mono text-center text-slate-500 mt-4 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEMO MODE ACTIVE • DIRECT ACCESS GRANTED</span>
          </p>
        </div>

      </div>
    </div>
  );
}
