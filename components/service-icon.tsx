import { BrainCircuit, Compass, Network, type LucideProps } from "lucide-react";
import type { ServiceKey } from "@/lib/services";

const icons = {
  "it-consulting": Compass,
  "network-services": Network,
  "ai-innovation": BrainCircuit,
} as const;

export const serviceTone: Record<ServiceKey, { text: string; bg: string; ring: string; hex: string }> = {
  "it-consulting": { text: "text-electric", bg: "bg-electric/10", ring: "ring-electric/30", hex: "#3478F6" },
  "network-services": { text: "text-aqua", bg: "bg-aqua/10", ring: "ring-aqua/30", hex: "#19D4E5" },
  "ai-innovation": { text: "text-iris", bg: "bg-iris/10", ring: "ring-iris/30", hex: "#9275FF" },
};

export function ServiceIcon({ service, ...props }: { service: ServiceKey } & LucideProps) {
  const Icon = icons[service];
  return <Icon aria-hidden {...props} />;
}
