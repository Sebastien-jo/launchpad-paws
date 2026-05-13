import { useSyncExternalStore } from "react";
import dogMax from "@/assets/dog-max.jpg";
import dogLuna from "@/assets/dog-luna.jpg";
import dogCharlie from "@/assets/dog-charlie.jpg";

export interface Dog {
  id: string;
  name: string;
  breed: string;
  avatar: string;
  level: number;
  levelLabel: string;
  xp: number;
  xpMax: number;
  lastTrained: string;
  ready: boolean;
  nextSession: string;
  accent: "primary" | "energy" | "trust";
}

let dogs: Dog[] = [
  { id: "max", name: "Max", breed: "Golden Retriever", avatar: dogMax, level: 3, levelLabel: "Intermediate", xp: 480, xpMax: 600, lastTrained: "2 days ago", ready: true, nextSession: "Today", accent: "primary" },
  { id: "luna", name: "Luna", breed: "Siberian Husky", avatar: dogLuna, level: 1, levelLabel: "Beginner", xp: 90, xpMax: 300, lastTrained: "Yesterday", ready: false, nextSession: "in 2 days", accent: "energy" },
  { id: "charlie", name: "Charlie", breed: "Pembroke Corgi", avatar: dogCharlie, level: 2, levelLabel: "Improving", xp: 247, xpMax: 450, lastTrained: "Today", ready: false, nextSession: "Tomorrow", accent: "trust" },
];

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const dogsStore = {
  getAll: () => dogs,
  getById: (id: string) => dogs.find((d) => d.id === id),
  update: (id: string, patch: Partial<Dog>) => {
    dogs = dogs.map((d) => (d.id === id ? { ...d, ...patch } : d));
    emit();
  },
  remove: (id: string) => {
    dogs = dogs.filter((d) => d.id !== id);
    emit();
  },
  subscribe: (fn: () => void) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

export function useDogs() {
  return useSyncExternalStore(
    (cb) => dogsStore.subscribe(cb),
    () => dogs,
    () => dogs,
  );
}

export function useDog(id: string) {
  useSyncExternalStore(
    (cb) => dogsStore.subscribe(cb),
    () => dogs,
    () => dogs,
  );
  return dogs.find((d) => d.id === id);
}
