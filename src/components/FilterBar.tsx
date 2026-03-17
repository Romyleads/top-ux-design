import { blocks } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";

interface FilterBarProps {
  activeBlock: string;
  onFilter: (blockId: string) => void;
}

export default function FilterBar({ activeBlock, onFilter }: FilterBarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-1.5 flex-wrap justify-center mb-12">
      <button
        onClick={() => onFilter("all")}
        className={`px-4 py-[7px] rounded-[9px] text-[13px] font-medium border-[1.5px] transition-all duration-150 ${
          activeBlock === "all"
            ? "gradient-primary border-primary text-primary-foreground shadow-[0_2px_8px_rgba(22,163,74,0.25)]"
            : "bg-card border-border text-t3 hover:border-primary hover:text-primary"
        }`}
      >
        {t("filter.all")}
      </button>
      {blocks.map((b) => {
        const blockTitle = t(`block.${b.id}.title`) !== `block.${b.id}.title` ? t(`block.${b.id}.title`) : b.title;
        return (
          <button
            key={b.id}
            onClick={() => onFilter(b.id)}
            className={`px-4 py-[7px] rounded-[9px] text-[13px] font-medium border-[1.5px] transition-all duration-150 ${
              activeBlock === b.id
                ? "gradient-primary border-primary text-primary-foreground shadow-[0_2px_8px_rgba(22,163,74,0.25)]"
                : "bg-card border-border text-t3 hover:border-primary hover:text-primary"
            }`}
          >
            {b.icon} {blockTitle.split(" ")[0]}
          </button>
        );
      })}
    </div>
  );
}
