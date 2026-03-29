import { useState, useEffect, useRef } from "react";
import { services, blocks } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutGrid, Layers, Flame } from "lucide-react";

function useCountUp(target: number, duration = 1500) {
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

interface StatItemProps {
  countRef: React.RefObject<HTMLDivElement>;
  count: number;
  label: string;
  icon: React.ElementType;
  accent?: boolean;
}

function StatItem({ countRef, count, label, icon: Icon, accent }: StatItemProps) {
  return (
    <div ref={countRef} className="text-center group flex-1">
      <div className="flex items-center justify-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${accent ? "text-primary" : "text-t3"}`} strokeWidth={1.8} />
        <span className={`text-[34px] sm:text-[42px] font-black tracking-tighter leading-none transition-transform duration-300 group-hover:scale-110 ${
          accent
            ? "bg-gradient-to-br from-primary to-primary-dark bg-clip-text text-transparent"
            : "text-foreground"
        }`}>
          {count}
        </span>
      </div>
      <div className={`text-[9px] font-bold uppercase tracking-[0.18em] ${accent ? "text-primary-dark" : "text-t4"}`}>
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

  return (
    <div className="flex items-center my-8 rounded-2xl py-4 px-6 sm:px-10 mx-auto max-w-md border border-border/40" style={{
      background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.85), hsl(0 0% 100% / 0.65))',
      backdropFilter: 'blur(20px) saturate(1.6)',
      boxShadow: '0 4px 24px -8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
    }}>
      <StatItem countRef={s1.ref} count={s1.count} label={t("stats.concepts")} icon={LayoutGrid} />
      <div className="w-px h-8 bg-border/30 mx-2" />
      <StatItem countRef={s2.ref} count={s2.count} label={t("stats.blocks")} icon={Layers} />
      <div className="w-px h-8 bg-border/30 mx-2" />
      <StatItem countRef={s3.ref} count={s3.count} label={t("stats.trending")} icon={Flame} accent />
    </div>
  );
}
