import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { usePanuelos } from "@/hooks/use-panuelos";

export const Route = createFileRoute("/grupo/$groupNumber")({
  component: GrupoPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Grupo no encontrado</h1>
        <Link to="/" className="text-primary hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  ),
});

function GrupoPage() {
  const { groupNumber } = Route.useParams();
  const { data, isLoading } = usePanuelos();
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Cargando…
      </div>
    );
  }

  const panuelo = data?.panuelos.find(
    (p) => String(p.groupNumber) === groupNumber,
  );

  if (!panuelo) throw notFound();

  const images = panuelo.images.length > 0 ? panuelo.images : panuelo.image ? [panuelo.image] : [];

  const sections = [
    { id: "resumen", title: "Resumen" },
    ...(images.length > 0 ? [{ id: "galeria", title: "Galería" }] : []),
    ...(panuelo.meaning ? [{ id: "significado", title: "Significado" }] : []),
    ...(panuelo.history ? [{ id: "historia", title: "Historia" }] : []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <nav className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span>Grupo {panuelo.groupNumber}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">
            <article className="min-w-0">
              <header className="border-b border-border pb-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="rounded bg-primary text-primary-foreground px-2 py-0.5 font-semibold">
                    Nº {panuelo.groupNumber}
                  </span>
                  <span>Zona {panuelo.zoneNumber}</span>
                  <span>·</span>
                  <span>{panuelo.district}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {panuelo.groupName || `Grupo ${panuelo.groupNumber}`}
                </h1>
              </header>

              <section id="resumen" className="mb-10">
                <h2 className="text-xl font-bold text-foreground mb-3">Resumen</h2>
                <div className="rounded-lg border border-border bg-card p-4 grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Número de grupo</div>
                    <div className="font-medium">{panuelo.groupNumber}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Nombre</div>
                    <div className="font-medium">{panuelo.groupName || "—"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Zona</div>
                    <div className="font-medium">{panuelo.zoneNumber}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Distrito</div>
                    <div className="font-medium">{panuelo.district}</div>
                  </div>
                </div>
              </section>

              {images.length > 0 && (
                <section id="galeria" className="mb-10">
                  <h2 className="text-xl font-bold text-foreground mb-3">Galería</h2>
                  <div className="rounded-lg overflow-hidden border border-border bg-muted aspect-video flex items-center justify-center">
                    <img
                      src={images[activeImg]}
                      alt={`Pañuelo Grupo ${panuelo.groupNumber}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                      {images.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition ${
                            i === activeImg
                              ? "border-primary"
                              : "border-transparent hover:border-border"
                          }`}
                        >
                          <img src={src} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {panuelo.meaning && (
                <section id="significado" className="mb-10">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Significado
                  </h2>
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                    {panuelo.meaning}
                  </p>
                </section>
              )}

              {panuelo.history && (
                <section id="historia" className="mb-10">
                  <h2 className="text-xl font-bold text-foreground mb-3">Historia</h2>
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                    {panuelo.history}
                  </p>
                </section>
              )}

              <div className="mt-8 rounded-lg border border-accent/40 bg-accent/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-sm">
                  <div className="font-semibold text-foreground">
                    ¿Conocés más sobre este grupo?
                  </div>
                  <div className="text-muted-foreground">
                    Ayudanos a completar o corregir su información.
                  </div>
                </div>
                <a
                  href="https://forms.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  Contribuir al Wiki
                </a>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-4 rounded-lg border border-border bg-card p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  En esta página
                </div>
                <ul className="space-y-1.5 text-sm">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-foreground/80 hover:text-primary"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
