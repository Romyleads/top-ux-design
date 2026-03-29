import { useEffect, useRef } from "react";

// Canvas-based particle system + floating marketing icons
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.05,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Connection lines
    const MAX_DIST = 140;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }

        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx.fill();
      }

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = 0.06 * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}

// Floating SVG marketing icons
const icons = [
  // Growth chart
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4,40 16,28 24,34 44,8" /><polyline points="34,8 44,8 44,18" /></svg>,
  // Clock
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="20" /><polyline points="24,12 24,24 34,28" /></svg>,
  // Target
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="20" /><circle cx="24" cy="24" r="13" /><circle cx="24" cy="24" r="6" /></svg>,
  // Bar chart
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="28" width="8" height="16" rx="1" /><rect x="20" y="18" width="8" height="26" rx="1" /><rect x="34" y="8" width="8" height="36" rx="1" /></svg>,
  // Percent
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><text x="6" y="34" fontSize="28" fill="currentColor" stroke="none" fontWeight="bold">%</text></svg>,
  // Pie chart
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="20" /><path d="M24 4 L24 24 L44 24" /></svg>,
  // Arrow up
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><line x1="24" y1="42" x2="24" y2="8" /><polyline points="14,18 24,8 34,18" /></svg>,
  // Dollar
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><text x="12" y="38" fontSize="34" fill="currentColor" stroke="none" fontWeight="bold">$</text></svg>,
  // Lightning
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="28,4 12,28 24,28 20,44 36,20 24,20" /></svg>,
  // Magnifier
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="20" cy="20" r="14" /><line x1="30" y1="30" x2="42" y2="42" /></svg>,
  // Euro
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><text x="10" y="38" fontSize="34" fill="currentColor" stroke="none" fontWeight="bold">€</text></svg>,
  // Funnel
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h40L28 24v14l-8 4V24L4 6z" /></svg>,
];

const floatingItems = [
  { iconIdx: 0, size: 52, x: "8%", y: "10%", delay: 0, duration: 32, drift: 1 },
  { iconIdx: 1, size: 40, x: "85%", y: "12%", delay: 4, duration: 28, drift: 2 },
  { iconIdx: 2, size: 46, x: "45%", y: "6%", delay: 2, duration: 35, drift: 3 },
  { iconIdx: 3, size: 38, x: "25%", y: "82%", delay: 6, duration: 30, drift: 1 },
  { iconIdx: 4, size: 30, x: "35%", y: "52%", delay: 8, duration: 34, drift: 2 },
  { iconIdx: 5, size: 42, x: "5%", y: "45%", delay: 3, duration: 36, drift: 3 },
  { iconIdx: 6, size: 34, x: "55%", y: "88%", delay: 10, duration: 27, drift: 1 },
  { iconIdx: 7, size: 28, x: "88%", y: "85%", delay: 12, duration: 31, drift: 2 },
  { iconIdx: 8, size: 36, x: "3%", y: "88%", delay: 5, duration: 33, drift: 3 },
  { iconIdx: 9, size: 32, x: "50%", y: "38%", delay: 7, duration: 29, drift: 1 },
  { iconIdx: 0, size: 36, x: "78%", y: "60%", delay: 9, duration: 26, drift: 2 },
  { iconIdx: 10, size: 30, x: "92%", y: "42%", delay: 11, duration: 34, drift: 3 },
  { iconIdx: 11, size: 38, x: "15%", y: "68%", delay: 1, duration: 30, drift: 1 },
  { iconIdx: 1, size: 34, x: "18%", y: "25%", delay: 14, duration: 28, drift: 2 },
  { iconIdx: 3, size: 42, x: "65%", y: "25%", delay: 13, duration: 32, drift: 3 },
  { iconIdx: 2, size: 28, x: "72%", y: "78%", delay: 15, duration: 25, drift: 1 },
];

export default function AnimatedBackground() {
  return (
    <>
      <ParticleCanvas />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Gradient orbs with rich colors */}
        <div className="absolute top-[5%] left-[3%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/[.07] to-emerald-500/[.03] blur-[140px] animate-float" />
        <div className="absolute top-[40%] right-[2%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-primary/[.05] to-teal-400/[.04] blur-[120px] animate-float-delayed" />
        <div className="absolute bottom-[5%] left-[25%] w-[450px] h-[450px] rounded-full bg-gradient-to-r from-primary/[.04] to-green-300/[.03] blur-[110px] animate-float" />
        <div className="absolute top-[60%] left-[55%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-emerald-400/[.04] to-primary/[.02] blur-[100px] animate-float-delayed" />

        {/* Floating marketing icons */}
        {floatingItems.map((item, i) => (
          <div
            key={i}
            className={`absolute text-primary/[.08] animate-drift-${item.drift}`}
            style={{
              left: item.x,
              top: item.y,
              width: item.size,
              height: item.size,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {icons[item.iconIdx]}
          </div>
        ))}

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </>
  );
}
