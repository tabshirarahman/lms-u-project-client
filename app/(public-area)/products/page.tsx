"use client";

import { useState } from "react";
import { PRODUCTS } from "@/data/products.data";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/app/store/cart-store"; 
import { toast } from "sonner";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const addItem = useCartStore((s) => s.addItem);

  const filtered = PRODUCTS.filter((p) => {
    const matchType = filter === "all" || p.type === filter;
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQuery;
  });

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-neutral-950">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-neutral-900 p-5 border-r border-gray-100 dark:border-neutral-800">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {["all", "computer", "mobile", "tablet"].map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer px-3 py-2 rounded-md ${
                filter === cat
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat === "all"
                ? "All Products"
                : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Slider */}
        <div className="relative w-full h-64 md:h-80 mb-10 overflow-hidden rounded-b-2xl">
          <Image
            src="https://blogs.microsoft.com/wp-content/uploads/prod/2024/05/Surface-Laptop-and-Surface-Pro-Hero.png"
            alt="Hero Banner"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl font-bold mb-3">Your Tech, Your Way</h1>
            <p className="text-gray-200 max-w-lg">
              Browse the latest computers, mobiles, and tablets with exclusive offers.
            </p>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 px-4">
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="sm:w-1/2"
          />

          <Select>
            <SelectTrigger className="sm:w-1/3">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Price: Low to High</SelectItem>
              <SelectItem value="high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10">
          {filtered.map((p) => (
            <Card key={p.id} className="hover:shadow-lg transition border border-gray-100 dark:border-neutral-800">
              <CardContent className="p-4 space-y-3">
                <div className="relative w-full h-48">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-gray-500 capitalize">{p.type}</p>
                <p className="text-xl font-bold">${p.price}</p>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      addItem({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                        quantity: 1,
                      });
                      toast.success(`${p.name} added to cart`);
                    }}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Link href={`/products/${p.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
