"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const stakeholderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(1, "Role is required"),
  goal: z.string().min(5, "Goal is required"),
  audience: z.string().min(5, "Target audience is required"),
  problem: z.string().min(5, "Describe your current problem"),
  features: z.string().min(5, "Mention desired features"),
  success: z.string().min(5, "Define success metrics"),
});

export default function StakeholderInterviewPage() {
  const form = useForm({
    resolver: zodResolver(stakeholderSchema),
    defaultValues: {
      name: "",
      role: "",
      goal: "",
      audience: "",
      problem: "",
      features: "",
      success: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // Call your API here (Next.js route handler)
      await fetch("/api/stakeholders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      toast.success("Interview submitted successfully!");
      form.reset();
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Stakeholder Interview</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Input placeholder="Your Name" {...form.register("name")} />

        <Select onValueChange={(val) => form.setValue("role", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client">Client / Project Owner</SelectItem>
            <SelectItem value="marketing">Marketing Team</SelectItem>
            <SelectItem value="developer">Developer / Designer</SelectItem>
            <SelectItem value="user">End User</SelectItem>
          </SelectContent>
        </Select>

        <Textarea placeholder="What is the main goal of this project?" {...form.register("goal")} />
        <Textarea placeholder="Who is your target audience?" {...form.register("audience")} />
        <Textarea placeholder="What problems are you currently facing?" {...form.register("problem")} />
        <Textarea placeholder="What features do you need in this website?" {...form.register("features")} />
        <Textarea placeholder="How will you define project success?" {...form.register("success")} />

        <Button type="submit" className="w-full">Submit Interview</Button>
      </form>
    </section>
  );
}
