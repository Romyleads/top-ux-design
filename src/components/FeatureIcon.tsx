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
  return <Icon className="w-[15px] h-[15px] text-border flex-shrink-0" strokeWidth={1.5} />;
}
