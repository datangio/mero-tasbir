import { z } from "zod";
import { MediaCategory } from "../types/media.types";

export const createMediaSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  originalName: z.string().min(1, "Original name is required"),
  mimeType: z.string().min(1, "MIME type is required"),
  size: z.number().int().positive("Size must be positive"),
  url: z.string().url("Invalid URL format"),
  thumbnailUrl: z.string().url("Invalid thumbnail URL format").optional(),
  category: z.nativeEnum(MediaCategory),
  clientName: z.string().min(1, "Client name is required for client portfolio").optional(),
  description: z.string().max(1000, "Description too long").optional(),
  tags: z.array(z.string()).default([]),
  uploadedBy: z.string().cuid("Invalid admin ID").optional(),
});

export const updateMediaSchema = z.object({
  category: z.nativeEnum(MediaCategory).optional(),
  clientName: z.string().min(1, "Client name is required for client portfolio").optional(),
  description: z.string().max(1000, "Description too long").optional(),
  tags: z.array(z.string()).default([]).optional(),
  isActive: z.boolean().optional(),
});

export const mediaQuerySchema = z.object({
  page: z.string().transform(Number).pipe(z.number().int().positive()).default(1),
  limit: z.string().transform(Number).pipe(z.number().int().positive().max(100)).default(10),
  category: z.nativeEnum(MediaCategory).optional(),
  search: z.string().optional(),
  isActive: z.string().transform(Boolean).optional(),
});

export const mediaUploadSchema = z.object({
  category: z.string().min(1, "Category is required"),
  clientName: z.string().min(1, "Client name is required for client portfolio").optional(),
  description: z.string().max(1000, "Description too long").optional(),
  tags: z.array(z.string()).default([]).optional(),
}).refine((data) => {
  if (data.category === 'CLIENT_PORTFOLIO' && !data.clientName) {
    return false;
  }
  return true;
}, {
  message: "Client name is required when category is CLIENT_PORTFOLIO",
  path: ["clientName"]
});






























