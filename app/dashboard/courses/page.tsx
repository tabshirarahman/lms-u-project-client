"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { COURSES } from "@/data/course.data";

export default function DashboardCoursesPage() {
  // Mock enrolled data (later replace with DB/API)
  const enrolledCourses = [
    { ...COURSES[0], progress: 80 },
    { ...COURSES[1], progress: 40 },
  ];

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      {enrolledCourses.length === 0 ? (
        <p className="text-gray-500 text-center">You haven’t enrolled in any courses yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition">
              <CardContent className="p-4 space-y-3">
                <div className="relative w-full h-40">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{course.name}</h3>
                <p className="text-gray-500 text-sm">{course.instructor}</p>
                <Progress value={course.progress} className="mt-3" />
                <p className="text-sm text-gray-600">
                  {course.progress}% Completed
                </p>
                <Link href={`/dashboard/courses/${course.id}`}>
                  <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                    {course.progress === 100 ? "View Certificate" : "Continue Course"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
