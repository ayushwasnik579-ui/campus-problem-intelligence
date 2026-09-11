import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, Brain, BarChart3, Building2, CheckCircle2, Clock,
  FileText, ArrowRight, Zap, RefreshCcw, Target, TrendingUp,
  Shield, Users, ChevronRight, Sparkles, Settings, Mouse, BarChart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import CinematicLoadingScreen from '../components/shared/CinematicLoadingScreen';
import Hero3DMockup from '../components/shared/Hero3DMockup';

const featuresList = [
  { icon: FileText, title: 'Smart Problem Reporting', description: 'Students report campus issues effortlessly with image attachments, priority tags, and location data.' },
  { icon: Brain, title: 'AI Issue Detection', description: 'Advanced neural network categorizes, assesses severity, and detects critical systemic failures automatically.' },
  { icon: RefreshCcw, title: 'Recurring Issue Analysis', description: 'Identifies recurring campus infrastructure problems and flags them for preventive maintenance.' },
  { icon: Target, title: 'Automatic Prioritization', description: 'AI priority scoring algorithm ranks issues based on urgency, affected users, and safety impact.' },
  { icon: Building2, title: 'Department Assignment', description: 'Intelligently routes reports directly to responsible university departments without manual intervention.' },
  { icon: CheckCircle2, title: 'Real-time Resolution Tracking', description: 'End-to-end status telemetry keeping students and administration informed at every stage.' },
];

const statsList = [
  { value: '2,847', label: 'Problems Reported', icon: FileText, change: '+14% this month' },
  { value: '2,391', label: 'Problems Resolved', icon: CheckCircle2, change: '84% success rate' },
  { value: '186', label: 'Recurring Issues Flagged', icon: RefreshCcw, change: 'Preventive AI' },
  { value: '2.4 Hrs', label: 'Avg Resolution Time', icon: Clock, change: '32% faster' },
];

