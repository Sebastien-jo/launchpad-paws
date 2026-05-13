import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { ArrowLeft, Camera, Save, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";
import { dogsStore, useDog } from "@/data/dogs-store";

export const Route = createFileRoute("/dogs/$dogId/edit")({
  head: ({ params }) => ({
    meta: [
      { title: `Edit ${params.dogId} — PawSchool` },
      { name: "description", content: "Update your dog's name and photo." },
    ],
  }),
  component: EditDogPage,
});

function EditDogPage() {
  const { dogId } = Route.useParams();
  const navigate = useNavigate();
  const dog = useDog(dogId);
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(dog?.name ?? "");
  const [breed, setBreed] = useState(dog?.breed ?? "");
  const [avatar, setAvatar] = useState(dog?.avatar ?? "");
  const [saved, setSaved] = useState(false);

  if (!dog) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <main className="mx-auto max-w-2xl px-5 pt-12 text-center">
          <h1 className="text-2xl font-black">Dog not found</h1>
          <p className="mt-2 text-muted-foreground">This pup may have left the pack.</p>
          <Button asChild className="mt-6">
            <Link to="/dashboard">Back to dashboard</Link>
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  const handlePick = () => fileRef.current?.click();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    dogsStore.update(dog.id, { name: name.trim() || dog.name, breed: breed.trim() || dog.breed, avatar });
    setSaved(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 600);
  };

  const handleDelete = () => {
    if (confirm(`Remove ${dog.name} from your pack? This cannot be undone.`)) {
      dogsStore.remove(dog.id);
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3">
          <Link
            to="/dashboard"
            aria-label="Back"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition hover:bg-muted"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-base font-extrabold">Edit dog</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 pt-6">
        {/* Avatar */}
        <section className="flex flex-col items-center">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="h-32 w-32 rounded-3xl border-4 border-card object-cover shadow-lg"
            />
            <button
              onClick={handlePick}
              aria-label="Change photo"
              className="absolute -bottom-2 -right-2 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg ring-4 ring-background transition hover:brightness-110 active:scale-95"
            >
              <Camera size={18} />
            </button>
          </div>
          <button
            onClick={handlePick}
            className="mt-3 text-sm font-bold text-primary underline-offset-4 hover:underline"
          >
            Change photo
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </section>

        {/* Form */}
        <section className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div>
            <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
              Dog name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Max" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
              Breed
            </label>
            <Input value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Golden Retriever" />
          </div>
        </section>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={handleSave} size="lg" className="w-full">
            <Save size={18} /> {saved ? "Saved!" : "Save changes"}
          </Button>
          <Button onClick={handleDelete} variant="outline" size="lg" className="w-full border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <Trash2 size={18} /> Delete dog
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
