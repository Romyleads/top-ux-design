import { useEffect, useRef } from "react";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;
    let mouseX = -1000, mouseY = -1000;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    const PARTICLE_COUNT = 90;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 4000,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.8,
      pulse: Math.random() * Math.PI * 2,
      hue: 142 + Math.random() * 30 - 15, // green range with slight variation
    }));

    const MAX_DIST = 150;
    const MOUSE_DIST = 200;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Mouse interaction - subtle push
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_DIST && mDist > 0) {
          const force = (MOUSE_DIST - mDist) / MOUSE_DIST * 0.015;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }

        // Damping
        p.vx *= 0.999;
        p.vy *= 0.999;

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const alpha = 0.3 + 0.25 * Math.sin(p.pulse);

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        grd.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${alpha * 0.5})`);
        grd.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(p.x - p.size * 6, p.y - p.size * 6, p.size * 12, p.size * 12);

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${alpha})`;
        ctx.fill();
      }

      // Connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = 0.08 * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(142, 70%, 55%, ${alpha})`;
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
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

const icons = [
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><polyline points="4,40 16,28 24,34 44,8" /><polyline points="34,8 44,8 44,18" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="24" cy="24" r="20" /><polyline points="24,12 24,24 34,28" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="24" cy="24" r="20" /><circle cx="24" cy="24" r="13" /><circle cx="24" cy="24" r="6" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="6" y="28" width="8" height="16" rx="1" /><rect x="20" y="18" width="8" height="26" rx="1" /><rect x="34" y="8" width="8" height="36" rx="1" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><text x="6" y="34" fontSize="28" fill="currentColor" stroke="none" fontWeight="bold">%</text></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="24" cy="24" r="20" /><path d="M24 4 L24 24 L44 24" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="24" y1="42" x2="24" y2="8" /><polyline points="14,18 24,8 34,18" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><text x="10" y="38" fontSize="34" fill="currentColor" stroke="none" fontWeight="bold">€</text></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><polygon points="28,4 12,28 24,28 20,44 36,20 24,20" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="20" cy="20" r="14" /><line x1="30" y1="30" x2="42" y2="42" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4 6h40L28 24v14l-8 4V24L4 6z" /></svg>,
];

const floatingItems = [
  { iconIdx: 0, size: 48, x: "6%", y: "8%", delay: 0, duration: 30, drift: 1 },
  { iconIdx: 1, size: 38, x: "84%", y: "12%", delay: 4, duration: 26, drift: 2 },
  { iconIdx: 2, size: 42, x: "44%", y: "5%", delay: 2, duration: 34, drift: 3 },
  { iconIdx: 3, size: 36, x: "24%", y: "80%", delay: 6, duration: 28, drift: 1 },
  { iconIdx: 4, size: 30, x: "34%", y: "50%", delay: 8, duration: 32, drift: 2 },
  { iconIdx: 5, size: 40, x: "4%", y: "42%", delay: 3, duration: 35, drift: 3 },
  { iconIdx: 6, size: 32, x: "54%", y: "86%", delay: 10, duration: 25, drift: 1 },
  { iconIdx: 7, size: 28, x: "88%", y: "84%", delay: 12, duration: 29, drift: 2 },
  { iconIdx: 8, size: 34, x: "3%", y: "86%", delay: 5, duration: 31, drift: 3 },
  { iconIdx: 9, size: 30, x: "50%", y: "36%", delay: 7, duration: 27, drift: 1 },
  { iconIdx: 0, size: 34, x: "76%", y: "56%", delay: 9, duration: 24, drift: 2 },
  { iconIdx: 10, size: 36, x: "15%", y: "64%", delay: 1, duration: 28, drift: 3 },
  { iconIdx: 1, size: 32, x: "18%", y: "24%", delay: 14, duration: 26, drift: 1 },
  { iconIdx: 3, size: 40, x: "64%", y: "24%", delay: 13, duration: 30, drift: 2 },
];

export default function AnimatedBackground() {
  return (
    <>
      <ParticleCanvas />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle radial gradient from center */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 30%, hsla(142, 60%, 50%, 0.04) 0%, transparent 70%)`
        }} />

        {/* Floating marketing icons */}
        {floatingItems.map((item, i) => (
          <div
            key={i}
            className={`absolute text-primary/[.14] animate-drift-${item.drift}`}
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

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[.035]" style={{
          backgroundImage: `radial-gradient(circle, hsla(142, 70%, 50%, 0.8) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
      </div>
    </>
  );
}
