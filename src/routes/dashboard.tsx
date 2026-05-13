import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/Dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PawSchool" },
      { name: "description", content: "Track your dog's training progress, streaks, and achievements." },
    ],
  }),
  component: Dashboard,
});
