export interface FleetFormData {
  id?: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  specifications: {
    adults: string;
    suitcases: string;
    briefcases: string;
    doors: number;
    transmission: string;
    fuelType: string;
    airConditioning: boolean;
  };
  features: string[];
  pricePerDay: string;
  pricePerHour?: string;
  availability: boolean;
  popularRoutes: string[];
  detailedDescription: string;
  gallery: string[];
  seoTitle: string;
  seoDescription: string;
  tags: string;
  targetKeyword: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AreaFormData {
  id?: number;
  name: string;
  slug: string;
  location: string;
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  content: string;
  features: string[];
  popularDestinations: string[];
  averagePrice: string;
  coverage: "full" | "partial";
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  tags: string;
  targetKeyword: string;
  createdAt?: string;
  updatedAt?: string;
}

// Fleet Data Management
export function getFleetData(): FleetFormData[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("fleet-data");
  return data ? JSON.parse(data) : [];
}

export function addFleetItem(item: Omit<FleetFormData, "id" | "createdAt" | "updatedAt">): void {
  const fleetData = getFleetData();
  const newItem: FleetFormData = {
    ...item,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  fleetData.push(newItem);
  localStorage.setItem("fleet-data", JSON.stringify(fleetData));
}

export function updateFleetItem(
  id: number,
  item: Omit<FleetFormData, "id" | "createdAt" | "updatedAt">,
): void {
  const fleetData = getFleetData();
  const index = fleetData.findIndex((fleet) => fleet.id === id);
  if (index !== -1) {
    fleetData[index] = {
      ...fleetData[index],
      ...item,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("fleet-data", JSON.stringify(fleetData));
  }
}

export function deleteFleetItem(id: number): void {
  const fleetData = getFleetData();
  const filteredData = fleetData.filter((fleet) => fleet.id !== id);
  localStorage.setItem("fleet-data", JSON.stringify(filteredData));
}

// Areas Data Management
export function getAreasData(): AreaFormData[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("areas-data");
  return data ? JSON.parse(data) : [];
}

export function addAreaItem(item: Omit<AreaFormData, "id" | "createdAt" | "updatedAt">): void {
  const areasData = getAreasData();
  const newItem: AreaFormData = {
    ...item,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  areasData.push(newItem);
  localStorage.setItem("areas-data", JSON.stringify(areasData));
}

export function updateAreaItem(
  id: number,
  item: Omit<AreaFormData, "id" | "createdAt" | "updatedAt">,
): void {
  const areasData = getAreasData();
  const index = areasData.findIndex((area) => area.id === id);
  if (index !== -1) {
    areasData[index] = {
      ...areasData[index],
      ...item,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("areas-data", JSON.stringify(areasData));
  }
}

export function deleteAreaItem(id: number): void {
  const areasData = getAreasData();
  const filteredData = areasData.filter((area) => area.id !== id);
  localStorage.setItem("areas-data", JSON.stringify(filteredData));
}
