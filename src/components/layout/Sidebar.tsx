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
        className={`fixed top-0 left-0 z-50 h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col transition-all duration-300 ease-in-out
        ${state.sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-20 lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/25">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap transition-opacity duration-200 ${!state.sidebarOpen ? 'lg:opacity-0' : ''}`}>
              Campus<span className="text-primary-600">IQ</span>
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 lg:block hidden"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${!state.sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_SIDEBAR', payload: false })}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role badge */}
        <div className={`px-4 py-3 ${!state.sidebarOpen ? 'lg:px-2' : ''}`}>
          <div className={`px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 ${!state.sidebarOpen ? 'lg:px-1 lg:flex lg:justify-center' : ''}`}>
            <p className={`text-xs font-semibold text-primary-700 dark:text-primary-300 ${!state.sidebarOpen ? 'lg:hidden' : ''}`}>
              {isAdmin ? '👨‍💼 Administrator' : '🎓 Student Portal'}
            </p>
            <p className={`text-xs font-semibold text-primary-700 dark:text-primary-300 hidden ${!state.sidebarOpen ? 'lg:block' : ''}`}>
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
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                    } ${!state.sidebarOpen ? 'lg:justify-center lg:px-2' : ''}`
                  }
                >
                  <link.icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`whitespace-nowrap ${!state.sidebarOpen ? 'lg:hidden' : ''}`}>
                    {link.label}
                  </span>
                  {link.label === 'Notifications' && unreadCount > 0 && (
                    <span className={`ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${!state.sidebarOpen ? 'lg:hidden' : ''}`}>
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
          <div className={`p-4 border-t border-gray-100 dark:border-slate-700 ${!state.sidebarOpen ? 'lg:p-2' : ''}`}>
            <div className={`flex items-center gap-3 ${!state.sidebarOpen ? 'lg:justify-center' : ''}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {state.currentUser.name.charAt(0)}
              </div>
              <div className={`flex-1 min-w-0 ${!state.sidebarOpen ? 'lg:hidden' : ''}`}>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {state.currentUser.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{state.currentUser.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
