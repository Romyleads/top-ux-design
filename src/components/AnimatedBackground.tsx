import { useEffect, useRef } from "react";

// Smooth flowing mesh lines — hi-tech aesthetic
function MeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, w, h);

      // Flowing horizontal lines
      const lineCount = 12;
      const spacing = h / (lineCount + 1);

      for (let i = 0; i < lineCount; i++) {
        const baseY = spacing * (i + 1);
        const phase = i * 0.4 + time;
        const opacity = 0.04 + 0.02 * Math.sin(time + i * 0.5);

        ctx.beginPath();
        ctx.moveTo(-20, baseY);

        for (let x = 0; x <= w + 20; x += 4) {
          const wave1 = Math.sin(x * 0.003 + phase) * 20;
          const wave2 = Math.sin(x * 0.006 + phase * 1.3) * 10;
          const wave3 = Math.cos(x * 0.002 + phase * 0.7) * 15;
          const y = baseY + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }

        const green = 142;
        ctx.strokeStyle = `hsla(${green}, 70%, 50%, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Vertical flowing lines (fewer, subtler)
      const vLineCount = 8;
      const vSpacing = w / (vLineCount + 1);

      for (let i = 0; i < vLineCount; i++) {
        const baseX = vSpacing * (i + 1);
        const phase = i * 0.5 + time * 0.8;
        const opacity = 0.025 + 0.015 * Math.sin(time * 1.2 + i * 0.6);

        ctx.beginPath();
        ctx.moveTo(baseX, -20);

        for (let y = 0; y <= h + 20; y += 4) {
          const wave1 = Math.sin(y * 0.004 + phase) * 15;
          const wave2 = Math.cos(y * 0.007 + phase * 1.1) * 8;
          const x = baseX + wave1 + wave2;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(142, 65%, 48%, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Glowing intersection nodes where lines conceptually cross
      for (let i = 0; i < 6; i++) {
        const nodePhase = time * 0.5 + i * 1.1;
        const nx = w * (0.15 + 0.7 * ((Math.sin(nodePhase * 0.3 + i) + 1) / 2));
        const ny = h * (0.15 + 0.7 * ((Math.cos(nodePhase * 0.25 + i * 0.8) + 1) / 2));
        const pulse = 0.5 + 0.5 * Math.sin(nodePhase * 2);
        const radius = 40 + pulse * 30;
        const alpha = 0.02 + pulse * 0.02;

        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius);
        grd.addColorStop(0, `hsla(142, 75%, 55%, ${alpha})`);
        grd.addColorStop(1, `hsla(142, 75%, 55%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

// Floating SVG marketing icons — thin, elegant strokes
const icons = [
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="4,40 16,28 24,34 44,8" /><polyline points="34,8 44,8 44,18" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="24" cy="24" r="20" /><polyline points="24,12 24,24 34,28" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="24" cy="24" r="20" /><circle cx="24" cy="24" r="13" /><circle cx="24" cy="24" r="6" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><rect x="6" y="28" width="8" height="16" rx="1" /><rect x="20" y="18" width="8" height="26" rx="1" /><rect x="34" y="8" width="8" height="36" rx="1" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="24" cy="24" r="20" /><path d="M24 4 L24 24 L44 24" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><line x1="24" y1="42" x2="24" y2="8" /><polyline points="14,18 24,8 34,18" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="28,4 12,28 24,28 20,44 36,20 24,20" /></svg>,
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 6h40L28 24v14l-8 4V24L4 6z" /></svg>,
];

const floatingItems = [
  { iconIdx: 0, size: 44, x: "7%", y: "10%", delay: 0, duration: 35, drift: 1 },
  { iconIdx: 1, size: 36, x: "85%", y: "14%", delay: 5, duration: 30, drift: 2 },
  { iconIdx: 2, size: 40, x: "45%", y: "5%", delay: 2, duration: 38, drift: 3 },
  { iconIdx: 3, size: 34, x: "22%", y: "78%", delay: 8, duration: 32, drift: 1 },
  { iconIdx: 4, size: 38, x: "5%", y: "44%", delay: 4, duration: 36, drift: 2 },
  { iconIdx: 5, size: 30, x: "56%", y: "88%", delay: 10, duration: 28, drift: 3 },
  { iconIdx: 6, size: 32, x: "3%", y: "84%", delay: 6, duration: 34, drift: 1 },
  { iconIdx: 7, size: 34, x: "76%", y: "58%", delay: 12, duration: 30, drift: 2 },
  { iconIdx: 0, size: 30, x: "64%", y: "22%", delay: 14, duration: 33, drift: 3 },
  { iconIdx: 3, size: 28, x: "90%", y: "80%", delay: 3, duration: 29, drift: 1 },
  { iconIdx: 1, size: 32, x: "16%", y: "26%", delay: 7, duration: 31, drift: 2 },
  { iconIdx: 5, size: 26, x: "38%", y: "52%", delay: 9, duration: 27, drift: 3 },
];

export default function AnimatedBackground() {
  return (
    <>
      <MeshCanvas />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating marketing icons */}
        {floatingItems.map((item, i) => (
          <div
            key={i}
            className={`absolute text-primary/[.1] animate-drift-${item.drift}`}
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
      </div>
    </>
  );
}
