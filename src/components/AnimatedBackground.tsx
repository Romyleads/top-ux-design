import { useEffect, useRef } from "react";

// High-visibility neon mesh canvas on dark background
function NeonMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;
    let time = 0;
    let mouseX = -500, mouseY = -500;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener("mousemove", onMouse);

    // Nodes for the network
    const NODE_COUNT = 50;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.5,
    }));

    const CONNECT_DIST = 180;

    const draw = () => {
      time += 0.004;
      ctx.clearRect(0, 0, w, h);

      // Only render in the hero area (top 600px) with full intensity
      // Then fade out below
      const heroH = Math.min(600, h * 0.7);

      // Update nodes
      for (const n of nodes) {
        // Mouse repulsion
        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 180 && md > 0) {
          const f = (180 - md) / 180 * 0.02;
          n.vx += (dx / md) * f;
          n.vy += (dy / md) * f;
        }
        n.vx *= 0.998;
        n.vy *= 0.998;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -30) n.x = w + 30;
        if (n.x > w + 30) n.x = -30;
        if (n.y < -30) n.y = heroH + 200;
        if (n.y > heroH + 200) n.y = -30;
      }

      // Draw connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const a = 0.15 * (1 - dist / CONNECT_DIST);
            const fadeY = Math.max(nodes[i].y, nodes[j].y);
            const fade = fadeY > heroH ? Math.max(0, 1 - (fadeY - heroH) / 200) : 1;
            ctx.strokeStyle = `rgba(74, 222, 128, ${a * fade})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      for (const n of nodes) {
        const fade = n.y > heroH ? Math.max(0, 1 - (n.y - heroH) / 200) : 1;
        if (fade <= 0) continue;

        // Glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 8);
        grd.addColorStop(0, `rgba(74, 222, 128, ${0.25 * fade})`);
        grd.addColorStop(1, `rgba(74, 222, 128, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 8, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(134, 239, 172, ${0.8 * fade})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Animated scan line
      const scanY = (Math.sin(time * 0.8) + 1) / 2 * heroH;
      const scanGrd = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrd.addColorStop(0, "rgba(74, 222, 128, 0)");
      scanGrd.addColorStop(0.5, "rgba(74, 222, 128, 0.03)");
      scanGrd.addColorStop(1, "rgba(74, 222, 128, 0)");
      ctx.fillStyle = scanGrd;
      ctx.fillRect(0, scanY - 30, w, 60);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />;
}

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dark gradient hero background */}
      <div className="absolute top-0 left-0 right-0 h-[650px]" style={{
        background: `linear-gradient(180deg, 
          hsl(220, 40%, 6%) 0%, 
          hsl(220, 35%, 8%) 30%, 
          hsl(200, 20%, 12%) 60%,
          hsl(0, 0%, 99%) 100%
        )`
      }} />

      {/* Neon green radial glow in hero */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20" style={{
        background: `radial-gradient(ellipse, hsl(142, 71%, 45%) 0%, transparent 70%)`
      }} />

      {/* Secondary accent glow */}
      <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] rounded-full opacity-10 animate-float" style={{
        background: `radial-gradient(circle, hsl(160, 80%, 50%) 0%, transparent 70%)`
      }} />
      <div className="absolute top-[25%] left-[8%] w-[250px] h-[250px] rounded-full opacity-[0.07] animate-float-delayed" style={{
        background: `radial-gradient(circle, hsl(142, 90%, 55%) 0%, transparent 70%)`
      }} />

      {/* Canvas network animation */}
      <NeonMeshCanvas />

      {/* Subtle grid in hero */}
      <div className="absolute top-0 left-0 right-0 h-[500px] opacity-[0.04] z-[1]" style={{
        backgroundImage: `linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      {/* Gradient fade to content area */}
      <div className="absolute top-[500px] left-0 right-0 h-[200px] z-[2]" style={{
        background: `linear-gradient(180deg, transparent 0%, hsl(0, 0%, 99%) 100%)`
      }} />
    </div>
  );
}
