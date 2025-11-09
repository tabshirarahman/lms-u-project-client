"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface UserStory {
  id: number;
  story: string;
}

interface Persona {
  id: number;
  name: string;
  role: string;
  goals: string;
  frustrations: string;
  stories: UserStory[];
}

export default function UserPersonaPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [persona, setPersona] = useState({
    name: "",
    role: "",
    goals: "",
    frustrations: "",
  });
  const [story, setStory] = useState("");

  const addPersona = () => {
    if (!persona.name || !persona.role) return toast.error("Please fill all required fields.");
    const newPersona: Persona = {
      id: Date.now(),
      ...persona,
      stories: [],
    };
    setPersonas([newPersona, ...personas]);
    setPersona({ name: "", role: "", goals: "", frustrations: "" });
    toast.success("New persona added!");
  };

  const addStory = (personaId: number) => {
    if (!story.trim()) return toast.error("Write a story first!");
    setPersonas((prev) =>
      prev.map((p) =>
        p.id === personaId
          ? { ...p, stories: [...p.stories, { id: Date.now(), story }] }
          : p
      )
    );
    setStory("");
    toast.success("Story added!");
  };

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">🎯 User Personas & Stories</h1>
      <p className="text-gray-600 mb-8">
        Create fictional user profiles and write stories from their perspective to define
        your project’s requirements more clearly.
      </p>

      {/* Add Persona Form */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md space-y-4 mb-10">
        <h2 className="text-xl font-semibold">Add New Persona</h2>
        <Input
          placeholder="Persona Name (e.g., Sarah, Small Business Owner)"
          value={persona.name}
          onChange={(e) => setPersona({ ...persona, name: e.target.value })}
        />
        <Input
          placeholder="Role (e.g., Startup Founder, Customer)"
          value={persona.role}
          onChange={(e) => setPersona({ ...persona, role: e.target.value })}
        />
        <Textarea
          placeholder="Goals (What do they want to achieve?)"
          value={persona.goals}
          onChange={(e) => setPersona({ ...persona, goals: e.target.value })}
        />
        <Textarea
          placeholder="Frustrations (What problems do they face?)"
          value={persona.frustrations}
          onChange={(e) => setPersona({ ...persona, frustrations: e.target.value })}
        />
        <Button onClick={addPersona} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Add Persona
        </Button>
      </div>

      {/* Display Personas */}
      <div className="grid md:grid-cols-2 gap-6">
        {personas.map((p) => (
          <Card key={p.id} className="shadow-md border border-gray-100 dark:border-neutral-800">
            <CardContent className="p-5 space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.role}</p>
              <p className="text-sm"><strong>Goals:</strong> {p.goals}</p>
              <p className="text-sm"><strong>Frustrations:</strong> {p.frustrations}</p>

              {/* Add Story */}
              <div className="mt-4 space-y-2">
                <Textarea
                  placeholder='Add a user story (e.g. "As a customer, I want to...")'
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addStory(p.id)}
                  className="w-full"
                >
                  Add Story
                </Button>
              </div>

              {/* List Stories */}
              {p.stories.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    User Stories:
                  </h4>
                  <ul className="text-sm space-y-1">
                    {p.stories.map((s) => (
                      <li key={s.id} className="bg-gray-50 dark:bg-neutral-800 p-2 rounded-md">
                        {s.story}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
