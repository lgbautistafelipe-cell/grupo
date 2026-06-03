import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-sm">
            ⚜
          </div>
          <div className="leading-tight">
            <div className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
              Wiki Scout Argentina
            </div>
            <div className="text-xs text-muted-foreground">
              Pañuelos · Grupos · Historia
            </div>
          </div>
        </Link>
        <a
          href="https://forms.google.com"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-3 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          + Contribuir al Wiki
        </a>
      </div>
    </header>
  );
}
