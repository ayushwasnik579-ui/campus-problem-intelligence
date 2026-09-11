import React, { useEffect, useRef, useState } from 'react';
import { Activity, BarChart3, FileText, TrendingUp, Building2, Settings, Zap } from 'lucide-react';

export default function Hero3DMockup() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Current and target rotation values for liquid-smooth physics lerp
  const currentRot = useRef({ x: 4, y: -6 });
  const targetRot = useRef({ x: 4, y: -6 });
  const [isHovered, setIsHovered] = useState(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Smooth Lerp animation loop (60/120 FPS)
    const updatePhysics = () => {
      // Lerp math: current += (target - current) * damping
      const damping = isHovered ? 0.08 : 0.04;
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * damping;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * damping;

      if (container) {
        container.style.transform = `perspective(1200px) rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg) scale(${isHovered ? 1.02 : 1})`;
      }

      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isHovered]);

  // Ambient floating when not hovering
  useEffect(() => {
    if (isHovered) return;

    let startTime = Date.now();
    const floatInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Gentle sine-wave breathing float
      targetRot.current.x = 4 + Math.sin(elapsed * 1.2) * 2;
      targetRot.current.y = -6 + Math.cos(elapsed * 1.2) * 2;
    }, 16);

    return () => clearInterval(floatInterval);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse position from center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Smooth tilt angles (Max ±10 degrees)
    targetRot.current.x = -mouseY * 12;
    targetRot.current.y = mouseX * 14;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetRot.current = { x: 4, y: -6 };
  };

  return (
    <div 
      className="relative w-full py-6 select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Floating AI Callout Badge */}
      <div className="absolute -top-6 right-6 z-30 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#090e27]/90 border border-cyan-500/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,198,255,0.25)] animate-float">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
          AI
        </div>
        <div>
          <p className="text-xs font-bold text-white">AI Analysis</p>
          <p className="text-[11px] text-slate-300 max-w-[170px]">Detects patterns & prioritizes critical issues automatically</p>
        </div>
        
        {/* Curved SVG Arrow */}
        <svg className="absolute -bottom-8 -left-6 w-12 h-12 text-cyan-400 pointer-events-none" viewBox="0 0 50 50" fill="none">
          <path d="M40 5 C30 25, 20 20, 10 40" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M10 40 L16 35 M10 40 L12 45" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Bottom Floating Action Callout Badge */}
      <div className="absolute -bottom-4 right-2 z-30 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#090e27]/90 border border-purple-500/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(168,85,247,0.25)]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs shadow-md">
          <Zap className="w-5 h-5 fill-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">Action in Progress</p>
          <p className="text-[11px] text-slate-300 max-w-[180px]">Your report is being routed to the concerned department.</p>
        </div>
      </div>

      {/* Main 3D Tilted Container with Liquid Lerp Physics */}
      <div
        ref={containerRef}
        className="w-full rounded-3xl bg-[#080d22]/95 border border-cyan-500/30 overflow-hidden shadow-2xl relative will-change-transform transform-gpu transition-shadow duration-500"
        style={{
          boxShadow: isHovered
            ? '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 60px rgba(0, 198, 255, 0.35)'
            : '0 20px 50px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 198, 255, 0.15)',
        }}
      >
        {/* Window Titlebar */}
        <div className="h-10 bg-[#060919] border-b border-slate-800/80 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-cyan-500/20 flex items-center justify-center">
              <Activity className="w-3 h-3 text-cyan-400" />
            </div>
            <span className="text-xs font-bold text-slate-200">CampusTIQ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          </div>
        </div>

        {/* Inside Window Body */}
        <div className="p-4 sm:p-5 grid grid-cols-12 gap-4 text-xs">
          
          {/* Left Mini Sidebar */}
          <div className="col-span-3 border-r border-slate-800/60 pr-3 space-y-2 hidden sm:block">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 font-semibold flex items-center gap-2 border border-cyan-500/30">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </div>
            <div className="p-2 rounded-xl text-slate-400 hover:text-slate-200 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Reports</span>
            </div>
            <div className="p-2 rounded-xl text-slate-400 hover:text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Analytics</span>
            </div>
            <div className="p-2 rounded-xl text-slate-400 hover:text-slate-200 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Departments</span>
            </div>
            <div className="p-2 rounded-xl text-slate-400 hover:text-slate-200 flex items-center gap-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </div>
          </div>

          {/* Right Dashboard Contents */}
          <div className="col-span-12 sm:col-span-9 space-y-4">
            <p className="font-bold text-slate-200 text-sm">Campus Issues Overview</p>

            {/* 4 Stat Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-[10px] text-slate-400">Total Reports</p>
                <p className="text-base font-extrabold text-white">248</p>
                <span className="text-[9px] text-emerald-400 font-bold">↑ 12%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-[10px] text-slate-400">In Progress</p>
                <p className="text-base font-extrabold text-white">86</p>
                <span className="text-[9px] text-emerald-400 font-bold">↑ 8%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-[10px] text-slate-400">Resolved</p>
                <p className="text-base font-extrabold text-white">142</p>
                <span className="text-[9px] text-emerald-400 font-bold">↑ 18%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-[10px] text-slate-400">Avg. Resolution Time</p>
                <p className="text-base font-extrabold text-white">4.2 hrs</p>
                <span className="text-[9px] text-cyan-400 font-bold">↓ 32%</span>
              </div>
            </div>

            {/* Main Grid: Recent Reports & Donut Chart */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              
              {/* Recent Reports List */}
              <div className="sm:col-span-7 p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <p className="text-[11px] font-bold text-slate-300 mb-2">Recent Reports</p>
                
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px]">🏢</span>
                    <span className="text-[10px] text-slate-200 font-medium truncate max-w-[100px]">Broken Bench - Library</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">High Priority</span>
                    <span className="text-[9px] text-slate-500">2h ago</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">💧</span>
                    <span className="text-[10px] text-slate-200 font-medium truncate max-w-[100px]">Water Leakage - Block B</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Medium</span>
                    <span className="text-[9px] text-slate-500">4h ago</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px]">📶</span>
                    <span className="text-[10px] text-slate-200 font-medium truncate max-w-[100px]">Wi-Fi Not Working - CSE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Medium</span>
                    <span className="text-[9px] text-slate-500">6h ago</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">❄️</span>
                    <span className="text-[10px] text-slate-200 font-medium truncate max-w-[100px]">AC Not Cooling - Lab 3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Low</span>
                    <span className="text-[9px] text-slate-500">8h ago</span>
                  </div>
                </div>
              </div>

              {/* Donut Chart Component */}
              <div className="sm:col-span-5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
                <p className="text-[11px] font-bold text-slate-300 mb-2">Issues by Category</p>
                
                <div className="flex items-center justify-center my-1 relative">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" strokeWidth="4" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#00c6ff" strokeWidth="4" strokeDasharray="42, 100" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7b2cbf" strokeWidth="4" strokeDasharray="24, 100" strokeDashoffset="-42" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#d946ef" strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-66" />
                  </svg>
                </div>

                <div className="space-y-1 text-[9px] text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Infrastructure</span>
                    <span className="font-bold">42%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" />Facilities</span>
                    <span className="font-bold">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-pink-500" />IT & Network</span>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-500" />Others</span>
                    <span className="font-bold">19%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
