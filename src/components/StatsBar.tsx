import { useState, useEffect, useRef } from "react";
import { services, blocks } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";

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
            // ease-out cubic
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

export default function StatsBar() {
  const hotCount = services.filter((s) => s.hot).length;
  const { t } = useLanguage();

  const s1 = useCountUp(services.length);
  const s2 = useCountUp(blocks.length);
  const s3 = useCountUp(hotCount);

  return (
    <div className="flex justify-center gap-8 sm:gap-16 my-10">
      <div ref={s1.ref} className="text-center group">
        <div className="relative">
          <div className="text-[42px] sm:text-[52px] font-black text-foreground tracking-tighter leading-none transition-transform duration-300 group-hover:scale-110">
            {s1.count}
          </div>
          <div className="absolute -top-1 -right-2 text-[10px] opacity-40">✦</div>
        </div>
        <div className="text-[11.5px] text-t4 mt-1.5 font-semibold uppercase tracking-widest">{t("stats.concepts")}</div>
      </div>
      <div className="w-px h-14 self-center bg-border/60" />
      <div ref={s2.ref} className="text-center group">
        <div className="text-[42px] sm:text-[52px] font-black text-foreground tracking-tighter leading-none transition-transform duration-300 group-hover:scale-110">
          {s2.count}
        </div>
        <div className="text-[11.5px] text-t4 mt-1.5 font-semibold uppercase tracking-widest">{t("stats.blocks")}</div>
      </div>
      <div className="w-px h-14 self-center bg-border/60" />
      <div ref={s3.ref} className="text-center group">
        <div className="text-[42px] sm:text-[52px] font-black bg-gradient-to-br from-primary to-primary-dark bg-clip-text text-transparent tracking-tighter leading-none transition-transform duration-300 group-hover:scale-110">
          {s3.count}
        </div>
        <div className="text-[11.5px] text-primary-dark mt-1.5 font-semibold uppercase tracking-widest">{t("stats.trending")}</div>
      </div>
    </div>
  );
}
