import { createServerFn } from "@tanstack/react-start";
import { csvToPanuelos, SHEET_CSV_URL } from "./google-sheets";
import { panuelosFallback, type Panuelo } from "@/data/panuelos";

/**
 * Fetches the Google Sheets CSV on the server (avoids CORS, gets cached at
 * the edge). Falls back to the local dataset if the network request fails.
 */
export const getPanuelos = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ panuelos: Panuelo[]; source: "sheet" | "fallback" }> => {
    try {
      const res = await fetch(SHEET_CSV_URL, {
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) throw new Error(`Sheet HTTP ${res.status}`);
      const csv = await res.text();
      const parsed = csvToPanuelos(csv);
      if (parsed.length === 0) throw new Error("Empty sheet");
      return { panuelos: parsed, source: "sheet" };
    } catch (err) {
      console.error("[panuelos] sheet fetch failed:", err);
      return { panuelos: panuelosFallback, source: "fallback" };
    }
  },
);
