"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Competitor {
  id: number;
  name: string;
  website: string;
  strengths: string;
  weaknesses: string;
  uniqueFeatures: string;
  differentiation: string;
}

export default function CompetitiveAnalysisPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: 1,
      name: "PixelCraft Agency",
      website: "https://pixelcraft.io",
      strengths: "Great visual design, strong brand storytelling.",
      weaknesses: "Slow website speed, no pricing transparency.",
      uniqueFeatures: "Interactive portfolio showcase.",
      differentiation: "Focus on conversion-focused UI/UX design.",
    },
    {
      id: 2,
      name: "DesignX Studio",
      website: "https://designx.com",
      strengths: "Clean interface and mobile optimization.",
      weaknesses: "Limited SEO structure, basic contact form.",
      uniqueFeatures: "AI-based project estimator tool.",
      differentiation: "Offer speed + SEO as core differentiators.",
    },
  ]);

  const [newCompetitor, setNewCompetitor] = useState({
    name: "",
    website: "",
    strengths: "",
    weaknesses: "",
    uniqueFeatures: "",
    differentiation: "",
  });

  const addCompetitor = () => {
    if (!newCompetitor.name || !newCompetitor.website)
      return toast.error("Name and website are required!");
    setCompetitors([
      { id: Date.now(), ...newCompetitor },
      ...competitors,
    ]);
    setNewCompetitor({
      name: "",
      website: "",
      strengths: "",
      weaknesses: "",
      uniqueFeatures: "",
      differentiation: "",
    });
    toast.success("Competitor added!");
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">🏁 Competitive Analysis</h1>
      <p className="text-gray-600 mb-8">
        Study your competitors’ websites to identify common features, strengths, and gaps.
      </p>

      {/* Add New Competitor Form */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md mb-10 space-y-4">
        <h2 className="text-lg font-semibold">Add New Competitor</h2>
        <Input
          placeholder="Competitor Name"
          value={newCompetitor.name}
          onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
        />
        <Input
          placeholder="Website URL"
          value={newCompetitor.website}
          onChange={(e) => setNewCompetitor({ ...newCompetitor, website: e.target.value })}
        />
        <Textarea
          placeholder="Strengths (what they do well)"
          value={newCompetitor.strengths}
          onChange={(e) => setNewCompetitor({ ...newCompetitor, strengths: e.target.value })}
        />
        <Textarea
          placeholder="Weaknesses (what they lack)"
          value={newCompetitor.weaknesses}
          onChange={(e) => setNewCompetitor({ ...newCompetitor, weaknesses: e.target.value })}
        />
        <Textarea
          placeholder="Unique Features"
          value={newCompetitor.uniqueFeatures}
          onChange={(e) => setNewCompetitor({ ...newCompetitor, uniqueFeatures: e.target.value })}
        />
        <Textarea
          placeholder="Your Differentiation Strategy"
          value={newCompetitor.differentiation}
          onChange={(e) => setNewCompetitor({ ...newCompetitor, differentiation: e.target.value })}
        />

        <Button onClick={addCompetitor} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Add Competitor
        </Button>
      </div>

      {/* Competitor List */}
      <div className="grid gap-6 md:grid-cols-2">
        {competitors.map((c) => (
          <Card key={c.id} className="hover:shadow-lg transition border border-gray-100 dark:border-neutral-800">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{c.name}</h3>
                <Badge variant="outline">Competitor</Badge>
              </div>
              <a
                href={c.website}
                target="_blank"
                className="text-blue-600 hover:underline text-sm"
              >
                {c.website}
              </a>
              <p><strong>Strengths:</strong> {c.strengths}</p>
              <p><strong>Weaknesses:</strong> {c.weaknesses}</p>
              <p><strong>Unique Features:</strong> {c.uniqueFeatures}</p>
              <p><strong>Our Differentiation:</strong> {c.differentiation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
