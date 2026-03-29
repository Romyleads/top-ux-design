import { blocks } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";

interface FilterBarProps {
  activeBlock: string;
  onFilter: (blockId: string) => void;
}

export default function FilterBar({ activeBlock, onFilter }: FilterBarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-12">
      <button
        onClick={() => onFilter("all")}
        className={`px-4 py-[7px] rounded-full text-[13px] font-semibold border-[1.5px] transition-all duration-200 ${
          activeBlock === "all"
            ? "gradient-primary border-primary text-primary-foreground shadow-green"
            : "glass border-border/60 text-t2 hover:border-primary/40 hover:text-primary hover:shadow-sm"
        }`}
      >
        {t("filter.all")}
      </button>
      {blocks.map((b) => {
        const blockTitle = t(`block.${b.id}.title`);
        return (
          <button
            key={b.id}
            onClick={() => onFilter(b.id)}
            className={`px-4 py-[7px] rounded-full text-[13px] font-semibold border-[1.5px] transition-all duration-200 ${
              activeBlock === b.id
                ? "gradient-primary border-primary text-primary-foreground shadow-green"
                : "glass border-border/60 text-t2 hover:border-primary/40 hover:text-primary hover:shadow-sm"
            }`}
          >
            {b.icon} {blockTitle.split(" ")[0]}
          </button>
        );
      })}
    </div>
  );
}
