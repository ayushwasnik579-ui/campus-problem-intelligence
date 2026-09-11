import React, { useEffect, useRef, useState } from 'react';
import { Activity, ShieldCheck, Zap, Cpu, CheckCircle2 } from 'lucide-react';

interface CinematicLoadingScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export default function CinematicLoadingScreen({ onComplete, forceShow = false }: CinematicLoadingScreenProps) {
  const [progress, setProgress] = useState<number>(0);
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isMorphing, setIsMorphing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const statusMessages = [
    'INITIALIZING CAMPUS INTELLIGENCE...',
    'CONNECTING TO TELEMETRY SENSORS...',
    'CALIBRATING PREDICTIVE HEATMAP DATA...',
    'SYNCHRONIZING AI COMMAND NODES...',
    'SECURING HIGH-PRIORITY DIRECTIVES...',
    'ACCESS GRANTED // SYSTEM OPERATIONAL'
  ];

  // Particle background canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2.2 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(139, 92, 246, ',
      alpha: Math.random() * 0.7 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render & update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Progress counter increment logic
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2800; // 2.8 seconds cinematic bootup

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressPercent = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(progressPercent);

      // Update status messages based on percentage ranges
      if (progressPercent < 20) setStatusIndex(0);
      else if (progressPercent < 45) setStatusIndex(1);
      else if (progressPercent < 70) setStatusIndex(2);
      else if (progressPercent < 88) setStatusIndex(3);
      else if (progressPercent < 100) setStatusIndex(4);
      else setStatusIndex(5);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setProgress(100);
        setIsDone(true);

        // Morph out sequence after brief access granted hold
        setTimeout(() => {
          setIsMorphing(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 750); // Morph transition time
        }, 400);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#030712] text-white flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden transition-all duration-700 ease-out select-none ${
        isMorphing ? 'opacity-0 scale-110 pointer-events-none blur-md' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(30,27,75,0.4)_0%,rgba(3,7,18,0.95)_75%)]" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Scanner Beam Effect */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-scan-line pointer-events-none z-0" />

      {/* Top Header Information */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10 text-xs font-mono text-cyan-400/70 tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>SYSTEM: ONLINE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>LATENCY: 12ms</span>
          <span>•</span>
          <span>PROTOCOL: v4.2-AI</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-400/80">
          <Cpu className="w-3.5 h-3.5 animate-pulse" />
          <span>NEURAL ENGINE ACTIVE</span>
        </div>
      </div>

      {/* Center Hero: Logo with Glitch & Scale Animation */}
      <div className="my-auto flex flex-col items-center justify-center text-center z-10 max-w-xl relative">
        {/* Glow Ring Behind Logo */}
        <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-indigo-500/30 to-purple-500/20 rounded-full blur-3xl opacity-70 animate-pulse-slow" />

        {/* Animated Cyber Icon Emblem */}
        <div className={`relative mb-6 transform transition-all duration-700 ${isMorphing ? 'scale-[2.5] rotate-12 opacity-0 blur-lg' : 'scale-100'}`}>
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-600 via-cyan-500 to-purple-600 p-[2px] shadow-[0_0_50px_rgba(6,182,212,0.4)] animate-logo-float">
            <div className="w-full h-full bg-slate-950/90 rounded-[22px] flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10" />
              <Activity className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 animate-pulse relative z-10" />
              
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
          </span>
        </div>

        {/* Logo Text with Cyber Glitch Effect */}
        <div className="relative mb-3">
          <h1 
            className="text-4xl sm:text-6xl font-extrabold tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200 animate-logo-scale glitch-text"
            data-text="CampusTIQ"
          >
            Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">TIQ</span>
          </h1>
        </div>

        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span>NEXT-GEN CAMPUS PROBLEM INTELLIGENCE</span>
        </div>

        {/* Animated Progress Counter */}
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <div className="flex items-baseline justify-between w-full font-mono">
            <span className="text-xs text-slate-400 tracking-wider flex items-center gap-2">
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
              <span className={isDone ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                {statusMessages[statusIndex]}
              </span>
            </span>
            <span className="text-2xl font-bold font-mono text-cyan-400 tracking-tighter drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>

          {/* Animated Glowing Progress Bar Line */}
          <div className="relative w-full h-2.5 bg-slate-900/90 rounded-full border border-slate-800 p-[2px] overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-150 ease-out relative shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            >
              {/* Animated Light Sweep Inside Bar */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-shimmer" />

              {/* Leading Laser Spark Node */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#38bdf8] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Telemetry Text */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2 z-10 text-[11px] font-mono text-slate-500">
        <p>© 2026 CAMPUSTIQ INTELLIGENCE PLATFORM • ALL SYSTEMS NORMAL</p>
        <div className="flex items-center gap-4 text-slate-400">
          <span>AI CORE ACTIVE</span>
          <span>•</span>
          <span>ENCRYPTED END-TO-END</span>
        </div>
      </div>
    </div>
  );
}
