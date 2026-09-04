import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bell, AlertTriangle, CheckCircle2, Info, AlertOctagon, Clock } from 'lucide-react';

const typeIcons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
  critical: AlertOctagon,
};

const typeColors = {
  info: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800',
  warning: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800',
  success: 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-800',
  critical: 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-800',
};

export default function Notifications() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const basePath = state.userRole === 'admin' ? '/admin' : '/student';

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {state.notifications.filter((n) => !n.read).length} unread notifications
          </p>
        </div>
        <button
          onClick={() => state.notifications.forEach((n) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: n.id }))}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {state.notifications.map((notification) => {
          const Icon = typeIcons[notification.type];
          const colors = typeColors[notification.type];
          return (
            <div
              key={notification.id}
              onClick={() => {
                dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id });
                if (notification.issueId) navigate(`${basePath}/issue/${notification.issueId}`);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                notification.read
                  ? 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700'
                  : `${colors} border`
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${notification.read ? 'bg-gray-100 dark:bg-slate-700 text-gray-400' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${notification.read ? 'text-gray-600 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                    {notification.title}
                  </p>
                  <p className={`text-sm mt-0.5 ${notification.read ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
                {!notification.read && <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
