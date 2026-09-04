import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useApp } from '../../context/AppContext';

export default function DashboardLayout() {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />
      <div className={`transition-all duration-300 ${state.sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <TopNav />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
