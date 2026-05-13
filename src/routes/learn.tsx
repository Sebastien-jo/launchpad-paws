import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — PawSchool" },
      { name: "description", content: "Tips, tricks, and lessons to train your dog like a pro." },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <main className="mx-auto max-w-2xl px-5 pt-8">
        <header className="mb-6">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-trust/10 text-trust">
            <BookOpen size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-foreground">Learn</h1>
          <p className="text-sm font-medium text-muted-foreground">
            Bite-sized lessons to level up your training.
          </p>
        </header>

        <div className="grid gap-3">
          {["Loose-leash walking", "Recall under distraction", "Crate training basics"].map((t) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-4">
              <div className="text-sm font-bold text-foreground">{t}</div>
              <div className="text-xs font-medium text-muted-foreground">5 min read</div>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
