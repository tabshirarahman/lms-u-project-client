"use client";

import { useState } from "react";
import { COURSES } from "@/data/course.data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/app/store/cart-store"; // ✅ Zustand cart store

// 🧠 Mock purchased courses (in future, fetch from user DB or API)
const purchasedCourses = ["c1"]; // already enrolled courses

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const addItem = useCartStore((s) => s.addItem);

  // 🔍 Filter logic
  const filtered = COURSES.filter((c) => {
    const matchCategory = filter === "all" || c.category === filter;
    const matchQuery = c.name.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  });

  // 🧩 Add to cart handler
  const handleAddToCart = (course: (typeof COURSES)[0]) => {
    addItem({
      id: course.id,
      name: course.name,
      price: course.price,
      image: course.image,
      quantity: 1,
    });
    toast.success(`${course.name} added to cart`);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-neutral-950">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-neutral-900 p-5 border-r border-gray-100 dark:border-neutral-800">
        <h2 className="text-lg font-semibold mb-4">Course Categories</h2>
        <ul className="space-y-2">
          {["all", "programming", "business", "design"].map((cat) => (
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
                ? "All Courses"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative w-full h-64 md:h-80 mb-10 overflow-hidden rounded-b-2xl">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            alt="Courses Banner"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl font-bold mb-3">Explore Our Courses</h1>
            <p className="text-gray-200 max-w-lg">
              Learn new skills and enhance your career with expert-led online
              courses.
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 px-4">
          <Input
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="sm:w-1/2"
          />

          <Select onValueChange={(v) => setFilter(v)} defaultValue="all">
            <SelectTrigger className="sm:w-1/3">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10">
          {filtered.map((course) => {
            const isPurchased = purchasedCourses.includes(course.id);

            return (
              <Card
                key={course.id}
                className="hover:shadow-lg transition border border-gray-100 dark:border-neutral-800"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="relative w-full h-48">
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>

                  <h3 className="font-semibold text-lg">{course.name}</h3>
                  <p className="text-gray-500 text-sm">{course.instructor}</p>
                  <p className="text-gray-600 text-sm">{course.duration}</p>

                  {/* ✅ Conditional Actions */}
                  {isPurchased ? (
                    <Link
                      href={`/dashboard/courses/${course.id}`}
                      className="flex-1 block"
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Continue
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(course)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                      </Button>
                      <Link href={`/courses/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
