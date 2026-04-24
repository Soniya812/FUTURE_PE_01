import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { reservationStore } from "@/lib/reservation-store";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Reserve a Table — Maple & Oak Café" },
      { name: "description", content: "Book a table at Maple & Oak in Indiranagar. Indoor or outdoor seating, instant confirmation." },
      { property: "og:title", content: "Reserve a Table — Maple & Oak" },
      { property: "og:description", content: "Pick your date, time, and seat. We'll save it for you." },
    ],
  }),
  component: ReservePage,
});

const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

function ReservePage() {
  const navigate = useNavigate();
  const [seating, setSeating] = useState<"Indoor" | "Outdoor">("Indoor");
  const [time, setTime] = useState("11:00");
  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    reservationStore.set({
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      guests: Number(fd.get("guests") ?? 2),
      date: String(fd.get("date") ?? today),
      time,
      seating,
      request: String(fd.get("request") ?? ""),
    });
    navigate({ to: "/checkout" });
  }

  return (
    <div className="bg-gradient-cream">
      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-20 md:grid-cols-[1.1fr_1fr] md:px-8 md:pt-28">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Reserve</span>
          <h1 className="mt-3 font-display text-5xl font-semibold md:text-6xl">
            Save your seat. We'll save the warm light.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Most weekend slots are gone by Thursday. Pick a time below and we'll
            confirm in seconds.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: CalendarCheck, t: "Instant confirmation", s: "Get a confirmation number right away." },
              { icon: Users, t: "Up to 10 guests", s: "Larger group? Drop us a note in special requests." },
              { icon: MapPin, t: "Indoor or outdoor", s: "Sunlit window seats or breezy patio tables." },
            ].map((b) => (
              <div key={b.t} className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-warm text-primary-foreground">
                  <b.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold">{b.t}</h3>
                  <p className="text-sm text-muted-foreground">{b.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-8 shadow-warm md:p-10"
        >
          <h2 className="font-display text-2xl font-semibold">Book your table</h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" required placeholder="Aarti Sharma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" name="phone" required type="tel" placeholder="+91 98765 43210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <Input id="guests" name="guests" required type="number" min={1} max={10} defaultValue={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" required type="date" min={today} defaultValue={today} />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label>Time slot</Label>
            <div className="flex flex-wrap gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    time === t
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label>Seating preference</Label>
            <div className="grid grid-cols-2 gap-3">
              {(["Indoor", "Outdoor"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeating(s)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    seating === s
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="font-display text-base font-semibold text-foreground">{s}</div>
                  <div className="text-xs">{s === "Indoor" ? "Cozy, quiet, near the window" : "Open air, plants, breeze"}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="request">Special request <span className="text-muted-foreground">(optional)</span></Label>
            <Textarea id="request" name="request" rows={3} placeholder="Birthday surprise, high chair, quiet corner…" />
          </div>

          <Button type="submit" size="lg" className="mt-8 w-full rounded-full bg-gradient-warm shadow-warm hover:opacity-95">
            Check Availability
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            No charge to reserve. We'll confirm in the next step.
          </p>
        </form>
      </section>
    </div>
  );
}
