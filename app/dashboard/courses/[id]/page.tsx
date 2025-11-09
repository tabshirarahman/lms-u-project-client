"use client";

import { COURSES } from "@/data/course.data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function DashboardCourseDetailsPage() {
  const params = useParams();
  const course = COURSES.find((c) => c.id === params.id);

  if (!course) return <p className="text-center py-10">Course not found.</p>;

  const lectures = [
    { id: 1, title: "Introduction to the Course", duration: "05:00", completed: true },
    { id: 2, title: "Module 1: Basics of Web Development", duration: "12:45", completed: true },
    { id: 3, title: "Module 2: Working with Databases", duration: "15:30", completed: false },
    { id: 4, title: "Module 3: Deployment", duration: "10:20", completed: false },
  ];

  const progress = Math.round((lectures.filter(l => l.completed).length / lectures.length) * 100);

  return (
    <section className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      {/* Hero */}
      <div className="relative h-64 rounded-lg overflow-hidden">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl font-bold">{course.name}</h1>
          <p className="text-gray-300">{course.instructor}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Course Progress</h2>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-600 mt-2">{progress}% Completed</p>
      </div>

      {/* Lecture List */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Lectures</h3>
        <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
          {lectures.map((lecture) => (
            <li
              key={lecture.id}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="font-medium">{lecture.title}</p>
                <p className="text-sm text-gray-500">{lecture.duration}</p>
              </div>
              {lecture.completed ? (
                <Button variant="outline" size="sm" disabled>
                  Completed
                </Button>
              ) : (
                <Button variant="secondary" size="sm" className="bg-blue-600 text-white">
                  Start
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Materials */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Course Materials</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              📄 Lecture Notes (PDF)
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              🎥 Recorded Sessions
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              🧩 Assignments Folder
            </a>
          </li>
        </ul>
      </div>

      {/* Final CTA */}
      {progress === 100 && (
        <div className="text-center pt-6">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            🎓 Download Certificate
          </Button>
        </div>
      )}
    </section>
  );
}
