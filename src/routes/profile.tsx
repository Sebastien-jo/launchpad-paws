import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, LogOut, Trophy, Flame, Dog as DogIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — PawSchool" },
      { name: "description", content: "Your trainer profile, stats, and account settings." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <main className="mx-auto max-w-2xl px-5 pt-8">
        {/* Header with settings */}
        <div className="mb-6 flex items-start justify-between">
          <h1 className="text-2xl font-black text-foreground">Profile</h1>
          <Link
            to="/profile"
            aria-label="Settings"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-foreground transition hover:bg-muted"
          >
            <Settings size={20} />
          </Link>
        </div>

        {/* Profile card */}
        <section className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
          <div className="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-trust shadow-md ring-4 ring-card" />
          <h2 className="mt-4 text-xl font-black text-foreground">Sarah Johnson</h2>
          <p className="text-xs font-semibold text-muted-foreground">Trainer · Level 4</p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat icon={Trophy} value="12" label="Sessions" />
            <Stat icon={Flame} value="5" label="Streak" />
            <Stat icon={DogIcon} value="3" label="Dogs" />
          </div>
        </section>

        {/* Settings button */}
        <Button variant="outline" size="lg" className="mt-5 w-full">
          <Settings size={18} /> Settings
        </Button>

        {/* Account list */}
        <section className="mt-5 overflow-hidden rounded-3xl border border-border bg-card">
          {[
            { label: "Edit profile" },
            { label: "Notifications" },
            { label: "Subscription" },
            { label: "Help & support" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center justify-between border-b border-border px-5 py-4 text-left text-sm font-semibold text-foreground transition last:border-b-0 hover:bg-muted"
            >
              {item.label}
              <span className="text-muted-foreground">›</span>
            </button>
          ))}
        </section>

        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-4 text-sm font-bold text-soft-error transition hover:bg-muted">
          <LogOut size={16} /> Log out
        </button>
      </main>
      <BottomNav />
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Trophy; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-muted/60 p-3">
      <Icon size={16} className="mx-auto text-muted-foreground" />
      <div className="mt-1 text-base font-black text-foreground">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
