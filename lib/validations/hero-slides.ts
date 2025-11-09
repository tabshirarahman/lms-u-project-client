import { z } from "zod";

export const heroSlideSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  subtitle: z
    .string()
    .min(1, "Subtitle is required")
    .max(200, "Subtitle must be less than 200 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  backgroundImage: z.string().url("Please provide a valid image URL"),
  ctaText: z
    .string()

    .optional(),
  ctaLink: z.string().optional(),
  secondaryCtaText: z
    .string()

    .optional(),
  secondaryCtaLink: z.string().optional(),

  textColor: z.enum(["white", "black", "gray"], {
    required_error: "Please select a text color",
  }),
  overlayOpacity: z
    .number()
    .min(0, "Opacity must be at least 0")
    .max(1, "Opacity must be at most 1"),
  order: z.number().min(1, "Order must be at least 1").max(100, "Order must be less than 100"),
  isActive: z.boolean(),
});

export type HeroSlideFormData = z.infer<typeof heroSlideSchema>;
