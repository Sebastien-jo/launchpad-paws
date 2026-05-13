import { Clock, BarChart3, Sparkles, Pencil } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Dog } from "@/data/dogs-store";

export type { Dog };

const accentMap = {
  primary: "bg-primary",
  energy: "bg-energy",
  trust: "bg-trust",
};

export function DogCard({ dog }: { dog: Dog }) {
  const pct = Math.round((dog.xp / dog.xpMax) * 100);
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-1.5 w-full ${accentMap[dog.accent]}`} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={dog.avatar}
              alt={dog.name}
              loading="lazy"
              width={72}
              height={72}
              className="h-18 w-18 rounded-2xl border-2 border-card object-cover shadow-md"
              style={{ width: 72, height: 72 }}
            />
            <div className={`absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full ${accentMap[dog.accent]} text-xs font-black text-white shadow-md ring-2 ring-card`}>
              {dog.level}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xl font-extrabold leading-tight text-foreground">
              {dog.name}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">{dog.breed}</p>
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-foreground">
              <Sparkles size={10} className="text-energy" />
              {dog.levelLabel}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label={`More options for ${dog.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <MoreVertical size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-xl">
              <DropdownMenuItem
                className="cursor-pointer rounded-lg font-semibold"
                onSelect={() => navigate({ to: "/dogs/$dogId/edit", params: { dogId: dog.id } })}
              >
                <Pencil size={16} className="text-trust" />
                Edit dog
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer rounded-lg font-semibold text-destructive focus:text-destructive"
                onSelect={(e) => {
                  e.preventDefault();
                  setConfirmOpen(true);
                }}
              >
                <Trash2 size={16} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-xs font-bold text-muted-foreground">
              {dog.xp} / {dog.xpMax} XP
            </span>
            <span className="text-xs font-extrabold text-foreground">{pct}%</span>
          </div>
          <Progress value={pct} className="h-2.5" />
        </div>

        <div className="mt-4 space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart3 size={14} className="text-trust" />
            <span>Last trained: <span className="font-semibold text-foreground">{dog.lastTrained}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className={dog.ready ? "text-primary" : "text-energy"} />
            <span className={`text-xs font-bold uppercase tracking-wide ${dog.ready ? "text-primary" : "text-energy"}`}>
              {dog.ready ? "Ready for training!" : `Next session: ${dog.nextSession}`}
            </span>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button className="flex-1" size="default">
            Start Training
          </Button>
          <Button asChild variant="outline" className="flex-1 border-trust text-trust hover:bg-trust hover:text-trust-foreground" size="default">
            <Link to="/dogs/$dogId/edit" params={{ dogId: dog.id }}>View Progress</Link>
          </Button>
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {dog.name} from your pack?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {dog.name}'s training history and progress. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => dogsStore.remove(dog.id)}
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
