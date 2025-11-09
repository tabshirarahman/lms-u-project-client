export const serviceTypeOptions = [
  "web-development",
  "app-development",
  "inventory-management",
  "ui-ux-design",
  "branding-design",
  "seo-service",
  "social-media-marketing",
] as const;

export type TServiceType = (typeof serviceTypeOptions)[number];
