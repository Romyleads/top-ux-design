import { useEffect, useRef } from "react";

// Full-page canvas with network nodes — covers entire document height
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

    // More nodes, faster movement
    const NODE_COUNT = 80;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1400,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 0.8,
      pulse: Math.random() * Math.PI * 2,
    }));

    const CONNECT_DIST = 180;
    const heroH = 600;

    const draw = () => {
      time += 0.006;
      ctx.clearRect(0, 0, w, h);

      const isHeroVisible = scrollY < heroH;
      const docH = document.documentElement.scrollHeight;
      const footerStart = docH - 400;
      const isFooterVisible = scrollY + h > footerStart;

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
        // Gentle drift
        n.vx += Math.sin(time + n.pulse) * 0.003;
        n.vy += Math.cos(time * 0.7 + n.pulse) * 0.003;
        n.vx *= 0.997;
        n.vy *= 0.997;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -40) n.x = w + 40;
        if (n.x > w + 40) n.x = -40;
        if (n.y < -40) n.y = h + 40;
        if (n.y > h + 40) n.y = -40;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const baseAlpha = 0.15 * (1 - dist / CONNECT_DIST);
            const ny = Math.max(nodes[i].y, nodes[j].y);
            
            // Bright in hero zone (top of viewport when scrolled to top)
            // Bright in footer zone (bottom of viewport when scrolled to bottom)
            const inHeroZone = isHeroVisible && ny < h * 0.65;
            const inFooterZone = isFooterVisible && ny > h * 0.6;
            
            if (inHeroZone || inFooterZone) {
              const pulse = 0.6 + Math.sin(time * 2 + i * 0.1) * 0.4;
              ctx.strokeStyle = `rgba(74, 222, 128, ${baseAlpha * pulse})`;
              ctx.lineWidth = 1;
            } else {
              ctx.strokeStyle = `rgba(22, 163, 74, ${baseAlpha * 0.3})`;
              ctx.lineWidth = 0.6;
            }
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with pulsing glow
      for (const n of nodes) {
        const inHero = isHeroVisible && n.y < h * 0.6;
        const inFooter = isFooterVisible && n.y > h * 0.6;
        const active = inHero || inFooter;
        
        const pulseScale = 1 + Math.sin(time * 3 + n.pulse) * 0.3;
        const alpha = active ? 0.8 * pulseScale : 0.25;
        const glowAlpha = active ? 0.25 * pulseScale : 0.04;
        const color = active ? "74, 222, 128" : "22, 163, 74";
        const glowRadius = active ? n.radius * 10 : n.radius * 5;

        // Glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);
        grd.addColorStop(0, `rgba(${color}, ${glowAlpha})`);
        grd.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * (active ? pulseScale : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      // Energy waves — flowing horizontal lines
      if (isHeroVisible || isFooterVisible) {
        for (let wave = 0; wave < 3; wave++) {
          ctx.beginPath();
          const baseY = isHeroVisible 
            ? h * 0.15 + wave * h * 0.15
            : h * 0.7 + wave * h * 0.08;
          const waveAlpha = 0.03 + Math.sin(time * 2 + wave) * 0.015;
          ctx.strokeStyle = `rgba(74, 222, 128, ${waveAlpha})`;
          ctx.lineWidth = 1.5;
          for (let x = 0; x <= w; x += 4) {
            const y = baseY + Math.sin(x * 0.008 + time * 3 + wave * 2) * 20
                             + Math.sin(x * 0.003 + time * 1.5) * 15;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      // Scan line
      if (isHeroVisible) {
        const scanY = (Math.sin(time * 1.2) + 1) / 2 * Math.min(heroH, h * 0.6);
        const scanGrd = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
        scanGrd.addColorStop(0, "rgba(74, 222, 128, 0)");
        scanGrd.addColorStop(0.5, "rgba(74, 222, 128, 0.035)");
        scanGrd.addColorStop(1, "rgba(74, 222, 128, 0)");
        ctx.fillStyle = scanGrd;
        ctx.fillRect(0, scanY - 30, w, 60);
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

      {/* Accent glows — animated */}
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
