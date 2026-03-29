import { useEffect, useRef } from "react";

// Canvas-based particle network
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

    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 4000,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.5 - 0.15,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * Math.PI * 2,
    }));

    const MAX_DIST = 160;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }

        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.15})`;
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = 0.12 * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
            ctx.lineWidth = 0.8;
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
    />
  );
}

// Floating SVG marketing icons
const icons = [
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4,40 16,28 24,34 44,8" /><polyline points="34,8 44,8 44,18" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="20" /><polyline points="24,12 24,24 34,28" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="20" /><circle cx="24" cy="24" r="13" /><circle cx="24" cy="24" r="6" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="28" width="8" height="16" rx="1" /><rect x="20" y="18" width="8" height="26" rx="1" /><rect x="34" y="8" width="8" height="36" rx="1" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><text x="6" y="34" fontSize="28" fill="currentColor" stroke="none" fontWeight="bold">%</text></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="20" /><path d="M24 4 L24 24 L44 24" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><line x1="24" y1="42" x2="24" y2="8" /><polyline points="14,18 24,8 34,18" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><text x="10" y="38" fontSize="34" fill="currentColor" stroke="none" fontWeight="bold">€</text></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="28,4 12,28 24,28 20,44 36,20 24,20" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="20" cy="20" r="14" /><line x1="30" y1="30" x2="42" y2="42" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><text x="12" y="38" fontSize="34" fill="currentColor" stroke="none" fontWeight="bold">$</text></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h40L28 24v14l-8 4V24L4 6z" /></svg>,
];

const floatingItems = [
  { iconIdx: 0, size: 56, x: "6%", y: "8%", delay: 0, duration: 28, drift: 1 },
  { iconIdx: 1, size: 44, x: "82%", y: "10%", delay: 3, duration: 25, drift: 2 },
  { iconIdx: 2, size: 50, x: "42%", y: "4%", delay: 1, duration: 32, drift: 3 },
  { iconIdx: 3, size: 42, x: "22%", y: "78%", delay: 5, duration: 27, drift: 1 },
  { iconIdx: 4, size: 36, x: "32%", y: "48%", delay: 7, duration: 30, drift: 2 },
  { iconIdx: 5, size: 46, x: "4%", y: "40%", delay: 2, duration: 33, drift: 3 },
  { iconIdx: 6, size: 38, x: "52%", y: "85%", delay: 9, duration: 24, drift: 1 },
  { iconIdx: 7, size: 34, x: "86%", y: "82%", delay: 11, duration: 28, drift: 2 },
  { iconIdx: 8, size: 40, x: "2%", y: "85%", delay: 4, duration: 30, drift: 3 },
  { iconIdx: 9, size: 36, x: "48%", y: "35%", delay: 6, duration: 26, drift: 1 },
  { iconIdx: 0, size: 40, x: "75%", y: "55%", delay: 8, duration: 23, drift: 2 },
  { iconIdx: 10, size: 34, x: "90%", y: "38%", delay: 10, duration: 31, drift: 3 },
  { iconIdx: 11, size: 42, x: "14%", y: "62%", delay: 1, duration: 27, drift: 1 },
  { iconIdx: 1, size: 38, x: "16%", y: "22%", delay: 13, duration: 25, drift: 2 },
  { iconIdx: 3, size: 46, x: "62%", y: "22%", delay: 12, duration: 29, drift: 3 },
  { iconIdx: 2, size: 32, x: "70%", y: "72%", delay: 14, duration: 22, drift: 1 },
];

export default function AnimatedBackground() {
  return (
    <>
      <ParticleCanvas />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Gradient orbs */}
        <div className="absolute top-[5%] left-[3%] w-[600px] h-[600px] rounded-full bg-primary/[.12] blur-[120px] animate-float" />
        <div className="absolute top-[40%] right-[2%] w-[500px] h-[500px] rounded-full bg-primary/[.08] blur-[100px] animate-float-delayed" />
        <div className="absolute bottom-[5%] left-[25%] w-[450px] h-[450px] rounded-full bg-primary/[.06] blur-[90px] animate-float" />
        <div className="absolute top-[65%] left-[55%] w-[350px] h-[350px] rounded-full bg-primary/[.07] blur-[80px] animate-float-delayed" />

        {/* Floating marketing icons — much more visible */}
        {floatingItems.map((item, i) => (
          <div
            key={i}
            className={`absolute text-primary/20 animate-drift-${item.drift}`}
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

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </>
  );
}
