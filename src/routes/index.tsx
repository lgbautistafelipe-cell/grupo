import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { PanueloCard } from "@/components/PanueloCard";
import { usePanuelos } from "@/hooks/use-panuelos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wiki Scout Argentina — Pañuelos y grupos scouts" },
      {
        name: "description",
        content:
          "Documentación abierta de los pañuelos y grupos scouts de Argentina. Buscá por zona, distrito o número de grupo.",
      },
      { property: "og:title", content: "Wiki Scout Argentina" },
      {
        property: "og:description",
        content: "Documentación abierta de pañuelos y grupos scouts argentinos.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data, isLoading, isError } = usePanuelos();
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState("");
  const [district, setDistrict] = useState("");

  const panuelos = data?.panuelos ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return panuelos.filter((p) => {
      if (zone && String(p.zoneNumber) !== zone) return false;
      if (district && String(p.district) !== district) return false;
      if (!q) return true;
      return (
        p.groupName.toLowerCase().includes(q) ||
        String(p.groupNumber).includes(q)
      );
    });
  }, [panuelos, search, zone, district]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-secondary/60 to-background">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Pañuelos de los grupos scouts argentinos
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Una enciclopedia colaborativa con la historia y el significado
              detrás de cada pañuelo. Los datos provienen de una hoja de cálculo
              pública que cualquier scout puede ayudar a completar.
            </p>
            {data?.source === "fallback" && (
              <p className="mt-3 text-sm text-destructive">
                No se pudo cargar la hoja remota. Mostrando datos locales de respaldo.
              </p>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-8">
          <FilterBar
            panuelos={panuelos}
            search={search}
            zone={zone}
            district={district}
            onSearch={setSearch}
            onZone={setZone}
            onDistrict={setDistrict}
          />

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : isError ? (
            <p className="text-destructive">Error cargando los grupos.</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center">
              No se encontraron grupos con esos filtros.
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-3">
                {filtered.length} grupo{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {filtered.map((p) => (
                  <PanueloCard key={p.groupNumber} panuelo={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
