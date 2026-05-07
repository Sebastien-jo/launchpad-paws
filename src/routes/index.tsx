import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/AuthPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PawSchool — Train Your Dog the Fun Way" },
      { name: "description", content: "Join 50,000+ dog trainers. Gamified training that gets real results in 30 days." },
      { property: "og:title", content: "PawSchool — Train Your Dog the Fun Way" },
      { property: "og:description", content: "Gamified dog training that gets real results in 30 days." },
    ],
  }),
  component: Index,
});

function Index() {
  return <AuthPage />;
}
