// utils/normalizeLocation.ts
export interface NormalizedLocation {
  address: string;
  lat?: number;
  lng?: number;
}

/**
 * Normalizes any pickup/dropoff/via value into a consistent object
 */
export const normalizeLocation = (loc: unknown): NormalizedLocation => {
  if (typeof loc === "string") {
    return { address: loc, lat: undefined, lng: undefined };
  }

  if (typeof loc === "object" && loc !== null && "address" in loc) {
    const obj = loc as { address?: string; lat?: number; lng?: number };
    return {
      address: obj.address || "",
      lat: obj.lat,
      lng: obj.lng,
    };
  }

  return { address: "", lat: undefined, lng: undefined };
};
