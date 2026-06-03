export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} Wiki Scout Argentina · Proyecto comunitario sin fines de lucro
        </div>
        <div className="flex gap-4">
          <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="hover:text-primary">
            Contribuir
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary">
            Código
          </a>
        </div>
      </div>
    </footer>
  );
}
