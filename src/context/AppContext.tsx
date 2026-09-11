import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Issue, User, Notification, UserRole } from '../types';
import { mockIssues, mockNotifications, mockUsers } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  userRole: UserRole | null;
  issues: Issue[];
  notifications: Notification[];
  darkMode: boolean;
  sidebarOpen: boolean;
}

type AppAction =
  | { type: 'LOGIN'; payload: { role: UserRole } }
  | { type: 'LOGOUT' }
  | { type: 'ADD_ISSUE'; payload: Issue }
  | { type: 'UPDATE_ISSUE'; payload: { id: string; updates: Partial<Issue> } }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean };

const initialState: AppState = {
  currentUser: null,
  userRole: null,
  issues: mockIssues,
  notifications: mockNotifications,
  darkMode: true,
  sidebarOpen: true,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN': {
      const role = action.payload.role;
      const user = role === 'student'
        ? mockUsers[0]
        : role === 'staff'
          ? mockUsers[2]
          : mockUsers[3];
      return { ...state, currentUser: user, userRole: role };
    }
    case 'LOGOUT':
      return { ...state, currentUser: null, userRole: null };
    case 'ADD_ISSUE':
      return { ...state, issues: [action.payload, ...state.issues] };
    case 'UPDATE_ISSUE':
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id
            ? { ...issue, ...action.payload.updates }
            : issue
        ),
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  React.useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={state.darkMode ? 'dark bg-[#030712] text-slate-100 min-h-screen' : 'bg-gray-50 text-gray-900 min-h-screen'}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
