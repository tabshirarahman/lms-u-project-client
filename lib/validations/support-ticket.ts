import { z } from "zod";

export const supportTicketFormSchema = z.object({
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  customerEmail: z.string().optional(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  category: z.enum(["technical", "billing", "booking", "general"], {
    required_error: "Please select a category",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority level",
  }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  relatedBooking: z.string().optional(),
  attachments: z
    .array(z.string().url("Invalid attachment URL"))
    .max(5, "Maximum 5 attachments allowed")
    .optional(),
});

export type SupportTicketFormData = z.infer<typeof supportTicketFormSchema>;
