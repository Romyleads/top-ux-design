import { FileText, Activity, Clock, Check } from "lucide-react";
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
    <div className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center">
      <Icon className="relative z-10 w-3.5 h-3.5 text-primary" strokeWidth={2} />
    </div>
  );
}
