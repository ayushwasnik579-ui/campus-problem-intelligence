import React, { useEffect, useRef } from 'react';

export default function CyberCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only activate on pointer-fine (desktop) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.body.classList.add('custom-cyber-cursor');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking & state
    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
    const ring = { x: -100, y: -100 };
    let isHovered = false;
    let isMouseDown = false;

    // Trail history points (for smooth fluid comet tail)
    const historyLimit = 22;
    const history: { x: number; y: number }[] = [];

    // Floating particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      life: number;
      maxLife: number;
      color: string;
    }
    const particles: Particle[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Check hover on interactive targets
      const target = e.target as HTMLElement | null;
      if (target) {
        isHovered = Boolean(
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cyber-card')
        );
      }
    };

    const onMouseDown = () => { isMouseDown = true; };
    const onMouseUp = () => { isMouseDown = false; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Render loop running at native screen refresh rate (60/120/144 FPS)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse position for high refresh rate monitor sync
      mouse.x += (mouse.targetX - mouse.x) * 0.45;
      mouse.y += (mouse.targetY - mouse.y) * 0.45;

      // Smooth lerp trailing ring
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;

      // Update history buffer for fluid tail
      if (mouse.x > 0 && mouse.y > 0) {
        history.unshift({ x: mouse.x, y: mouse.y });
        if (history.length > historyLimit) {
          history.pop();
        }
      }

      // Spawn subtle particle dust along trail when mouse moves fast
      if (history.length > 2) {
        const dx = history[0].x - history[1].x;
        const dy = history[0].y - history[1].y;
        const speed = Math.sqrt(dx * dx + dy * dy);

        if (speed > 1.5 && Math.random() < 0.6) {
          const colors = ['#06b6d4', '#38bdf8', '#8b5cf6', '#a78bfa'];
          particles.push({
            x: mouse.x + (Math.random() - 0.5) * 6,
            y: mouse.y + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2 - 0.3,
            radius: Math.random() * 2.2 + 0.8,
            life: 1.0,
            maxLife: Math.random() * 20 + 15,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }

      // 1. DRAW SMOOTH FLUID COMET TAIL
      if (history.length > 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < history.length - 1; i++) {
          const p1 = history[i];
          const p2 = history[i + 1];
          const progress = 1 - i / history.length; // 1.0 at head -> 0.0 at tail end

          const alpha = progress * 0.7;
          const lineWidth = progress * (isHovered ? 10 : 7) + 1;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Neon cyan-to-purple gradient tail
          ctx.strokeStyle = i % 2 === 0 ? `rgba(6, 182, 212, ${alpha})` : `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.shadowBlur = progress * 12;
          ctx.shadowColor = '#06b6d4';
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. DRAW FLOATING DUST PARTICLES
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1 / p.maxLife;

        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life * 0.8;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        } else {
          particles.splice(i, 1);
        }
      }

      // 3. DRAW LAGGING OUTER RETICLE / RING
      if (ring.x > 0 && ring.y > 0) {
        ctx.save();
        const ringRadius = isMouseDown ? 14 : isHovered ? 24 : 16;
        
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isMouseDown
          ? 'rgba(250, 204, 21, 0.9)'
          : isHovered
          ? 'rgba(6, 182, 212, 0.9)'
          : 'rgba(99, 102, 241, 0.5)';
        ctx.lineWidth = isHovered ? 2 : 1.5;
        ctx.shadowBlur = isHovered ? 15 : 8;
        ctx.shadowColor = isHovered ? '#06b6d4' : '#6366f1';
        ctx.stroke();

        // Draw cyber crosshair ticks if hovering
        if (isHovered) {
          const tickLen = 5;
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;

          // Top, bottom, left, right ticks
          ctx.beginPath();
          ctx.moveTo(ring.x, ring.y - ringRadius - 2);
          ctx.lineTo(ring.x, ring.y - ringRadius - 2 - tickLen);
          ctx.moveTo(ring.x, ring.y + ringRadius + 2);
          ctx.lineTo(ring.x, ring.y + ringRadius + 2 + tickLen);
          ctx.moveTo(ring.x - ringRadius - 2, ring.y);
          ctx.lineTo(ring.x - ringRadius - 2 - tickLen, ring.y);
          ctx.moveTo(ring.x + ringRadius + 2, ring.y);
          ctx.lineTo(ring.x + ringRadius + 2 + tickLen, ring.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4. DRAW PRIMARY LASER CORE DOT
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        const coreRadius = isMouseDown ? 3 : isHovered ? 5 : 4;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = isMouseDown ? '#facc15' : isHovered ? '#ffffff' : '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.shadowColor = isMouseDown ? '#facc15' : '#38bdf8';
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.body.classList.remove('custom-cyber-cursor');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
    />
  );
}
