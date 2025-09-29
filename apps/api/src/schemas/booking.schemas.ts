import { z } from "zod";

export const createBookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),
  eventLocation: z.string().min(2, "Event location must be at least 2 characters"),
  guestCount: z.number().min(1, "Guest count must be at least 1"),
  eventType: z.string().min(1, "Event type is required"),
  packageType: z.string().min(1, "Package type is required"),
  packageName: z.string().min(1, "Package name is required"),
  packagePrice: z.string().min(1, "Package price is required"),
  specialRequirements: z.string().optional(),
  bookingType: z.string().optional(),
  businessType: z.string().optional(),
  personalType: z.string().optional(),
});

export const updateBookingSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  adminNotes: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;

