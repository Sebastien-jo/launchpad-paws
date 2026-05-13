import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: "primary" | "energy" | "trust";
}

const toneMap = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  energy: { bg: "bg-energy/10", text: "text-energy" },
  trust: { bg: "bg-trust/10", text: "text-trust" },
};

export function StatTile({ icon: Icon, label, value, tone }: Props) {
  const t = toneMap[tone];
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${t.bg}`}>
        <Icon className={t.text} size={22} />
      </div>
      <div className="min-w-0">
        <div className="text-xl font-extrabold leading-tight text-foreground">{value}</div>
        <div className="text-xs font-semibold text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
