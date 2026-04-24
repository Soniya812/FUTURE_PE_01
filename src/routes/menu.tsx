import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menu } from "@/lib/menu-data";
import { toast } from "sonner";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Maple & Oak Specialty Coffee" },
      { name: "description", content: "Single-origin coffee, fresh bakes, signature drinks and seasonal bites at Maple & Oak." },
      { property: "og:title", content: "Menu — Maple & Oak" },
      { property: "og:description", content: "Coffee, beverages, desserts, snacks. Pick your favorites." },
    ],
  }),
  component: MenuPage,
});

const categories = Object.keys(menu);

function MenuPage() {
  const [active, setActive] = useState(categories[0]);
  const [count, setCount] = useState(0);
  return (
    <div className="bg-gradient-cream">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-20 md:px-8 md:pt-28">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">The Menu</span>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold md:text-6xl">
          Brewed slow. Baked fresh. Built to linger over.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          A short, seasonal menu we actually love. Prices in INR. Add items to start
          your order — or reserve a table and we'll have it ready.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                active === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menu[active].map((item) => (
            <article
              key={item.name}
              className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-warm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                  <span className="font-display text-lg font-semibold text-accent">₹{item.price}</span>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.description}</p>
                <Button
                  variant="secondary"
                  className="mt-5 rounded-full"
                  onClick={() => {
                    setCount((c) => c + 1);
                    toast.success(`${item.name} added to order`);
                  }}
                >
                  <Plus className="mr-1 h-4 w-4" /> Add to Order
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="sticky bottom-4 z-30 mx-auto max-w-3xl px-4 pb-6">
        <div className="flex items-center justify-between gap-4 rounded-full bg-foreground px-6 py-3 text-background shadow-warm">
          <div className="flex items-center gap-3 text-sm">
            <ShoppingBag className="h-5 w-5" />
            <span>{count > 0 ? `${count} item${count > 1 ? "s" : ""} in your order` : "Ready to settle in?"}</span>
          </div>
          <Button asChild size="sm" className="rounded-full bg-accent text-accent-foreground hover:opacity-95">
            <Link to="/reserve">Reserve Table <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
