import { Link } from "@tanstack/react-router";
import type { Panuelo } from "@/data/panuelos";
import { motion } from "framer-motion";

export function PanueloCard({ panuelo }: { panuelo: Panuelo }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <Link
        to="/grupo/$groupNumber"
        params={{ groupNumber: String(panuelo.groupNumber) }}
        className="block rounded-lg border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all"
      >
        <div className="aspect-square bg-muted relative overflow-hidden">
          {panuelo.image ? (
            <img
              src={panuelo.image}
              alt={`Pañuelo Grupo ${panuelo.groupNumber}`}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
              ⚜
            </div>
          )}
          <div className="absolute top-2 left-2 rounded-md bg-primary text-primary-foreground text-xs font-bold px-2 py-1 shadow">
            Nº {panuelo.groupNumber}
          </div>
        </div>
        <div className="p-3">
          <div className="font-semibold text-card-foreground truncate">
            {panuelo.groupName || `Grupo ${panuelo.groupNumber}`}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Zona {panuelo.zoneNumber} · {panuelo.district}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
