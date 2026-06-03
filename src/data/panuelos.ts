export interface Panuelo {
  groupNumber: number;
  groupName: string;
  zoneNumber: number;
  district: string | number;
  image: string;
  images: string[];
  meaning: string;
  history: string;
}

// Fallback data used when the Google Sheet can't be reached.
export const panuelosFallback: Panuelo[] = [
  {
    groupNumber: 1,
    groupName: "Grupo Scout Ejemplo",
    zoneNumber: 1,
    district: "Buenos Aires",
    image: "",
    images: [],
    meaning:
      "Los colores del pañuelo representan los valores fundacionales del grupo: el verde simboliza la naturaleza, el blanco la pureza de intención y el rojo el coraje del servicio.",
    history:
      "Este es un grupo de ejemplo cargado como fallback. Cuando la Google Sheet esté disponible, se mostrarán los grupos reales.",
  },
];
