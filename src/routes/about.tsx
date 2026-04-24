import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import baristaImg from "@/assets/about-barista.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Story Behind Maple & Oak" },
      { name: "description", content: "How a small specialty café in Indiranagar started, and the people who make it run." },
      { property: "og:title", content: "About — Maple & Oak" },
      { property: "og:description", content: "Our story, our team, our coffee." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-20 md:grid-cols-2 md:px-8 md:pt-28">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Our story</span>
          <h1 className="mt-3 font-display text-5xl font-semibold md:text-6xl">
            A café built around the moments between meetings.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Maple &amp; Oak began in 2021 with a simple idea: Bengaluru deserved a café
            that felt less like a chain and more like a friend's living room.
          </p>
          <p className="mt-4 text-muted-foreground">
            We started with a single espresso machine, a sourdough starter named Mira,
            and a corner shop on 100 Feet Road. Three years later, we still roast in
            small batches, still bake every morning, and still know most of our regulars
            by name.
          </p>
        </div>
        <div className="relative">
          <img
            src={baristaImg}
            alt="Our head barista pouring a latte"
            loading="lazy"
            width={1200}
            height={1400}
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-warm"
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card p-5 shadow-warm md:block">
            <p className="font-display text-2xl font-semibold">Since 2021</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Indiranagar, BLR</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3 md:px-8">
          {[
            {
              t: "Founder vision",
              d: "Build the kind of place we wished existed — generous with light, time, and seconds on the espresso shot.",
            },
            {
              t: "The ambience",
              d: "Reclaimed wood, soft Edison glow, plants from neighborhood nurseries. Quiet enough to think, lively enough to feel alive.",
            },
            {
              t: "The team",
              d: "Our head barista Karan trained in Melbourne. Chef Ananya bakes everything you see in the case before sunrise.",
            },
          ].map((b) => (
            <div key={b.t} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h3 className="font-display text-xl font-semibold">{b.t}</h3>
              <p className="mt-3 text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 text-center md:px-8">
        <h2 className="font-display text-4xl font-semibold md:text-5xl">Come spend an hour with us.</h2>
        <p className="mt-4 text-muted-foreground">The kettle is already on.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full bg-gradient-warm hover:opacity-95">
            <Link to="/reserve">Reserve a Table</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/menu">View Menu</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
