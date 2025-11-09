import { SERVICES } from "@/data/services.data";
import { ServiceCard } from "@/components/cards/ServiceCard";

export const metadata = {
  title: "Our Services | DigitalFix",
  description:
    "Explore our professional services including Web Development, App Development, UI/UX Design, and Digital Marketing.",
};

export default function ServicesPage() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-neutral-950 py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Services
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We provide end-to-end digital solutions — from design to development
          and marketing — helping your brand grow in the modern digital world.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
