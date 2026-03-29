import { useState, useEffect, useCallback } from "react";
import { services } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";

const namesByLocale: Record<Locale, string[]> = {
  uk: [
    "Олександр", "Марія", "Дмитро", "Анна", "Максим", "Катерина",
    "Андрій", "Юлія", "Сергій", "Вікторія", "Іван", "Наталія",
    "Михайло", "Ольга", "Артем", "Тетяна", "Роман", "Ірина",
  ],
  en: [
    "Alexander", "Maria", "James", "Anna", "Max", "Catherine",
    "Andrew", "Julia", "Sergei", "Victoria", "John", "Natalie",
    "Michael", "Olga", "Arthur", "Tatiana", "Roman", "Irene",
  ],
  de: [
    "Alexander", "Marie", "Dmitri", "Anna", "Maximilian", "Katharina",
    "Andreas", "Julia", "Sergej", "Viktoria", "Johann", "Natalie",
    "Michael", "Olga", "Artem", "Tatjana", "Roman", "Irene",
  ],
};

const citiesByLocale: Record<Locale, string[]> = {
  uk: ["Київ", "Львів", "Одеса", "Харків", "Дніпро", "Запоріжжя", "Вінниця", "Полтава", "Варшава", "Берлін", "Прага", "Лондон"],
  en: ["Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro", "Zaporizhzhia", "Vinnytsia", "Poltava", "Warsaw", "Berlin", "Prague", "London"],
  de: ["Kyjiw", "Lwiw", "Odessa", "Charkiw", "Dnipro", "Saporischschja", "Winnyzja", "Poltawa", "Warschau", "Berlin", "Prag", "London"],
};

export default function SocialProof() {
  const { t, locale } = useLanguage();
  const [notification, setNotification] = useState<{
    id: number; nameIdx: number; cityIdx: number; emoji: string; serviceId: string; tierIdx: number; mins: number;
  } | null>(null);
  const [visible, setVisible] = useState(false);

  const generateNotification = useCallback(() => {
    const service = services[Math.floor(Math.random() * services.length)];
    const nameIdx = Math.floor(Math.random() * namesByLocale.uk.length);
    const cityIdx = Math.floor(Math.random() * citiesByLocale.uk.length);
    const tierIdx = Math.floor(Math.random() * service.tiers.length);
    const mins = Math.floor(Math.random() * 55) + 2;
    return { id: Date.now(), nameIdx, cityIdx, emoji: service.emoji, serviceId: service.id, tierIdx, mins };
  }, []);

  const showNotification = useCallback(() => {
    setNotification(generateNotification());
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  }, [generateNotification]);

  useEffect(() => {
    const initial = setTimeout(showNotification, 15000);
    const interval = setInterval(showNotification, 25000 + Math.random() * 20000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, [showNotification]);

  if (!notification) return null;

  const names = namesByLocale[locale];
  const cities = citiesByLocale[locale];
  const displayName = names[notification.nameIdx] || names[0];
  const displayCity = cities[notification.cityIdx] || cities[0];
  const serviceName = t(`service.${notification.serviceId}.name`);
  const service = services.find(s => s.id === notification.serviceId);
  const tierName = service?.tiers[notification.tierIdx]?.name ?? "";

  const timeText = notification.mins < 60
    ? `${notification.mins} ${t("social.minAgo")}`
    : `${Math.floor(notification.mins / 60)} ${t("social.hrAgo")}`;

  return (
    <div
      className={`fixed bottom-24 left-4 z-40 max-w-[320px] transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] px-4 py-3 flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-lg flex-shrink-0">
          {notification.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] text-foreground leading-snug font-medium">
            <span className="font-bold">{displayName}</span>
            <span className="text-t3"> {t("social.from")} {displayCity}</span>
          </p>
          <p className="text-[11.5px] text-t3 leading-snug mt-0.5">
            {t("social.ordered")} <span className="font-semibold text-t2">{serviceName}</span>
            <span className="text-t4"> · {tierName}</span>
          </p>
          <p className="text-[10px] text-t4 mt-1">{timeText}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-t4 hover:text-t2 transition-colors text-xs mt-0.5 flex-shrink-0"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
