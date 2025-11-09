export interface Course {
  price: number;
  id: string;
  name: string;
  category: "programming" | "business" | "design";
  description: string;
  image: string;
  instructor: string;
  duration: string;
  rating: number;
}

export const COURSES: Course[] = [
  {
    id: "c1",
    name: "Full Stack Web Development",
    category: "programming",
    description:
      "Learn to build complete web applications using React, Node.js, and MongoDB.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216",
    instructor: "John Doe",
    duration: "12 weeks",
    rating: 5,
    price: 199,
  },
  {
    id: "c2",
    name: "Digital Marketing Fundamentals",
    category: "business",
    description:
      "Master SEO, social media, and content marketing to grow online presence.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    rating: 4,
    price: 149,
  },
  {
    id: "c3",
    name: "UI/UX Design Principles",
    category: "design",
    description:
      "Design user-centered interfaces and improve user experience across digital platforms.",
    image:
      "https://images.unsplash.com/photo-1581091012184-5c482da4e9b0",
    instructor: "Alex Lee",
    duration: "10 weeks",
    rating: 4,
    price: 179,
  },
];
