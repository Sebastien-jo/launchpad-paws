import { Trophy, Flame, Star } from "lucide-react";

const badges = [
  { icon: Trophy, label: "Trainer Badge", color: "text-energy" },
  { icon: Star, label: "First Session", color: "text-primary" },
  { icon: Flame, label: "7-Day Streak", color: "text-trust" },
];

export function AchievementBadges() {
  return (
    <div className="flex items-center justify-center gap-3">
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex flex-col items-center gap-1 opacity-40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
            <b.icon className={`${b.color}`} size={22} />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
