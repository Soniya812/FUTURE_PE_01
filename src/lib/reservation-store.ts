import { useSyncExternalStore } from "react";

export type Reservation = {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seating: "Indoor" | "Outdoor";
  request?: string;
  email?: string;
  payment?: "free" | "advance" | "cafe";
  confirmationId?: string;
};

const KEY = "maple-oak-reservation";
let state: Reservation | null = null;
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) state = JSON.parse(raw);
  } catch {}
}

function emit() {
  if (typeof window !== "undefined") {
    if (state) sessionStorage.setItem(KEY, JSON.stringify(state));
    else sessionStorage.removeItem(KEY);
  }
  listeners.forEach((l) => l());
}

export const reservationStore = {
  get: () => state,
  set: (next: Partial<Reservation> | null) => {
    state = next === null ? null : { ...(state ?? ({} as Reservation)), ...next };
    emit();
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useReservation() {
  return useSyncExternalStore(
    reservationStore.subscribe,
    () => state,
    () => null,
  );
}
