import { useNavigate } from 'react-router-dom';
import { Bell, Menu, Moon, Sun, LogOut, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

export default function TopNav() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const base = state.userRole === 'admin' ? '/admin/issues' : '/student/campus-issues';
      navigate(`${base}?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="h-16 bg-[#030712]/80 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          className="p-2 rounded-xl hover:bg-slate-800/80 text-slate-400 hover:text-cyan-400 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/70" />
            <input
              type="text"
              placeholder="Search issues, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-64 lg:w-80 bg-slate-900/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          className="p-2 rounded-xl hover:bg-slate-800/80 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          {state.darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-cyan-400" />}
        </button>

        {/* Notifications */}
        <button
          onClick={() => {
            const base = state.userRole === 'admin' ? '/admin' : '/student';
            navigate(`${base}/notifications`);
          }}
          className="p-2 rounded-xl hover:bg-slate-800/80 text-slate-400 hover:text-cyan-400 relative transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-cyan-500 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User avatar */}
        {state.currentUser && (
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-800">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-200">{state.currentUser.name}</p>
              <p className="text-xs text-cyan-400/80 font-mono uppercase tracking-wider">{state.currentUser.role}</p>
            </div>
            <button
              onClick={() => {
                dispatch({ type: 'LOGOUT' });
                navigate('/');
              }}
              className="p-2 rounded-xl hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
