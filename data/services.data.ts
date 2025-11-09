export interface IService {
  id: number;
  title: string;
  slug: string;
  shortDesc: string;
  image: string;
  features: string[];
}

export const SERVICES: IService[] = [
  {
    id: 1,
    title: "Web Development",
    slug: "web-development",
    shortDesc:
      "Custom, SEO-optimized websites built with Next.js, TypeScript, and TailwindCSS.",
    image: "/images/services/webdev.jpg",
    features: [
      "Responsive design for all devices",
      "SEO-friendly structure",
      "Dynamic content with CMS integration",
    ],
  },
  {
    id: 2,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    shortDesc:
      "Cross-platform Android & iOS apps with beautiful UI and smooth UX.",
    image: "/images/services/appdev.jpg",
    features: [
      "React Native & Flutter development",
      "Fast, secure, and scalable apps",
      "API-driven architecture",
    ],
  },
  {
    id: 3,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    shortDesc:
      "Beautiful and user-centric interfaces designed for maximum engagement.",
    image: "/images/services/uiux.jpg",
    features: [
      "Interactive prototyping in Figma",
      "Clean and modern layouts",
      "User research & usability testing",
    ],
  },
  {
    id: 4,
    title: "Digital Marketing",
    slug: "digital-marketing",
    shortDesc:
      "Comprehensive marketing campaigns to grow your brand visibility and sales.",
    image: "/images/services/marketing.jpg",
    features: [
      "SEO, SEM, and social media campaigns",
      "Content and email marketing",
      "Performance analytics dashboard",
    ],
  },
];
