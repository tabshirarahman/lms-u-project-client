"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Idea {
  id: number;
  text: string;
  votes: number;
  priority: "High" | "Medium" | "Low";
}

export default function BrainstormWorkshopPage() {
  const [ideas, setIdeas] = useState<Idea[]>([
    { id: 1, text: "Add dynamic service pages", votes: 5, priority: "High" },
    { id: 2, text: "Integrate chat support", votes: 3, priority: "Medium" },
    { id: 3, text: "Improve mobile responsiveness", votes: 7, priority: "High" },
  ]);
  const [newIdea, setNewIdea] = useState("");

  const addIdea = () => {
    if (!newIdea.trim()) return toast.error("Write an idea first!");
    const idea: Idea = {
      id: Date.now(),
      text: newIdea,
      votes: 0,
      priority: "Medium",
    };
    setIdeas((prev) => [idea, ...prev]);
    setNewIdea("");
    toast.success("Idea added!");
  };

  const upvoteIdea = (id: number) => {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, votes: i.votes + 1 } : i))
    );
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">💡 Team Brainstorm Workshop</h1>
      <p className="text-gray-600 mb-6">
        Collaboratively share and prioritize website requirements. Each team
        member can add ideas and upvote the best ones.
      </p>

      {/* Add Idea Input */}
      <div className="flex gap-3 mb-8">
        <Input
          placeholder="Enter your new idea..."
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
        />
        <Button onClick={addIdea} className="bg-blue-600 hover:bg-blue-700 text-white">
          Add Idea
        </Button>
      </div>

      {/* Idea List */}
      <div className="grid gap-4 md:grid-cols-2">
        {ideas.map((idea) => (
          <Card key={idea.id} className="hover:shadow-lg transition">
            <CardContent className="p-5 flex flex-col justify-between">
              <p className="text-gray-900 dark:text-white mb-3">{idea.text}</p>
              <div className="flex justify-between items-center">
                <Badge
                  className={
                    idea.priority === "High"
                      ? "bg-red-500"
                      : idea.priority === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }
                >
                  {idea.priority}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => upvoteIdea(idea.id)}
                >
                  👍 {idea.votes}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
