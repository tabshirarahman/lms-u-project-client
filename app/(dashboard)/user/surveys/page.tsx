"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const surveySchema = z.object({
  name: z.string().min(2, "Name required"),
  satisfaction: z.string().min(1, "Required"),
  preferredFeature: z.string().min(1, "Required"),
  device: z.string().min(1, "Required"),
  suggestion: z.string().optional(),
});

type TSurvey = z.infer<typeof surveySchema>;

export default function SurveyForm() {
  const form = useForm<TSurvey>({
    resolver: zodResolver(surveySchema),
  });

  const onSubmit = async (data: TSurvey) => {
    console.log(data);
    toast.success("Survey submitted successfully!");
    form.reset();
  };

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">User Experience Survey</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md">
        <Input placeholder="Your Name" {...form.register("name")} />

        <div>
          <Label>1. How satisfied are you with the current website?</Label>
          <RadioGroup onValueChange={(v) => form.setValue("satisfaction", v)} className="mt-2 space-y-2">
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="very_satisfied" /> Very satisfied
            </Label>
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="satisfied" /> Satisfied
            </Label>
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="neutral" /> Neutral
            </Label>
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="unsatisfied" /> Unsatisfied
            </Label>
          </RadioGroup>
        </div>

        <div>
          <Label>2. Which feature is most valuable to you?</Label>
          <RadioGroup onValueChange={(v) => form.setValue("preferredFeature", v)} className="mt-2 space-y-2">
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="speed" /> Fast performance
            </Label>
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="design" /> Modern design
            </Label>
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="usability" /> Easy navigation
            </Label>
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="support" /> Customer support
            </Label>
          </RadioGroup>
        </div>

        <div>
          <Label>3. What device do you use most?</Label>
          <RadioGroup onValueChange={(v) => form.setValue("device", v)} className="mt-2 space-y-2">
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="desktop" /> Desktop
            </Label>
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="mobile" /> Mobile
            </Label>
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="tablet" /> Tablet
            </Label>
          </RadioGroup>
        </div>

        <Textarea placeholder="4. Any additional suggestions?" {...form.register("suggestion")} />

        <Button type="submit" className="w-full font-semibold">
          Submit Survey
        </Button>
      </form>
    </section>
  );
}
