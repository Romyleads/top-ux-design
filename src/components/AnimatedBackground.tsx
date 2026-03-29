import { useEffect, useRef } from "react";

// Full-page canvas with network nodes + flowing energy lines
function FullPageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0, scrollY = 0;
    let time = 0;
    let mouseX = -500, mouseY = -500;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener("mousemove", onMouse);
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Nodes for network — spread across viewport
    const NODE_COUNT = 55;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.8 + 1,
    }));

    const CONNECT_DIST = 160;
    const heroH = 550;

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, w, h);

      const isHeroVisible = scrollY < heroH;

      // Update nodes
      for (const n of nodes) {
        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 150 && md > 0) {
          const f = (150 - md) / 150 * 0.015;
          n.vx += (dx / md) * f;
          n.vy += (dy / md) * f;
        }
        n.vx *= 0.998;
        n.vy *= 0.998;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -30) n.x = w + 30;
        if (n.x > w + 30) n.x = -30;
        if (n.y < -30) n.y = h + 30;
        if (n.y > h + 30) n.y = -30;
      }

      // Draw connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const baseAlpha = 0.12 * (1 - dist / CONNECT_DIST);
            // In hero (dark bg): bright green. Below hero (light bg): subtle gray-green
            const ny = Math.max(nodes[i].y, nodes[j].y);
            const heroFade = isHeroVisible ? Math.max(0, 1 - (ny / h) * 0.3) : 0;
            
            if (isHeroVisible && ny < h * 0.7) {
              ctx.strokeStyle = `rgba(74, 222, 128, ${baseAlpha * (0.5 + heroFade * 0.5)})`;
            } else {
              ctx.strokeStyle = `rgba(22, 163, 74, ${baseAlpha * 0.35})`;
            }
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const isInHero = isHeroVisible && n.y < h * 0.65;
        const alpha = isInHero ? 0.7 : 0.3;
        const glowAlpha = isInHero ? 0.2 : 0.06;
        const color = isInHero ? "74, 222, 128" : "22, 163, 74";

        // Glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 7);
        grd.addColorStop(0, `rgba(${color}, ${glowAlpha})`);
        grd.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 7, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scan line (hero only)
      if (isHeroVisible) {
        const scanY = (Math.sin(time * 0.8) + 1) / 2 * Math.min(heroH, h * 0.6);
        const scanGrd = ctx.createLinearGradient(0, scanY - 25, 0, scanY + 25);
        scanGrd.addColorStop(0, "rgba(74, 222, 128, 0)");
        scanGrd.addColorStop(0.5, "rgba(74, 222, 128, 0.025)");
        scanGrd.addColorStop(1, "rgba(74, 222, 128, 0)");
        ctx.fillStyle = scanGrd;
        ctx.fillRect(0, scanY - 25, w, 50);
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[2]" />;
}

export default function AnimatedBackground() {
  return (
    <>
      <FullPageCanvas />
      
      {/* Dark gradient hero background — only top */}
      <div className="absolute top-0 left-0 right-0 h-[650px] z-0" style={{
        background: `linear-gradient(180deg, 
          hsl(220, 40%, 6%) 0%, 
          hsl(220, 35%, 8%) 30%, 
          hsl(200, 20%, 12%) 55%,
          hsl(0, 0%, 99%) 100%
        )`
      }} />

      {/* Neon glow in hero */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20 z-0" style={{
        background: `radial-gradient(ellipse, hsl(142, 71%, 45%) 0%, transparent 70%)`
      }} />

      {/* Accent glows */}
      <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] rounded-full opacity-10 animate-float z-0" style={{
        background: `radial-gradient(circle, hsl(160, 80%, 50%) 0%, transparent 70%)`
      }} />
      <div className="absolute top-[25%] left-[8%] w-[250px] h-[250px] rounded-full opacity-[0.07] animate-float-delayed z-0" style={{
        background: `radial-gradient(circle, hsl(142, 90%, 55%) 0%, transparent 70%)`
      }} />

      {/* Grid in hero */}
      <div className="absolute top-0 left-0 right-0 h-[500px] opacity-[0.04] z-0" style={{
        backgroundImage: `linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      {/* Gradient fade hero → content */}
      <div className="absolute top-[500px] left-0 right-0 h-[200px] z-[1]" style={{
        background: `linear-gradient(180deg, transparent 0%, hsl(0, 0%, 99%) 100%)`
      }} />

      {/* Content area — subtle repeating background pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(142, 50%, 45%) 0.5px, transparent 0.5px)`,
        backgroundSize: "32px 32px",
      }} />
    </>
  );
}
