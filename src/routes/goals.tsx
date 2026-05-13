import { createFileRoute } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Goals — PawSchool" },
      { name: "description", content: "Set and track training goals for your dogs." },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <main className="mx-auto max-w-2xl px-5 pt-8">
        <header className="mb-6">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Target size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-foreground">Your Goals</h1>
          <p className="text-sm font-medium text-muted-foreground">
            Define what you and your pack want to achieve.
          </p>
        </header>

        <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            No goals yet — add your first training goal to get started.
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
