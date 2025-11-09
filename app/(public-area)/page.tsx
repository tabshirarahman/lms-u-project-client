"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Truck, Headphones } from "lucide-react";
import { PRODUCTS } from "@/data/products.data";

export default function LandingPage() {
  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      {/* 1️⃣ Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/family-color-hero-fy25?fmt=png-alpha&scl=1"
          alt="Hero background"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 max-w-3xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Your Tech, Your Way
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-200 mt-4 text-lg"
          >
            Discover the latest in computers, mobiles, and tablets — all in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-4"
          >
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="px-6 py-3 rounded-full">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Featured Categories */}
      <section className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Explore Our Categories</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Computers",
              image:
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
              link: "/products?type=computer",
            },
            {
              title: "Mobiles",
              image:
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
              link: "/products?type=mobile",
            },
            {
              title: "Tablets",
              image:
                "https://images.unsplash.com/photo-1623126908029-58cb08a2b272",
              link: "/products?type=tablet",
            },
          ].map((cat, i) => (
            <Card
              key={i}
              className="overflow-hidden hover:shadow-lg transition cursor-pointer group"
            >
              <Link href={cat.link}>
                <div className="relative h-60">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-xl">{cat.title}</h3>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* 3️⃣ Best Sellers */}
      <section className="bg-white dark:bg-neutral-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Best Sellers</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {bestSellers.map((p) => (
              <Card
                key={p.id}
                className="hover:shadow-lg border border-gray-100 dark:border-neutral-800 transition"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="relative w-full h-48">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-gray-500 capitalize">{p.type}</p>
                  <p className="text-lg font-bold">${p.price}</p>
                  <Link href={`/products/${p.id}`}>
                    <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                      View Product
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ Why Choose Us */}
      <section className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              icon: Truck,
              title: "Fast & Free Shipping",
              desc: "Get your products delivered quickly, at no extra cost.",
            },
            {
              icon: ShieldCheck,
              title: "Secure Payments",
              desc: "Your transactions are protected with top-tier encryption.",
            },
            {
              icon: Headphones,
              title: "24/7 Support",
              desc: "Our team is always available to assist you.",
            },
            {
              icon: Star,
              title: "Quality Guarantee",
              desc: "We only sell top-rated, verified tech products.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <item.icon className="w-10 h-10 mx-auto text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5️⃣ Testimonials */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "John Smith",
                text: "Amazing service and super fast delivery! Highly recommend.",
              },
              {
                name: "Sarah Johnson",
                text: "The product quality is top-notch. Love shopping here!",
              },
              {
                name: "Michael Lee",
                text: "Great experience, and the support team is excellent!",
              },
            ].map((review, i) => (
              <Card
                key={i}
                className="p-6 shadow-sm border border-gray-100 dark:border-neutral-800"
              >
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  “{review.text}”
                </p>
                <p className="font-semibold text-blue-600">— {review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ Newsletter */}
      <section className="max-w-4xl mx-auto text-center py-16 px-4">
        <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get exclusive offers, updates, and early access to new arrivals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Input
            placeholder="Enter your email"
            className="sm:w-2/3 px-4 py-2 rounded-full"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
            Subscribe
          </Button>
        </div>
      </section>

      {/* 7️⃣ CTA Banner */}
      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Tech?</h2>
        <p className="mb-6 text-gray-100">
          Shop the latest gadgets and enjoy unbeatable prices.
        </p>
        <Link href="/products">
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-200">
            Start Shopping →
          </Button>
        </Link>
      </section>
    </main>
  );
}
