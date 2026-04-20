import { Crown, ExternalLink } from "lucide-react";
import type { Tool2026 } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  tools: Tool2026[];
  variant?: "page" | "card";
}

export default function ToolsStack({ tools, variant = "page" }: Props) {
  const { t } = useLanguage();
  if (!tools || tools.length === 0) return null;

  const isCard = variant === "card";

  return (
    <section
      className={`rounded-xl ${isCard ? "p-3.5" : "p-5 mt-6"}`}
      style={{
        background:
          "linear-gradient(135deg, hsl(220 40% 6% / 0.04), hsl(142 76% 48% / 0.04))",
        border: "1px solid hsl(142 71% 42% / 0.18)",
      }}
      aria-label={t("tools.title")}
    >
      <div className="flex items-center gap-2 mb-1">
        <Crown
          className={`${isCard ? "w-3.5 h-3.5" : "w-4 h-4"} text-primary`}
          strokeWidth={2.2}
        />
        <h3
          className={`${isCard ? "text-[11px]" : "text-[12px]"} font-bold tracking-[0.1em] uppercase text-primary`}
        >
          {t("tools.title")}
        </h3>
      </div>
      {!isCard && (
        <p className="text-[12px] text-t3 mb-3 leading-snug">
          {t("tools.subtitle")}
        </p>
      )}

      <ul
        className={`grid gap-1.5 ${isCard ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} ${isCard ? "" : "mt-2"}`}
      >
        {tools.map((tool, i) => {
          const Wrapper: React.ElementType = tool.url ? "a" : "div";
          const wrapperProps = tool.url
            ? { href: tool.url, target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
            <li key={i}>
              <Wrapper
                {...wrapperProps}
                className={`group flex items-start gap-2 ${isCard ? "py-1.5 px-2" : "py-2 px-2.5"} rounded-lg transition-colors hover:bg-white/60`}
              >
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`${isCard ? "text-[12px]" : "text-[13px]"} font-bold text-foreground leading-tight`}
                    >
                      {tool.name}
                    </span>
                    {tool.premium && (
                      <Crown
                        className="w-3 h-3 flex-shrink-0"
                        strokeWidth={2.4}
                        style={{ color: "hsl(38 92% 50%)" }}
                        aria-label={t("tools.premiumHint")}
                      />
                    )}
                    {tool.url && (
                      <ExternalLink
                        className={`${isCard ? "w-2.5 h-2.5" : "w-3 h-3"} text-t4 opacity-0 group-hover:opacity-100 transition-opacity`}
                        strokeWidth={2}
                      />
                    )}
                  </div>
                  <span
                    className={`${isCard ? "text-[11px]" : "text-[12px]"} text-t3 leading-snug`}
                  >
                    {tool.purpose}
                  </span>
                </div>
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
