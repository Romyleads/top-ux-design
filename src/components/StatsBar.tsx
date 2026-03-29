import { useState, useEffect, useRef, useCallback } from "react";
import { services, blocks } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutGrid, Layers, Flame } from "lucide-react";

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function useParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState([0, 0, 0]);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = window.innerHeight / 2;
    const distance = (rect.top + rect.height / 2 - center) / window.innerHeight;
    // Each stat moves at a different parallax speed
    setOffsets([
      distance * -40,
      distance * -65,
      distance * -50,
    ]);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { containerRef, offsets };
}

interface StatItemProps {
  countRef: React.RefObject<HTMLDivElement>;
  count: number;
  label: string;
  icon: React.ElementType;
  accent?: boolean;
  offsetY: number;
}

function StatItem({ countRef, count, label, icon: Icon, accent, offsetY }: StatItemProps) {
  return (
    <div
      ref={countRef}
      className="text-center group flex-1 py-2 will-change-transform"
      style={{ transform: `translateY(${offsetY}px)`, transition: 'transform 0.1s linear' }}
    >
      <div className="flex items-center justify-center gap-2.5 mb-1.5">
        <Icon className={`w-5 h-5 ${accent ? "text-primary" : "text-white/40"}`} strokeWidth={1.5} />
        <span
          className="text-[48px] sm:text-[56px] font-black tracking-tighter leading-none transition-transform duration-500 group-hover:scale-110"
          style={{
            background: accent
              ? 'linear-gradient(135deg, hsl(142 71% 42%), hsl(148 60% 30%))'
              : 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 75%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
          }}
        >
          {count}
        </span>
      </div>
      <div className={`text-[9px] font-bold uppercase tracking-[0.2em] ${accent ? "text-primary/70" : "text-white/40"}`}>
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const hotCount = services.filter((s) => s.hot).length;
  const { t } = useLanguage();

  const s1 = useCountUp(services.length);
  const s2 = useCountUp(blocks.length);
  const s3 = useCountUp(hotCount);
  const { containerRef, offsets } = useParallax();

  return (
    <div ref={containerRef} className="flex items-center justify-center my-4 mx-auto max-w-lg gap-6 sm:gap-10 overflow-visible py-4">
      <StatItem countRef={s1.ref} count={s1.count} label={t("stats.concepts")} icon={LayoutGrid} offsetY={offsets[0]} />
      <StatItem countRef={s2.ref} count={s2.count} label={t("stats.blocks")} icon={Layers} offsetY={offsets[1]} />
      <StatItem countRef={s3.ref} count={s3.count} label={t("stats.trending")} icon={Flame} accent offsetY={offsets[2]} />
    </div>
  );
}
