"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Book, ShieldCheck, CloudUpload, Users, Star, GraduationCap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      {/* 1️⃣ Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
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
            Centralize & Simplify Academic Learning
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-200 mt-4 text-lg"
          >
            Access, manage, and share course materials seamlessly — anytime, anywhere.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-4"
          >
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Login to Portal
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="px-6 py-3 rounded-full">
                Create Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Core Features */}
      <section className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Core Features</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Upload Materials",
              image:
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
              desc: "Teachers can securely upload course notes, slides, and assignments.",
              icon: CloudUpload,
            },
            {
              title: "Access Resources",
              image:
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
              desc: "Students can easily browse and download materials 24/7.",
              icon: Book,
            },
            {
              title: "Collaborate & Learn",
              image:
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
              desc: "Engage in discussion forums and share study insights.",
              icon: Users,
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="overflow-hidden hover:shadow-lg transition cursor-pointer group"
            >
              <div className="relative h-56">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <CardContent className="p-5">
                <feature.icon className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3️⃣ Popular Courses */}
      <section className="bg-white dark:bg-neutral-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Popular Courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                title: "Computer Science",
                image:
                  "https://images.unsplash.com/photo-1581091012184-5c482da4e9b0",
              },
              {
                title: "Business Administration",
                image:
                  "https://images.unsplash.com/photo-1542744173-05336fcc7ad4",
              },
              {
                title: "Electrical Engineering",
                image:
                  "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
              },
              {
                title: "Psychology",
                image:
                  "https://images.unsplash.com/photo-1532634896-26909d0d4b7b",
              },
            ].map((course, i) => (
              <Card
                key={i}
                className="hover:shadow-lg border border-gray-100 dark:border-neutral-800 transition"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="relative w-full h-48">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <Link href="/courses">
                    <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                      View Materials
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
        <h2 className="text-3xl font-bold mb-10">Why Choose Our Platform</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              icon: ShieldCheck,
              title: "Secure Access",
              desc: "Only authorized students and teachers can manage content.",
            },
            {
              icon: CloudUpload,
              title: "Cloud Storage",
              desc: "Access materials from any device, anytime.",
            },
            {
              icon: GraduationCap,
              title: "Academic Focused",
              desc: "Tailored for university and institutional needs.",
            },
            {
              icon: Star,
              title: "User Friendly",
              desc: "Minimal design, smooth navigation, and fast loading.",
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
          <h2 className="text-3xl font-bold mb-10">What Users Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Prof. Emily Carter",
                text: "Uploading lecture notes is effortless and accessible to all my students!",
              },
              {
                name: "John Doe, Student",
                text: "I can find all my course materials in one place — a game changer!",
              },
              {
                name: "Sarah Lee, Faculty",
                text: "A secure and organized platform for all academic resources.",
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
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Subscribe for university announcements, course updates, and resource alerts.
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
        <h2 className="text-3xl font-bold mb-4">Empower Learning Today</h2>
        <p className="mb-6 text-gray-100">
          Join our platform and manage your academic materials efficiently.
        </p>
        <Link href="/register">
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-200">
            Get Started →
          </Button>
        </Link>
      </section>
    </main>
  );
}
