import { useEffect, useRef } from "react";

/**
 * Animated constellation effect — drawn inside the search input background.
 * Mirrors the global hero canvas style (green nodes + connecting lines)
 * but scoped to the input's own dark surface so typed text stays readable.
 */
export default function SearchConstellation({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = 0;
    let h = 0;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const NODE_COUNT = 18;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.18,
      radius: Math.random() * 1.2 + 0.4,
      pulse: Math.random() * Math.PI * 2,
    }));

    const CONNECT_DIST = 90;

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, w, h);

      const intensity = activeRef.current ? 1 : 0.55;

      for (const n of nodes) {
        n.vx += Math.sin(time + n.pulse) * 0.002;
        n.vy += Math.cos(time * 0.7 + n.pulse) * 0.0015;
        n.vx *= 0.985;
        n.vy *= 0.985;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const a = 0.18 * (1 - dist / CONNECT_DIST) * intensity;
            ctx.strokeStyle = `rgba(74, 222, 128, ${a})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes with subtle pulsing glow
      for (const n of nodes) {
        const pulseScale = 1 + Math.sin(time * 3 + n.pulse) * 0.4;
        const glowR = n.radius * 6;
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grd.addColorStop(0, `rgba(74, 222, 128, ${0.28 * intensity * pulseScale})`);
        grd.addColorStop(1, "rgba(74, 222, 128, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(180, 255, 200, ${0.7 * intensity * pulseScale})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulseScale, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
    />
  );
}
