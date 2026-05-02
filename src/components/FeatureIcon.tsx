import { FileText, Activity, Clock, Check } from "lucide-react";
import type { CSSProperties } from "react";
import type { TierFeature } from "@/data/services";

const iconMap = {
  size: FileText,
  format: Activity,
  clock: Clock,
  check: Check,
};

interface FeatureIconProps {
  icon: TierFeature["icon"];
}

export default function FeatureIcon({ icon }: FeatureIconProps) {
  const Icon = iconMap[icon];
  return (
    <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
      <Icon className="relative z-10 w-3.5 h-3.5 text-primary" strokeWidth={2} />
    </div>
  );
}
