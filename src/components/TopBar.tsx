export function TopBar() {
  return (
    <div className="w-full bg-primary text-primary-foreground text-xs">
      <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center justify-between">
        <span className="opacity-80">Wiki Scout Argentina · Proyecto comunitario</span>
        <a
          href="https://www.scouts.org.ar"
          target="_blank"
          rel="noreferrer"
          className="opacity-80 hover:opacity-100 hover:underline"
        >
          scouts.org.ar
        </a>
      </div>
    </div>
  );
}
