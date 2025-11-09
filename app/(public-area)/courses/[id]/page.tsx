"use client";

import { COURSES } from "@/data/course.data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const course = COURSES.find((c) => c.id === params.id);

  if (!course) return <p className="p-10 text-center">Course not found</p>;

  // ✅ Stripe Enrollment Logic
  const handleEnroll = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              name: course.name,
              price: course.price ?? 100, // ⚠️ default price if not set
              quantity: 1,
            },
          ],
        }),
      });

      const data = await res.json();

      if (data.url) {
        router.push(data.url); // ✅ Redirect to Stripe checkout
      } else {
        toast.error("Enrollment failed. No redirect URL received.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong with Stripe checkout.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10">
      <Image
        src={course.image}
        alt={course.name}
        width={500}
        height={400}
        className="rounded-lg shadow-md object-cover"
      />
      <div>
        <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
        <p className="text-gray-500 mb-2 capitalize">
          Category: {course.category}
        </p>
        <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
        <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {course.description}
        </p>

        <Button
          onClick={handleEnroll}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Enroll Now (via Stripe)
        </Button>
      </div>
    </section>
  );
}
