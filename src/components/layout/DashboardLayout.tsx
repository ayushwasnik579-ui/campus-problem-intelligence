import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useApp } from '../../context/AppContext';

export default function DashboardLayout() {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative overflow-x-hidden">
      {/* Background Cyber Glow & Subtle Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(30,27,75,0.3)_0%,rgba(3,7,18,0.95)_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

      <div className="relative z-10">
        <Sidebar />
        <div className={`transition-all duration-300 ${state.sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
          <TopNav />
          <main className="p-4 lg:p-6 min-h-[calc(100vh-4rem)]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
