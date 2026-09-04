import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Settings() {
  const { state, dispatch } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage application preferences</p>
      </div>

      <div className="space-y-4">
        {/* Appearance */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            {state.darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            Appearance
          </h3>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-xs text-gray-400">Switch between light and dark themes</p>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              className={`relative w-12 h-6 rounded-full transition-colors ${state.darkMode ? 'bg-primary-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${state.darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          {['Email Notifications', 'Push Notifications', 'Critical Issue Alerts', 'SLA Reminders'].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 border-b border-gray-50 dark:border-slate-700 last:border-0">
              <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
              <div className="w-12 h-6 rounded-full bg-primary-600 relative">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow" />
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            About CampusIQ
          </h3>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p><span className="font-medium text-gray-700 dark:text-gray-200">Version:</span> 1.0.0</p>
            <p><span className="font-medium text-gray-700 dark:text-gray-200">Platform:</span> Campus Problem Intelligence</p>
            <p><span className="font-medium text-gray-700 dark:text-gray-200">Tagline:</span> Report. Analyze. Resolve.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