const howItWorksSteps = [
  { icon: FileText, step: '01', title: 'Student Reports Issue', description: 'Students submit campus problems via web or mobile app in under 30 seconds.' },
  { icon: Brain, step: '02', title: 'AI Analyzes & Scores', description: 'Neural models categorize urgency, detect duplicates, and assign priority scores.' },
  { icon: Building2, step: '03', title: 'Department Dispatched', description: 'Target department receives instant notification and action item directives.' },
  { icon: CheckCircle2, step: '04', title: 'Resolved & Verified', description: 'Issue closed with photo proof and real-time notification sent to student.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [showCinematic, setShowCinematic] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const handleNavigate = (path: string) => {
    if (state.currentUser) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  const handleNavClick = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabName === 'Features') {
      const el = document.getElementById('features');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabName === 'Analytics') {
      const el = document.getElementById('analytics');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabName === 'About') {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 relative overflow-hidden font-sans select-none">
      {showCinematic && (
        <CinematicLoadingScreen onComplete={() => setShowCinematic(false)} forceShow />
      )}

      {/* Ambient Radial Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Cyber Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] z-0" />

      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#040711]/85 backdrop-blur-2xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('Home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-[1.5px] shadow-[0_0_20px_rgba(0,198,255,0.4)] group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#070b1e] rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Campus<span className="text-cyan-400">TIQ</span>
              </span>
            </div>

            {/* Nav Links (Centered & Fully Interactive) */}
            <div className="hidden md:flex items-center gap-8 bg-slate-900/60 px-6 py-2 rounded-full border border-slate-800/80 backdrop-blur-md">
              {[
                { name: 'Home', action: () => handleNavClick('Home') },
                { name: 'Features', action: () => handleNavClick('Features') },
                { name: 'Analytics', action: () => handleNavClick('Analytics') },
                { name: 'About', action: () => handleNavClick('About') },
              ].map((tab) => (
                <button
                  key={tab.name}
                  onClick={tab.action}
                  className={`relative text-sm font-medium transition-colors ${
                    activeTab === tab.name ? 'text-white font-semibold' : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  {tab.name}
                  {activeTab === tab.name && (
                    <span className="absolute -bottom-2 left-0 w-full h-[2.5px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_0_8px_#06b6d4]" />
                  )}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCinematic(true)}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-slate-900/90 text-cyan-400 rounded-full border border-cyan-500/30 hover:border-cyan-400 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                title="Replay Cinematic Intro"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>Replay Intro</span>
              </button>

              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-200 glass-btn-secondary flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Sign In
              </button>

              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 rounded-full text-xs font-extrabold text-white gradient-btn-primary flex items-center gap-1.5"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Hero Showcase Section */}
      <section id="hero" className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c122b] border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(0,198,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>AI-POWERED CAMPUS INTELLIGENCE CORE</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Make Your Campus <br />
              <span className="gradient-hero-title">Smarter & Responsive</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Students report campus problems in real-time. Our AI system analyzes,
              prioritizes, and routes recurring issues to departments — transforming
              complaints into actionable intelligence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <button
                onClick={() => handleNavigate('/student/report')}
                className="flex-1 sm:flex-initial px-7 py-3.5 rounded-full text-sm font-extrabold text-white gradient-btn-primary flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-4.5 h-4.5" />
                <span>Report a Problem</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavigate('/admin')}
                className="flex-1 sm:flex-initial px-7 py-3.5 rounded-full text-sm font-bold text-slate-200 glass-btn-secondary flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4.5 h-4.5 text-cyan-400" />
                <span>View Dashboard</span>
              </button>
            </div>

            {/* Feature Checkmarks */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Real-time Reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>AI Prioritization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-400" />
                <span>Faster Resolution</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Liquid-Smooth 3D Mockup */}
          <div className="lg:col-span-7">
            <Hero3DMockup />
          </div>
        </div>

        {/* Scroll to Explore Mouse Indicator */}
        <div 
          onClick={() => handleNavClick('About')}
          className="mt-16 sm:mt-24 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs font-mono cursor-pointer hover:text-cyan-400 transition-colors"
        >
          <div className="w-5 h-8 rounded-full border-2 border-slate-700 flex items-center justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* About Section: How CampusTIQ Works */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-slate-800/80">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase mb-4">
            <Brain className="w-3.5 h-3.5" />
            <span>HOW CAMPUSTIQ WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            From Student Complaint to Actionable Intelligence
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Our 4-step intelligent pipeline replaces traditional chaotic complaint box queues with real-time telemetry and automated resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((item, idx) => (
            <div key={idx} className="cyber-card p-6 rounded-2xl relative group">
              <span className="text-4xl font-black text-cyan-500/20 group-hover:text-cyan-400/40 transition-colors absolute top-4 right-4 font-mono">
                {item.step}
              </span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-slate-950 font-bold mb-5 shadow-lg shadow-cyan-500/20">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-slate-800/80">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>POWERFUL FEATURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Engineered for Campus Governance
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Designed specifically for educational institutions seeking seamless incident management and campus optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feature, i) => (
            <div
              key={i}
              className="cyber-card p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-600 p-[1px] mb-5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#080d22] rounded-[11px] flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Analytics & Impact Section */}
      <section id="analytics" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-slate-800/80">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>REAL-TIME PLATFORM IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Proven Institutional Analytics
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Empowering administrators with real-time resolution metrics and data-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsList.map((stat, idx) => (
            <div key={idx} className="cyber-card p-6 rounded-2xl text-center">
              <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3 animate-pulse" />
              <p className="text-3xl font-black text-white tracking-tight mb-1">{stat.value}</p>
              <p className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">{stat.label}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* View Full Analytics Portal Button */}
        <div className="flex justify-center">
          <button
            onClick={() => handleNavigate('/admin/analytics')}
            className="px-8 py-3.5 rounded-full text-sm font-extrabold text-white gradient-btn-primary flex items-center gap-2 shadow-xl"
          >
            <BarChart3 className="w-4.5 h-4.5" />
            <span>Explore Full Analytics Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="cyber-card p-10 sm:p-14 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Ready to Transform Your Campus Governance?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base mb-8">
            Deploy CampusTIQ today and convert unstructured student feedback into automated resolution workflows.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-9 py-4 rounded-full text-base font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all hover:-translate-y-1 inline-flex items-center gap-2"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Cyber Digital Wave Graphic Overlay */}
      <div className="w-full relative overflow-hidden -mt-12 pointer-events-none opacity-80 z-0">
        <svg className="w-full h-40 text-cyan-500/20" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none">
          <path d="M0 100 C360 200, 720 0, 1080 150 C1260 225, 1380 50, 1440 80 L1440 200 L0 200 Z" fill="url(#wave-gradient)" />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 198, 255, 0.25)" />
              <stop offset="50%" stopColor="rgba(123, 44, 191, 0.2)" />
              <stop offset="100%" stopColor="rgba(217, 70, 239, 0.15)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800/80 z-10 relative bg-[#040711]/90">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-white text-lg">Campus<span className="text-cyan-400">TIQ</span></span>
            <span className="text-xs text-slate-500 font-mono ml-2">© 2026</span>
          </div>
          <p className="text-xs font-mono text-slate-500">Campus Problem Intelligence Platform · Smart Institution System</p>
        </div>
      </footer>
    </div>
  );
}
