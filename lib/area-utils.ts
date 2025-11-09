import type { IArea } from "@/types/area";

export function formatPrice(price: string): string {
  return price;
}

export function getAreaDistance(area: IArea, userLat?: number, userLng?: number): string {
  if (!userLat || !userLng) return "Distance unavailable";

  const R = 6371;
  const dLat = ((area.coordinates.lat - userLat) * Math.PI) / 180;
  const dLng = ((area.coordinates.lng - userLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((area.coordinates.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return `${Math.round(distance)} km away`;
}

export function generateAreaMetadata(area: IArea) {
  return {
    title: `${area.name} Minicab | Bluebird Cars`,
    description: area.description,
    keywords: `minicab ${area.name}, ${area.location}, Bluebird Cars, vehicle hire`,
    openGraph: {
      title: `Minicab in ${area.name}`,
      description: area.description,
      images: [area.image],
    },
  };
}
