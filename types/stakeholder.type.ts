import { z } from "zod";

export const stakeholderSchema = z.object({
  name: z.string().min(2, "Full name required"),
  role: z.enum(["client", "marketing", "developer", "user"]).describe("Role is required"),
  company: z.string().optional(),
  goal: z.string().min(5, "Project goal required"),
  audience: z.string().min(5, "Target audience required"),
  problem: z.string().min(5, "Describe existing issues"),
  features: z.string().min(5, "List desired features"),
  success: z.string().min(5, "Define success"),
});

export type TStakeholder = z.infer<typeof stakeholderSchema>;
