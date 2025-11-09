export interface Product {
  id: string;
  name: string;
  type: "computer" | "mobile" | "tablet";
  price: number;
  image: string;
  rating: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "MacBook Pro 16”",
    type: "computer",
    price: 2500,
    image: "https://www.sotophone.com/wp-content/uploads/2021/04/OnePlus-9R.jpg",
    rating: 5,
  },
  {
    id: "p2",
    name: "iPhone 15 Pro",
    type: "mobile",
    price: 1200,
    image: "https://www.sotophone.com/wp-content/uploads/2021/04/OnePlus-9R.jpg",
    rating: 4,
  },
  {
    id: "p3",
    name: "iPad Air 5",
    type: "tablet",
    price: 850,
    image: "https://www.sotophone.com/wp-content/uploads/2021/04/OnePlus-9R.jpg",
    rating: 4,
  },
];
