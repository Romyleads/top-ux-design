import { blocks } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";
import { Printer, Monitor, Palette, PenLine, Mail, Clapperboard, Megaphone, TrendingUp } from "lucide-react";

const blockIcons: Record<string, React.ElementType> = {
  b1: Printer, b2: Monitor, b3: Palette, b4: PenLine,
  b5: Mail, b6: Clapperboard, b7: Megaphone, b8: TrendingUp,
};

interface FilterBarProps {
  activeBlock: string;
  onFilter: (blockId: string) => void;
}

export default function FilterBar({ activeBlock, onFilter }: FilterBarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-8">
      <button
        onClick={() => onFilter("all")}
        className={`px-4 py-[7px] rounded-full text-[13px] font-semibold border-[1.5px] transition-[transform,color,border-color,box-shadow,background-color] duration-300 ${
          activeBlock === "all"
            ? "gradient-primary border-primary text-primary-foreground shadow-green"
            : "glass border-border/60 text-t2 hover:border-primary/40 hover:text-primary hover:shadow-sm"
        }`}
      >
        {t("filter.all")}
      </button>
      {blocks.map((b) => {
        const blockTitle = t(`block.${b.id}.title`);
        const Icon = blockIcons[b.id];
        const isActive = activeBlock === b.id;
        return (
          <button
            key={b.id}
            onClick={() => onFilter(b.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-[7px] rounded-full text-[13px] font-semibold border-[1.5px] transition-[transform,color,border-color,box-shadow,background-color] duration-300 ${
              isActive
                ? "gradient-primary border-primary text-primary-foreground shadow-green"
                : "glass border-border/60 text-t2 hover:border-primary/40 hover:text-primary hover:shadow-sm"
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={2} />}
            {blockTitle.split(" ")[0]}
          </button>
        );
      })}
    </div>
  );
}
