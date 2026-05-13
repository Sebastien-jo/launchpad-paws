import { Link, useLocation } from "@tanstack/react-router";
import { Target, BookOpen, LayoutDashboard, Briefcase, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Tab = {
  to: "/goals" | "/learn" | "/dashboard" | "/workspace" | "/profile";
  label: string;
  icon: LucideIcon;
};

const tabs: Tab[] = [
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/workspace", label: "Workspace", icon: Briefcase },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-2xl items-stretch justify-between px-2 py-2">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 2}
                  className={active ? "fill-foreground/10" : ""}
                />
                <span className={`text-[11px] ${active ? "font-bold" : "font-semibold"}`}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
