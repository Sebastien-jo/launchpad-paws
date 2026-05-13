import { useMemo, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Lock, Check, Sparkles, Trees, Home, Brain, Users, Dumbbell, Flame } from "lucide-react";
import { useDog } from "@/data/dogs-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FloatingPaws } from "@/components/FloatingPaws";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/dogs/$dogId/exercises")({
  component: DogExercisePage,
});

type Session = {
  id: number;
  level: number;
  title: string;
  category: "Indoor" | "Outdoor" | "Mental" | "Social";
  tags: string[];
  totalIterations: number;
  completedIterations: number;
  unlocked: boolean;
  completed: boolean;
};

const SESSIONS: Session[] = [
  { id: 1, level: 1, title: "Basic Obedience", category: "Indoor", tags: ["#sit", "#stay", "#look"], totalIterations: 5, completedIterations: 5, unlocked: true, completed: true },
  { id: 2, level: 2, title: "Focus & Recall", category: "Outdoor", tags: ["#recall", "#focus", "#come"], totalIterations: 5, completedIterations: 3, unlocked: true, completed: false },
  { id: 3, level: 3, title: "Leash Mastery", category: "Outdoor", tags: ["#heel", "#loose-leash", "#stop"], totalIterations: 5, completedIterations: 0, unlocked: false, completed: false },
  { id: 4, level: 4, title: "Social Skills", category: "Social", tags: ["#greet", "#calm", "#play"], totalIterations: 5, completedIterations: 0, unlocked: false, completed: false },
  { id: 5, level: 5, title: "Puzzle Solving", category: "Mental", tags: ["#search", "#problem", "#patience"], totalIterations: 5, completedIterations: 0, unlocked: false, completed: false },
  { id: 6, level: 6, title: "Agility Basics", category: "Outdoor", tags: ["#jump", "#weave", "#tunnel"], totalIterations: 5, completedIterations: 0, unlocked: false, completed: false },
];

const CATEGORIES = [
  { name: "All", icon: Dumbbell },
  { name: "Indoor", icon: Home },
  { name: "Outdoor", icon: Trees },
  { name: "Mental", icon: Brain },
  { name: "Social", icon: Users },
] as const;

const TAG_COLORS: Record<string, string> = {
  Indoor: "bg-primary/15 text-primary border-primary/30",
  Outdoor: "bg-energy/15 text-energy border-energy/30",
  Mental: "bg-trust/15 text-trust border-trust/30",
  Social: "bg-soft-error/15 text-soft-error border-soft-error/30",
};

function DogExercisePage() {
  const { dogId } = useParams({ from: "/dogs/$dogId/exercises" });
  const dog = useDog(dogId);
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(
    () => (category === "All" ? SESSIONS : SESSIONS.filter((s) => s.category === category)),
    [category],
  );

  const completedCount = SESSIONS.filter((s) => s.completed).length;

  return (
    <div className="relative min-h-screen bg-background pb-28">
      <FloatingPaws />

      <main className="relative z-10 mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="icon" className="rounded-2xl">
            <Link to="/dashboard" aria-label="Back to dashboard">
              <ArrowLeft size={18} />
            </Link>
          </Button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Training Quests</p>
            <h1 className="truncate text-2xl font-black text-foreground sm:text-3xl">
              {dog?.name ?? "Your dog"}'s Journey 🎯
            </h1>
          </div>
        </div>

        {/* Hero progress */}
        <section className="mt-5 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-card p-5 shadow-sm">
          <div className="flex items-center gap-4">
            {dog?.avatar && (
              <img
                src={dog.avatar}
                alt={dog.name}
                className="h-16 w-16 rounded-2xl border-2 border-card object-cover shadow-md"
                style={{ width: 64, height: 64 }}
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-energy" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-energy">
                  {completedCount} / {SESSIONS.length} levels mastered
                </span>
              </div>
              <Progress value={(completedCount / SESSIONS.length) * 100} className="mt-2 h-2.5" />
              <p className="mt-1.5 text-xs font-medium text-muted-foreground">
                Complete every iteration to unlock the next level.
              </p>
            </div>
          </div>
        </section>

        {/* Category filter */}
        <section className="mt-6">
          <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <div className="flex gap-2">
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                const active = category === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setCategory(c.name)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 px-4 py-2 text-xs font-bold transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    <Icon size={14} />
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sessions */}
        <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full rounded-3xl border-2 border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
              No sessions in this category yet.
            </p>
          )}
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function SessionCard({ session }: { session: Session }) {
  const pct = (session.completedIterations / session.totalIterations) * 100;
  const locked = !session.unlocked;
  const completed = session.completed;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border-2 bg-card shadow-sm transition-all duration-300 ${
        locked
          ? "border-border opacity-60 grayscale cursor-not-allowed"
          : completed
            ? "border-primary/50 hover:-translate-y-1 hover:shadow-xl"
            : "border-energy ring-2 ring-energy/20 hover:-translate-y-1 hover:shadow-xl animate-pulse-glow"
      }`}
    >
      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card/90 text-muted-foreground shadow-lg">
            <Lock size={24} />
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Level badge */}
          <div
            className={`inline-flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-black uppercase tracking-wider shadow-sm ${
              completed
                ? "bg-primary text-primary-foreground"
                : locked
                  ? "bg-muted text-muted-foreground"
                  : "bg-energy text-energy-foreground"
            }`}
          >
            <Sparkles size={12} />
            Level {session.level}
          </div>

          {completed && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-extrabold text-primary">
              <Check size={12} strokeWidth={3} /> Completed
            </span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-extrabold leading-tight text-foreground">{session.title}</h3>
        <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {session.category}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {session.tags.map((t) => (
            <span
              key={t}
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${TAG_COLORS[session.category]}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-xs font-bold text-muted-foreground">
              {session.completedIterations} / {session.totalIterations} sessions
            </span>
            <span className="text-xs font-extrabold text-foreground">{Math.round(pct)}%</span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>

        {/* Action */}
        <Button
          className="mt-4 w-full"
          variant={completed ? "outline" : "energy"}
          disabled={locked}
        >
          {locked ? "Locked" : completed ? "Replay session" : "Continue training"}
        </Button>
      </div>
    </div>
  );
}
