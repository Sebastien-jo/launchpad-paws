import { Clock, BarChart3, Sparkles, Pencil, Home, Trees, Brain } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Dog } from "@/data/dogs-store";

export type { Dog };

const accentMap = {
  primary: "bg-primary",
  energy: "bg-energy",
  trust: "bg-trust",
};

export function DogCard({ dog }: { dog: Dog }) {
  const pct = Math.round((dog.xp / dog.xpMax) * 100);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-1.5 w-full ${accentMap[dog.accent]}`} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={dog.avatar}
              alt={dog.name}
              loading="lazy"
              width={72}
              height={72}
              className="h-18 w-18 rounded-2xl border-2 border-card object-cover shadow-md"
              style={{ width: 72, height: 72 }}
            />
            <div className={`absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full ${accentMap[dog.accent]} text-xs font-black text-white shadow-md ring-2 ring-card`}>
              {dog.level}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xl font-extrabold leading-tight text-foreground">
              {dog.name}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">{dog.breed}</p>
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-energy/20 to-primary/20 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-foreground ring-1 ring-energy/40">
              <Sparkles size={10} className="text-energy" />
              Legacy · Lvl {dog.level}
            </div>
          </div>

          <Link
            to="/dogs/$dogId/edit"
            params={{ dogId: dog.id }}
            aria-label={`Edit ${dog.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-trust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Pencil size={16} />
          </Link>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-xs font-bold text-muted-foreground">
              {dog.xp} / {dog.xpMax} XP
            </span>
            <span className="text-xs font-extrabold text-foreground">{pct}%</span>
          </div>
          <Progress value={pct} className="h-2.5" />
        </div>

        <div className="mt-4 space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart3 size={14} className="text-trust" />
            <span>Last trained: <span className="font-semibold text-foreground">{dog.lastTrained}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className={dog.ready ? "text-primary" : "text-energy"} />
            <span className={`text-xs font-bold uppercase tracking-wide ${dog.ready ? "text-primary" : "text-energy"}`}>
              {dog.ready ? "Ready for training!" : `Next session: ${dog.nextSession}`}
            </span>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button asChild className="flex-1" size="default">
            <Link to="/dogs/$dogId/exercises" params={{ dogId: dog.id }}>Start Training</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 border-trust text-trust hover:bg-trust hover:text-trust-foreground" size="default">
            <Link to="/dogs/$dogId/exercises" params={{ dogId: dog.id }}>View Progress</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

