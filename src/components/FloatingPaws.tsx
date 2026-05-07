import { PawPrint } from "lucide-react";

const paws = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: `${10 + i * 15}%`,
  size: 16 + (i % 3) * 8,
  duration: `${10 + i * 3}s`,
  delay: `${i * 2}s`,
}));

export function FloatingPaws() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {paws.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-up text-primary"
          style={{
            left: p.left,
            bottom: "-40px",
            "--duration": p.duration,
            "--delay": p.delay,
          } as React.CSSProperties}
        >
          <PawPrint size={p.size} className="opacity-[0.08]" />
        </div>
      ))}
    </div>
  );
}
