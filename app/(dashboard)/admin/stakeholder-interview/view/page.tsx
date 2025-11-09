"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { TStakeholder } from "@/types/stakeholder.type";

// 🧩 Mock Data (temporary placeholder before DB integration)
const MOCK_RESPONSES: TStakeholder[] = [
  {
    name: "Syful Alom",
    role: "client",
    company: "DigitalFix",
    goal: "Build a fast, SEO-optimized company website for lead generation.",
    audience: "Business owners, startups, and marketing clients.",
    problem:
      "The old website is slow, not mobile-responsive, and lacks clear service structure.",
    features: "Dynamic service pages, inquiry form, blog, analytics.",
    success: "Increase monthly inquiries by 30% and improve search ranking.",
  },
  {
    name: "Sarah Khan",
    role: "marketing",
    company: "DigitalFix",
    goal: "Improve online visibility and conversion through optimized content.",
    audience: "Tech startups and digital marketing leads.",
    problem:
      "Content structure is confusing; landing pages aren’t optimized for SEO.",
    features: "Blog, SEO tools, lead capture forms, campaign tracking.",
    success: "Rank top 3 for local digital marketing keywords.",
  },
  {
    name: "Tanvir Hasan",
    role: "developer",
    company: "DigitalFix",
    goal: "Create a clean and maintainable Next.js architecture.",
    audience: "Internal development team and clients reviewing deliverables.",
    problem:
      "Codebase lacks modularity, and previous UI wasn’t optimized for mobile.",
    features: "Reusable UI components, better state management, CMS integration.",
    success: "Faster development cycle and better performance scores.",
  },
];

export default function InterviewResponsesPage() {
  const [responses] = useState<TStakeholder[]>(MOCK_RESPONSES);
  const [query, setQuery] = useState("");

  const filtered = responses.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Stakeholder Interview Responses
      </h1>

      <Input
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 max-w-sm"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">
          No responses found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r, i) => (
            <Card
              key={i}
              className="hover:shadow-lg border border-gray-100 dark:border-neutral-800 transition"
            >
              <CardContent className="p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {r.name}
                  </h3>
                  <p className="text-xs text-gray-500 capitalize">
                    {r.role} {r.company ? `• ${r.company}` : ""}
                  </p>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Goal:
                  </span>{" "}
                  {r.goal}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Audience:</span> {r.audience}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Problem:</span>{" "}
                  {r.problem.slice(0, 80)}...
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Features:</span> {r.features}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Success:</span> {r.success}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
