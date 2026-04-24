import { Link } from "@tanstack/react-router";
import { Coffee, Instagram, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-warm text-primary-foreground">
              <Coffee className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-semibold">Maple &amp; Oak</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A neighborhood specialty coffee café in Indiranagar, Bengaluru. Slow brews,
            warm light, room to breathe.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold">Visit</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>12, 100 Feet Road, Indiranagar, Bengaluru 560038</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href="tel:+918012345678" className="hover:text-foreground">
                +91 80 1234 5678
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 shrink-0" />
              <span>@mapleandoak</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/menu" className="hover:text-foreground">Menu</Link></li>
            <li><Link to="/reserve" className="hover:text-foreground">Reserve</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Maple &amp; Oak Coffee Co. Brewed with care.
      </div>
    </footer>
  );
}
