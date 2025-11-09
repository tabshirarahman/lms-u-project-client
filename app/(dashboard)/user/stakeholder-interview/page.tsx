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

// ---------------- SCHEMA ----------------
const stakeholderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(1, "Role is required"),
  goal: z.string().min(5, "Goal is required"),
  audience: z.string().min(5, "Target audience is required"),
  problem: z.string().min(5, "Describe your current problem"),
  features: z.string().min(5, "Mention desired features"),
  success: z.string().min(5, "Define success metrics"),

  // optional dynamic fields
  company: z.string().optional(),
  budget: z.string().optional(),
  campaignFocus: z.string().optional(),
  techStack: z.string().optional(),
  usageFrequency: z.string().optional(),
});

type StakeholderForm = z.infer<typeof stakeholderSchema>;

// ---------------- COMPONENT ----------------
export default function StakeholderInterviewPage() {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const form = useForm<StakeholderForm>({
    resolver: zodResolver(stakeholderSchema),
    defaultValues: {
      name: "",
      role: "",
      goal: "",
      audience: "",
      problem: "",
      features: "",
      success: "",
      company: "",
      budget: "",
      campaignFocus: "",
      techStack: "",
      usageFrequency: "",
    },
  });

  const onSubmit = async (data: StakeholderForm) => {
    try {
      console.log("Submitted Data:", data); // you can call your API here
      toast.success("Interview submitted successfully!");
      form.reset();
      setSelectedRole("");
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Stakeholder Interview</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg">
        {/* Basic Fields */}
        <Input placeholder="Your Name" {...form.register("name")} />

        {/* Role Selection */}
        <Select
          onValueChange={(val) => {
            form.setValue("role", val);
            setSelectedRole(val);
          }}
        >
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

        {/* 🔹 Conditional Fields Based on Role */}
        {selectedRole === "client" && (
          <div className="space-y-4 border-l-4 border-blue-500 pl-4 bg-blue-50/20 p-3 rounded-md">
            <Input placeholder="Company Name" {...form.register("company")} />
            <Input placeholder="Approximate Budget Range (e.g. $1000 - $5000)" {...form.register("budget")} />
          </div>
        )}

        {selectedRole === "marketing" && (
          <div className="space-y-4 border-l-4 border-green-500 pl-4 bg-green-50/20 p-3 rounded-md">
            <Input placeholder="Main Campaign Focus (SEO, Ads, Social Media...)" {...form.register("campaignFocus")} />
            <Input placeholder="Preferred Marketing Channels" {...form.register("features")} />
          </div>
        )}

        {selectedRole === "developer" && (
          <div className="space-y-4 border-l-4 border-purple-500 pl-4 bg-purple-50/20 p-3 rounded-md">
            <Input placeholder="Preferred Tech Stack (Next.js, React, etc.)" {...form.register("techStack")} />
            <Textarea placeholder="Any UI/UX design preferences?" {...form.register("features")} />
          </div>
        )}

        {selectedRole === "user" && (
          <div className="space-y-4 border-l-4 border-orange-500 pl-4 bg-orange-50/20 p-3 rounded-md">
            <Input placeholder="How often will you use this website?" {...form.register("usageFrequency")} />
            <Textarea placeholder="What frustrations do you have with similar websites?" {...form.register("problem")} />
          </div>
        )}

        {/* Main Interview Questions */}
        <Textarea placeholder="What is the main goal of this project?" {...form.register("goal")} />
        <Textarea placeholder="Who is your target audience?" {...form.register("audience")} />
        <Textarea placeholder="What problems are you currently facing?" {...form.register("problem")} />
        <Textarea placeholder="What features do you need in this website?" {...form.register("features")} />
        <Textarea placeholder="How will you define project success?" {...form.register("success")} />

        <Button type="submit" className="w-full font-semibold bg-black text-white hover:bg-neutral-800">
          Submit Interview
        </Button>
      </form>
    </section>
  );
}
