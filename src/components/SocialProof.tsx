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
  const { t } = useLanguage();
  const [notification, setNotification] = useState<{
    id: number; name: string; city: string; emoji: string; serviceName: string; tierName: string; mins: number;
  } | null>(null);
  const [visible, setVisible] = useState(false);

  const generateNotification = useCallback(() => {
    const service = services[Math.floor(Math.random() * services.length)];
    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const tier = service.tiers[Math.floor(Math.random() * service.tiers.length)];
    const mins = Math.floor(Math.random() * 55) + 2;
    return { id: Date.now(), name, city, emoji: service.emoji, serviceName: service.name, tierName: tier.name, mins };
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

  const timeText = notification.mins < 60
    ? `${notification.mins} ${t("social.minAgo")}`
    : `${Math.floor(notification.mins / 60)} ${t("social.hrAgo")}`;

  return (
    <div
      className={`fixed bottom-24 left-4 z-40 max-w-[320px] transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] px-4 py-3 flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-lg flex-shrink-0">
          {notification.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] text-foreground leading-snug font-medium">
            <span className="font-bold">{notification.name}</span>
            <span className="text-t3"> {t("social.from")} {notification.city}</span>
          </p>
          <p className="text-[11.5px] text-t3 leading-snug mt-0.5">
            {t("social.ordered")} <span className="font-semibold text-t2">{notification.serviceName}</span>
            <span className="text-t4"> · {notification.tierName}</span>
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
