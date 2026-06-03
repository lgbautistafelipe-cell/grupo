import type { Panuelo } from "@/data/panuelos";

export const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkWn1tpHQIfxTbP7_1KkG1enFbHflIkS0oTW_ajH2PSmqTztxm6BqNcQr38qHCh3xh7K-nu3ruT7Vc/pub?output=csv";

/**
 * Minimal RFC4180-ish CSV parser. Handles quoted fields with commas, escaped
 * quotes (""), and CRLF/LF line endings. Good enough for Google Sheets export.
 */
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(cell);
        cell = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += c;
      }
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim().length > 0));
}

function splitImages(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(/[\n,;|]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function csvToPanuelos(csv: string): Panuelo[] {
  const rows = parseCSV(csv);
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name.toLowerCase());

  const iGroup = idx("groupNumber");
  const iName = idx("groupName");
  const iZone = idx("zoneNumber");
  const iDist = idx("district");
  const iImg = idx("image");
  const iImgs = idx("images");
  const iMean = idx("meaning");
  const iHist = idx("history");

  const out: Panuelo[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const groupNumber = Number(row[iGroup] ?? "");
    if (!Number.isFinite(groupNumber) || groupNumber === 0) continue;
    const district = (row[iDist] ?? "").trim();
    const districtVal: string | number = /^\d+$/.test(district)
      ? Number(district)
      : district;
    const image = (row[iImg] ?? "").trim();
    const images = splitImages(row[iImgs] ?? "");
    out.push({
      groupNumber,
      groupName: (row[iName] ?? "").trim(),
      zoneNumber: Number(row[iZone] ?? "") || 0,
      district: districtVal,
      image,
      images: image && !images.includes(image) ? [image, ...images] : images,
      meaning: (row[iMean] ?? "").trim(),
      history: (row[iHist] ?? "").trim(),
    });
  }
  return out;
}
