import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, PlusCircle, Globe, Bell, User, Settings,
  BarChart3, Brain, RefreshCcw, Building2, Activity, FileBarChart, Map,
  ChevronLeft, Zap, X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const studentLinks = [
  { to: '/student', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/student/report', icon: PlusCircle, label: 'Report Problem' },
  { to: '/student/my-reports', icon: FileText, label: 'My Reports' },
  { to: '/student/campus-issues', icon: Globe, label: 'Campus Issues' },
  { to: '/student/notifications', icon: Bell, label: 'Notifications' },
  { to: '/student/profile', icon: User, label: 'Profile' },
];

const adminLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/issues', icon: FileText, label: 'All Issues' },
  { to: '/admin/ai-command', icon: Brain, label: 'AI Command Center' },
  { to: '/admin/ai-insights', icon: Zap, label: 'AI Insights' },
  { to: '/admin/recurring', icon: RefreshCcw, label: 'Recurring Issues' },
  { to: '/admin/departments', icon: Building2, label: 'Departments' },
  { to: '/admin/heatmap', icon: Map, label: 'Campus Heatmap' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/reports', icon: FileBarChart, label: 'Reports' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const links = isAdmin ? adminLinks : studentLinks;

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* Mobile overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => dispatch({ type: 'SET_SIDEBAR', payload: false })}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-[#030712] border-r border-slate-800/80 flex flex-col transition-all duration-300 ease-in-out shadow-[4px_0_25px_rgba(0,0,0,0.5)]
        ${state.sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-20 lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25">
              <Activity className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <span className={`font-bold text-lg text-white whitespace-nowrap transition-opacity duration-200 ${!state.sidebarOpen ? 'lg:opacity-0' : ''}`}>
              Campus<span className="text-cyan-400">TIQ</span>
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400 lg:block hidden"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${!state.sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_SIDEBAR', payload: false })}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role badge */}
        <div className={`px-4 py-3 ${!state.sidebarOpen ? 'lg:px-2' : ''}`}>
          <div className={`px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800/80 ${!state.sidebarOpen ? 'lg:px-1 lg:flex lg:justify-center' : ''}`}>
            <p className={`text-xs font-mono font-semibold text-cyan-400 flex items-center gap-1.5 ${!state.sidebarOpen ? 'lg:hidden' : ''}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {isAdmin ? 'SYSTEM ADMIN' : 'STUDENT PORTAL'}
            </p>
            <p className={`text-xs font-semibold text-cyan-400 hidden ${!state.sidebarOpen ? 'lg:block' : ''}`}>
              {isAdmin ? '👨‍💼' : '🎓'}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-2">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/student' || link.to === '/admin'}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      dispatch({ type: 'SET_SIDEBAR', payload: false });
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-slate-900 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                    } ${!state.sidebarOpen ? 'lg:justify-center lg:px-2' : ''}`
                  }
                >
                  <link.icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`whitespace-nowrap ${!state.sidebarOpen ? 'lg:hidden' : ''}`}>
                    {link.label}
                  </span>
                  {link.label === 'Notifications' && unreadCount > 0 && (
                    <span className={`ml-auto bg-cyan-500 text-slate-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${!state.sidebarOpen ? 'lg:hidden' : ''}`}>
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info */}
        {state.currentUser && (
          <div className={`p-4 border-t border-slate-800/80 ${!state.sidebarOpen ? 'lg:p-2' : ''}`}>
            <div className={`flex items-center gap-3 ${!state.sidebarOpen ? 'lg:justify-center' : ''}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold text-sm flex-shrink-0 shadow-md shadow-cyan-500/20">
                {state.currentUser.name.charAt(0)}
              </div>
              <div className={`flex-1 min-w-0 ${!state.sidebarOpen ? 'lg:hidden' : ''}`}>
                <p className="text-sm font-semibold text-slate-200 truncate">
                  {state.currentUser.name}
                </p>
                <p className="text-xs text-slate-400 truncate">{state.currentUser.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
