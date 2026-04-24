import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maple & Oak — Specialty Coffee Café in Bengaluru" },
      {
        name: "description",
        content:
          "Cozy specialty coffee café in Bengaluru. Single-origin coffee, fresh bakes, free Wi-Fi. Reserve your table in seconds.",
      },
      { name: "author", content: "Maple & Oak" },
      { property: "og:title", content: "Maple & Oak — Specialty Coffee Café in Bengaluru" },
      {
        property: "og:description",
        content: "Your perfect coffee escape in Bengaluru. Reserve a table today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@mapleandoak" },
      { name: "twitter:title", content: "Maple & Oak — Specialty Coffee Café in Bengaluru" },
      { name: "description", content: "Cozy Corner Creator builds high-converting, multi-page websites for modern cafés." },
      { property: "og:description", content: "Cozy Corner Creator builds high-converting, multi-page websites for modern cafés." },
      { name: "twitter:description", content: "Cozy Corner Creator builds high-converting, multi-page websites for modern cafés." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/564408f8-39ff-467a-bb22-780bded7185f/id-preview-b8aa6e2a--f527d082-6fcb-4f34-b4c5-7ec138d9480f.lovable.app-1777027895058.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/564408f8-39ff-467a-bb22-780bded7185f/id-preview-b8aa6e2a--f527d082-6fcb-4f34-b4c5-7ec138d9480f.lovable.app-1777027895058.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
