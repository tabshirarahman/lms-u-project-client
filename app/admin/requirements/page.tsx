"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Requirement {
  id: number;
  title: string;
  type: "Functional" | "Non-Functional";
  category: string;
  description: string;
  priority: "High" | "Medium" | "Low";
}

export default function RequirementsTracker() {
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: 1,
      title: "User login and registration",
      type: "Functional",
      category: "User-Facing",
      description: "Allow users to create an account and log in securely.",
      priority: "High",
    },
    {
      id: 2,
      title: "Page load performance",
      type: "Non-Functional",
      category: "Performance",
      description: "Website must load within 3 seconds.",
      priority: "High",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    type: "Functional",
    category: "",
    description: "",
    priority: "Medium",
  });

  const addRequirement = () => {
    if (!formData.title.trim()) return toast.error("Title is required!");
    const newReq: Requirement = { id: Date.now(), ...formData } as Requirement;
    setRequirements([newReq, ...requirements]);
    setFormData({ title: "", type: "Functional", category: "", description: "", priority: "Medium" });
    toast.success("Requirement added successfully!");
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">📋 Requirements Categorization</h1>
      <p className="text-gray-600 mb-8">
        Classify and manage functional and non-functional requirements for your project.
      </p>

      {/* Add Requirement Form */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md mb-10 space-y-4">
        <Input
          placeholder="Requirement Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <Select
          onValueChange={(v) => setFormData({ ...formData, type: v as "Functional" | "Non-Functional" })}
          defaultValue={formData.type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Functional">Functional</SelectItem>
            <SelectItem value="Non-Functional">Non-Functional</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Category (e.g. Performance, Security, Admin-Facing)"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />

        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <Select
          onValueChange={(v) => setFormData({ ...formData, priority: v as "High" | "Medium" | "Low" })}
          defaultValue={formData.priority}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={addRequirement} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Add Requirement
        </Button>
      </div>

      {/* Requirement List */}
      <div className="grid md:grid-cols-2 gap-6">
        {requirements.map((r) => (
          <Card key={r.id} className="border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition">
            <CardContent className="p-5 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">{r.title}</h3>
                <Badge
                  className={
                    r.type === "Functional" ? "bg-green-600" : "bg-purple-600"
                  }
                >
                  {r.type}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{r.category}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{r.description}</p>
              <Badge
                className={`${
                  r.priority === "High"
                    ? "bg-red-500"
                    : r.priority === "Medium"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              >
                {r.priority} Priority
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
