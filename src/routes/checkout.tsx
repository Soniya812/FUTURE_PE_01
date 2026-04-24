import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Calendar, Users, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reservationStore, useReservation } from "@/lib/reservation-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Confirm Your Reservation | Maple & Oak" },
      { name: "description", content: "Review your booking, add contact details, and confirm your table at Maple & Oak." },
    ],
  }),
  component: CheckoutPage,
});

type Step = 1 | 2 | 3 | 4;

function CheckoutPage() {
  const navigate = useNavigate();
  const reservation = useReservation();
  const [step, setStep] = useState<Step>(1);
  const [payment, setPayment] = useState<"free" | "advance" | "cafe">("free");

  useEffect(() => {
    if (!reservation) navigate({ to: "/reserve" });
  }, [reservation, navigate]);

  if (!reservation) return null;

  function confirm() {
    const id = "MO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    reservationStore.set({ payment, confirmationId: id });
    setStep(4);
  }

  return (
    <div className="bg-gradient-cream">
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-20 md:px-8 md:pt-28">
        {/* Progress */}
        <div className="mb-10 flex items-center justify-between gap-2">
          {["Summary", "Details", "Payment", "Done"].map((label, i) => {
            const n = (i + 1) as Step;
            const active = step >= n;
            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    active ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {n}
                </div>
                <span className={`hidden text-sm sm:inline ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </span>
                {i < 3 && <div className={`h-px flex-1 ${step > n ? "bg-foreground" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>

        {step === 1 && (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-warm md:p-10">
            <h1 className="font-display text-3xl font-semibold">Booking summary</h1>
            <p className="mt-2 text-muted-foreground">Looks good? Continue to add contact details.</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <Row icon={Users} label="Guests" value={`${reservation.guests}`} />
              <Row icon={Calendar} label="Date" value={reservation.date} />
              <Row icon={Clock} label="Time" value={reservation.time} />
              <Row icon={MapPin} label="Seating" value={reservation.seating} />
            </dl>
            <div className="mt-6 rounded-2xl bg-secondary/60 p-4 text-sm">
              <span className="font-medium text-foreground">{reservation.name}</span>{" "}
              <span className="text-muted-foreground">· {reservation.phone}</span>
              {reservation.request && (
                <p className="mt-2 text-muted-foreground">"{reservation.request}"</p>
              )}
            </div>
            <div className="mt-8 flex justify-between gap-3">
              <Button asChild variant="ghost" className="rounded-full">
                <Link to="/reserve">Edit</Link>
              </Button>
              <Button onClick={() => setStep(2)} className="rounded-full bg-gradient-warm hover:opacity-95">
                Continue <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              reservationStore.set({
                email: String(fd.get("email") ?? ""),
                name: String(fd.get("name") ?? reservation.name),
                phone: String(fd.get("phone") ?? reservation.phone),
              });
              setStep(3);
            }}
            className="rounded-3xl border border-border bg-card p-8 shadow-warm md:p-10"
          >
            <h1 className="font-display text-3xl font-semibold">Contact details</h1>
            <p className="mt-2 text-muted-foreground">We'll send your confirmation here.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={reservation.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={reservation.phone} required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="you@example.com" />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <Button type="button" variant="ghost" className="rounded-full" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" className="rounded-full bg-gradient-warm hover:opacity-95">
                Continue <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-warm md:p-10">
            <h1 className="font-display text-3xl font-semibold">Payment</h1>
            <p className="mt-2 text-muted-foreground">Pick how you'd like to secure your table.</p>
            <div className="mt-8 grid gap-3">
              {[
                { id: "free", title: "Free Reservation", desc: "Hold your table at no charge.", price: "₹0" },
                { id: "advance", title: "Advance Booking", desc: "Pay ₹200/person, fully redeemable on the bill.", price: `₹${reservation.guests * 200}` },
                { id: "cafe", title: "Pay at Café", desc: "Settle the entire bill when you visit.", price: "On arrival" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPayment(p.id as typeof payment)}
                  className={`flex items-center justify-between rounded-2xl border p-5 text-left transition ${
                    payment === p.id ? "border-accent bg-accent/10" : "border-border bg-background hover:border-foreground/40"
                  }`}
                >
                  <div>
                    <div className="font-display text-lg font-semibold">{p.title}</div>
                    <div className="text-sm text-muted-foreground">{p.desc}</div>
                  </div>
                  <div className="font-display text-base font-semibold text-accent">{p.price}</div>
                </button>
              ))}
            </div>
            {payment === "advance" && (
              <p className="mt-4 text-xs text-muted-foreground">
                UPI / Card / Netbanking accepted. (Demo — no real charge)
              </p>
            )}
            <div className="mt-8 flex justify-between">
              <Button variant="ghost" className="rounded-full" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={confirm} className="rounded-full bg-gradient-warm hover:opacity-95">
                Confirm Reservation
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-warm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold">
              Your table has been successfully reserved!
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Confirmation <span className="font-mono text-foreground">{reservation.confirmationId}</span> sent
              to {reservation.phone}. We can't wait to host you.
            </p>
            <dl className="mx-auto mt-8 grid max-w-md gap-3 text-left">
              <Row icon={Calendar} label="Date" value={`${reservation.date} at ${reservation.time}`} />
              <Row icon={Users} label="Guests" value={`${reservation.guests}`} />
              <Row icon={MapPin} label="Seating" value={reservation.seating} />
            </dl>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/contact">Get Directions</Link>
              </Button>
              <Button asChild className="rounded-full bg-gradient-warm hover:opacity-95">
                <Link to="/menu">Browse Menu</Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
        <dd className="font-display text-base font-semibold">{value}</dd>
      </div>
    </div>
  );
}
