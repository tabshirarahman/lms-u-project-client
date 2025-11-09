export interface HeroSlideData {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  textPosition: "left" | "center" | "right";
  textColor: "white" | "black" | "blue";
  overlayOpacity: number;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function getHeroSlidesData(): HeroSlideData[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("hero-slides-data");
  return data ? JSON.parse(data) : [];
}

export function addHeroSlide(slide: Omit<HeroSlideData, "id" | "createdAt" | "updatedAt">): void {
  const slides = getHeroSlidesData();
  const newSlide: HeroSlideData = {
    ...slide,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  slides.push(newSlide);
  localStorage.setItem("hero-slides-data", JSON.stringify(slides));
}

export function updateHeroSlide(
  id: number,
  slide: Omit<HeroSlideData, "id" | "createdAt" | "updatedAt">,
): void {
  const slides = getHeroSlidesData();
  const index = slides.findIndex((s) => s.id === id);
  if (index !== -1) {
    slides[index] = {
      ...slides[index],
      ...slide,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("hero-slides-data", JSON.stringify(slides));
  }
}

export function deleteHeroSlide(id: number): void {
  const slides = getHeroSlidesData();
  const filteredSlides = slides.filter((slide) => slide.id !== id);
  localStorage.setItem("hero-slides-data", JSON.stringify(filteredSlides));
}

export function updateHeroSlideStatus(id: number, isActive: boolean): void {
  const slides = getHeroSlidesData();
  const index = slides.findIndex((s) => s.id === id);
  if (index !== -1) {
    slides[index].isActive = isActive;
    slides[index].updatedAt = new Date().toISOString();
    localStorage.setItem("hero-slides-data", JSON.stringify(slides));
  }
}
