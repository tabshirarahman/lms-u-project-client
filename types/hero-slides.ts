export interface IHeroSlide {
  _id?: string;
  slideId?: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink?: string;
  secondaryCtaText: string;
  secondaryCtaLink?: string;

  textColor: "white" | "black" | "gray" | string;
  overlayOpacity: number;
  order: number;
  isActive: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroSlideFormData {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;

  textColor: "white" | "black" | "gray";
  overlayOpacity: number;
  order: number;
  isActive: boolean;
}
