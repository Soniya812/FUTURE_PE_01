import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit — Maple & Oak Café Bengaluru" },
      { name: "description", content: "Find Maple & Oak in Indiranagar. Call, WhatsApp, or message us. Open daily 8 AM – 10 PM." },
      { property: "og:title", content: "Contact — Maple & Oak" },
      { property: "og:description", content: "Visit us in Indiranagar. We'd love to host you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-20 md:px-8 md:pt-28">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Visit us</span>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold md:text-6xl">
          We'd love to host you.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Drop in, call ahead, or message us — whichever feels easier. We're open
          every day, including holidays.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 md:grid-cols-[1fr_1.2fr] md:px-8">
        <div className="space-y-4">
          {[
            { icon: MapPin, t: "Address", v: "12, 100 Feet Road, Indiranagar, Bengaluru 560038" },
            { icon: Clock, t: "Open every day", v: "8:00 AM – 10:00 PM" },
            { icon: Phone, t: "Phone", v: "+91 80 1234 5678", href: "tel:+918012345678" },
            { icon: Mail, t: "Email", v: "hello@mapleandoak.cafe", href: "mailto:hello@mapleandoak.cafe" },
          ].map((b) => (
            <div key={b.t} className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-warm text-primary-foreground">
                <b.icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold">{b.t}</h3>
                {b.href ? (
                  <a href={b.href} className="text-sm text-muted-foreground hover:text-foreground">{b.v}</a>
                ) : (
                  <p className="text-sm text-muted-foreground">{b.v}</p>
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild className="rounded-full bg-gradient-warm hover:opacity-95">
              <a href="tel:+918012345678"><Phone className="mr-1 h-4 w-4" /> Call Now</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href="https://wa.me/918012345678" target="_blank" rel="noreferrer">
                <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href="https://maps.google.com/?q=Indiranagar+Bengaluru" target="_blank" rel="noreferrer">
                Get Directions
              </a>
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/reserve">Reserve Table</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe
              title="Map to Maple & Oak"
              src="https://www.google.com/maps?q=Indiranagar+Bengaluru&output=embed"
              className="h-[320px] w-full border-0"
              loading="lazy"
            />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent! We'll reply within a few hours.");
              e.currentTarget.reset();
            }}
            className="rounded-3xl border border-border bg-card p-8 shadow-warm"
          >
            <h2 className="font-display text-2xl font-semibold">Send us a message</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cname">Name</Label>
                <Input id="cname" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cemail">Email</Label>
                <Input id="cemail" type="email" required />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="cmsg">Message</Label>
              <Textarea id="cmsg" rows={4} required />
            </div>
            <Button type="submit" className="mt-6 w-full rounded-full bg-gradient-warm hover:opacity-95">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
