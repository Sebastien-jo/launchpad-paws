import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/workspace")({
  head: () => ({
    meta: [
      { title: "Workspace — PawSchool" },
      { name: "description", content: "Your training workspace: notes, plans, and active sessions." },
    ],
  }),
  component: WorkspacePage,
});

function WorkspacePage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <main className="mx-auto max-w-2xl px-5 pt-8">
        <header className="mb-6">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-energy/10 text-energy">
            <Briefcase size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-foreground">Workspace</h1>
          <p className="text-sm font-medium text-muted-foreground">
            Plan sessions, jot notes, and keep training organized.
          </p>
        </header>

        <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Your workspace is empty — start a session to see it here.
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
