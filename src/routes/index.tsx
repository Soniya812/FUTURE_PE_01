import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coffee, Leaf, Sparkles, Star, Wifi, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-cafe.jpg";
import coffeeImg from "@/assets/menu-coffee.jpg";
import dessertImg from "@/assets/menu-dessert.jpg";
import snackImg from "@/assets/menu-snack.jpg";
import signatureImg from "@/assets/menu-signature.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maple & Oak — Your Perfect Coffee Escape in Bengaluru" },
      {
        name: "description",
        content:
          "Specialty coffee, fresh bakes and a cozy room in Indiranagar. View the menu and reserve a table at Maple & Oak today.",
      },
      { property: "og:title", content: "Maple & Oak — Your Perfect Coffee Escape" },
      { property: "og:description", content: "Specialty coffee, fresh bakes, warm vibes. Reserve a table." },
    ],
  }),
  component: HomePage,
});

const highlights = [
  { name: "Coffee", img: coffeeImg, blurb: "Single-origin, slow brews and rich espresso." },
  { name: "Desserts", img: dessertImg, blurb: "House-made cakes, brownies and seasonal bakes." },
  { name: "Snacks", img: snackImg, blurb: "Sourdough toasts, paninis and grain bowls." },
  { name: "Signatures", img: signatureImg, blurb: "Matcha, cold brew tonic and house specials." },
];

const reasons = [
  { icon: Leaf, title: "Cozy Ambience", text: "Warm wood, soft light, room to settle in." },
  { icon: Wifi, title: "Free Wi-Fi", text: "Fast, reliable. Stay an hour or stay all day." },
  { icon: Sparkles, title: "Fresh Ingredients", text: "Local farms, daily bakes, single-origin beans." },
  { icon: Clock, title: "Quick Service", text: "Friendly baristas. Your drink, your way, fast." },
];

const reviews = [
  { name: "Aarti S.", text: "My favorite work-from-cafe spot in Bengaluru. The matcha is unreal.", rating: 5 },
  { name: "Rohan M.", text: "Quiet corners, beautiful light, and the cortado is perfect.", rating: 5 },
  { name: "Priya & Dev", text: "Booked an outdoor table for our anniversary. Felt like Lisbon.", rating: 5 },
];

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Warm interior of Maple & Oak café at golden hour"
            className="h-full w-full object-cover"
            width={1600}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/30 to-background" />
        </div>
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-start justify-end px-4 pb-20 pt-32 md:px-8">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-foreground backdrop-blur">
            <Coffee className="h-3.5 w-3.5" /> Indiranagar, Bengaluru
          </span>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-primary-foreground md:text-7xl">
            Your perfect coffee escape in Bengaluru.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/85 md:text-xl">
            Slow-brewed single-origin coffee, fresh bakes, and a warm room made for
            quiet mornings, long conversations, and great work.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full bg-accent px-8 text-accent-foreground shadow-warm hover:opacity-95">
              <Link to="/reserve">Reserve a Table <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary-foreground/40 bg-primary-foreground/10 px-8 text-primary-foreground backdrop-blur hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              <Link to="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center md:px-8">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Welcome in</span>
        <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
          A small café with a big love for slow mornings.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          We roast in small batches, bake in-house each morning, and pour every cup
          like it's our first. Whether you're here to focus, catch up, or simply pause —
          there's a seat with your name on it.
        </p>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">From the menu</span>
            <h2 className="mt-2 font-display text-4xl font-semibold md:text-5xl">A taste of what we do</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/menu">Explore Menu <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <Link
              key={h.name}
              to="/menu"
              className="group overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-warm"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={h.img}
                  alt={h.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{h.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Explore Menu <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Why Maple &amp; Oak</span>
            <h2 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
              Made for the way you actually spend the day.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-warm text-primary-foreground">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">4.9 ★ on Google · 1,200+ reviews</span>
          <h2 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Loved by the neighborhood</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 font-display text-lg leading-relaxed">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-muted-foreground">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* URGENCY CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-warm p-10 text-primary-foreground shadow-warm md:p-16">
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/80">
                Weekends fill up fast
              </span>
              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                Reserve your table now — limited seating on weekends.
              </h2>
              <p className="mt-4 text-primary-foreground/85">
                Skip the wait. Pick your slot, your seat, and your view.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full bg-background px-8 text-foreground hover:bg-background/90">
              <Link to="/reserve">Book Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
