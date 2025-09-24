import { z } from "zod";

/**
 * Schema for creating a new hero section
 */
export const createHeroSectionSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
    subtitle: z.string().min(1, "Subtitle is required").max(300, "Subtitle must be less than 300 characters"),
    description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
    backgroundImage: z.string().url("Background image must be a valid URL").optional(),
    ctaText: z.string().min(1, "CTA text is required").max(50, "CTA text must be less than 50 characters").optional(),
    rotatingTexts: z.array(z.string().min(1, "Rotating text cannot be empty")).optional(),
  }),
});

/**
 * Schema for updating a hero section
 */
export const updateHeroSectionSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid hero section ID"),
  }),
  body: z.object({
    title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters").optional(),
    subtitle: z.string().min(1, "Subtitle is required").max(300, "Subtitle must be less than 300 characters").optional(),
    description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters").optional(),
    backgroundImage: z.string().url("Background image must be a valid URL").optional(),
    ctaText: z.string().min(1, "CTA text is required").max(50, "CTA text must be less than 50 characters").optional(),
    rotatingTexts: z.array(z.string().min(1, "Rotating text cannot be empty")).optional(),
    isActive: z.boolean().optional(),
  }),
});

/**
 * Schema for hero section ID parameter
 */
export const heroSectionIdSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid hero section ID"),
  }),
});

/**
 * Schema for activating a hero section
 */
export const activateHeroSectionSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid hero section ID"),
  }),
});

export type CreateHeroSectionInput = z.infer<typeof createHeroSectionSchema>;
export type UpdateHeroSectionInput = z.infer<typeof updateHeroSectionSchema>;
export type HeroSectionIdInput = z.infer<typeof heroSectionIdSchema>;
export type ActivateHeroSectionInput = z.infer<typeof activateHeroSectionSchema>;

