"use client";

import Image from "next/image";
import Link from "next/link";
import { IService } from "@/data/services.data";
import { motion } from "framer-motion";

interface ServiceCardProps {
  service: IService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group bg-white dark:bg-neutral-900 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {service.shortDesc}
        </p>
        <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 text-sm">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="inline-block mt-3 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Learn More →
        </Link>
      </div>
    </motion.div>
  );
}
