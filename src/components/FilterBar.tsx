import type { Panuelo } from "@/data/panuelos";
import { useMemo } from "react";

interface Props {
  panuelos: Panuelo[];
  search: string;
  zone: string;
  district: string;
  onSearch: (v: string) => void;
  onZone: (v: string) => void;
  onDistrict: (v: string) => void;
}

export function FilterBar({
  panuelos,
  search,
  zone,
  district,
  onSearch,
  onZone,
  onDistrict,
}: Props) {
  const zones = useMemo(
    () =>
      Array.from(new Set(panuelos.map((p) => p.zoneNumber).filter(Boolean))).sort(
        (a, b) => a - b,
      ),
    [panuelos],
  );
  const districts = useMemo(
    () =>
      Array.from(
        new Set(
          panuelos
            .filter((p) => !zone || String(p.zoneNumber) === zone)
            .map((p) => String(p.district))
            .filter(Boolean),
        ),
      ).sort(),
    [panuelos, zone],
  );

  const inputCls =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px_180px] gap-3 mb-6">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Buscar por nombre o número de grupo…"
        className={inputCls}
      />
      <select
        value={zone}
        onChange={(e) => {
          onZone(e.target.value);
          onDistrict("");
        }}
        className={inputCls}
      >
        <option value="">Todas las zonas</option>
        {zones.map((z) => (
          <option key={z} value={String(z)}>
            Zona {z}
          </option>
        ))}
      </select>
      <select
        value={district}
        onChange={(e) => onDistrict(e.target.value)}
        className={inputCls}
      >
        <option value="">Todos los distritos</option>
        {districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}
