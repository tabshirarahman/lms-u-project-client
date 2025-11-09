import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services.data";


interface ServiceDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export const metadata = {
  title: "Service Details | DigitalFix",
  description:
    "Detailed information about our digital services including web development, app development, and marketing solutions.",
};

export default async function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
      const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-neutral-950 py-16 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* 🔹 Hero Section */}
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={service!.image}
            alt={service!.title}
            fill
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {service!.title}
            </h1>
            <p className="text-gray-200 mt-3 max-w-2xl">
              {service!.shortDesc}
            </p>
          </div>
        </div>

        {/* 🔹 Details Section */}
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            What’s Included
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2">
            {service!.features.map((feature, index) => (
              <li
                key={index}
                className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow hover:shadow-lg border border-gray-100 dark:border-neutral-800 transition"
              >
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  •{" "}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          {/* 🔹 CTA Section */}
          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium transition"
            >
              Start Your Project →
            </Link>
          </div>
        </div>

        {/* 🔹 Back Link */}
        <div className="mt-10">
          <Link
            href="/services"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            ← Back to All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
