import { FileText, Activity, Clock, Check } from "lucide-react";
import type { TierFeature } from "@/data/services";

const iconMap = {
  size: FileText,
  format: Activity,
  clock: Clock,
  check: Check,
};

export default function FeatureIcon({ icon }: { icon: TierFeature["icon"] }) {
  const Icon = iconMap[icon];
  return (
    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0">
      <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
    </div>
  );
}
