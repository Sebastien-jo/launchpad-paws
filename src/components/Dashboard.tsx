import { useState } from "react";
import {
  Flame,
  Trophy,
  Dog as DogIcon,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DogCard } from "@/components/DogCard";
import { StatTile } from "@/components/StatTile";
import { FloatingPaws } from "@/components/FloatingPaws";
import { BottomNav } from "@/components/BottomNav";
import { useDogs } from "@/data/dogs-store";

const filters = ["All Dogs", "Ready to Train", "Needs Attention"] as const;
type Filter = (typeof filters)[number];

export function Dashboard() {
  const [filter, setFilter] = useState<Filter>("All Dogs");
  const dogs = useDogs();

  const filtered = dogs.filter((d) => {
    if (filter === "Ready to Train") return d.ready;
    if (filter === "Needs Attention") return !d.ready && d.xp / d.xpMax < 0.5;
    return true;
  });

  return (
    <div className="relative min-h-screen bg-background pb-28">
      <FloatingPaws />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        {/* Greeting */}
        <section className="animate-fade-in">
          <h1 className="text-2xl font-black leading-tight text-foreground sm:text-3xl">
            Welcome back, Sarah! <span className="inline-block animate-pulse">👋</span>
          </h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Your pack is wagging — let's keep the streak alive.
          </p>
        </section>

        {/* Streak banner */}
        <section className="mt-5 overflow-hidden rounded-3xl border border-energy/30 bg-gradient-to-br from-energy/15 via-energy/5 to-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-energy text-energy-foreground shadow-lg animate-pulse-glow">
                <Flame size={28} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-2xl font-black text-foreground sm:text-3xl">
                  5-day streak 🔥
                </div>
                <div className="text-xs font-semibold text-muted-foreground sm:text-sm">
                  Two more sessions to unlock the <span className="text-energy">Trainer Badge</span>
                </div>
              </div>
            </div>
            <Button variant="energy" size="lg" className="hidden sm:inline-flex">
              <Sparkles size={18} /> Today's Session
            </Button>
          </div>
        </section>

        {/* Stat tiles */}
        <section className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatTile icon={Trophy} label="Sessions completed" value="12" tone="primary" />
          <StatTile icon={Flame} label="Current streak" value="5 days" tone="energy" />
          <StatTile icon={DogIcon} label="Dogs in your pack" value="3" tone="trust" />
        </section>

        {/* Filters + search */}
        <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">Your Pack</h2>
            <p className="text-xs font-medium text-muted-foreground">
              Tap a card to start their next session
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Search a dog…" className="pl-9 h-10" />
          </div>
        </section>

        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border-2 px-4 py-1.5 text-xs font-bold transition ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/50"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Dog grid */}
        {filtered.length > 0 ? (
          <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <DogCard key={d.id} dog={d} />
            ))}
          </section>
        ) : (
          <EmptyState />
        )}

        {/* Add new dog CTA */}
        <section className="mt-6 flex justify-center">
          <Button variant="outline" size="lg" className="border-2 border-dashed border-primary/40 text-primary hover:bg-primary/5">
            <Plus size={18} /> Add New Dog
          </Button>
        </section>

        {/* Tips */}
        <section className="mt-10 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-trust/15 text-trust">
              <Sparkles size={16} />
            </div>
            <h3 className="text-base font-extrabold text-foreground">Getting Started with Max</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Keep sessions short — 5 to 10 minutes works best for retrievers.",
              "Reward immediately. Treat within 1 second of the right behavior.",
              "End on a win to build excitement for the next session.",
            ].map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-black text-primary">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

      </main>
      <BottomNav />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-5 flex flex-col items-center rounded-3xl border-2 border-dashed border-border bg-card/50 px-6 py-12 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
        <DogIcon size={40} strokeWidth={2} />
      </div>
      <h3 className="text-xl font-black text-foreground">No dogs match this filter</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Try a different filter, or add a new pup to your pack to begin their training journey.
      </p>
      <Button className="mt-5" size="lg">
        <Plus size={18} /> Add Your First Dog
      </Button>
    </div>
  );
}
