
/**
 * Zod validation schemas for Event Management System
 * Provides type-safe validation for all event-related API endpoints
 */

import { z } from 'zod';

// Define enums directly instead of importing from Prisma
const EventType = {
  WEDDING: 'WEDDING',
  CORPORATE: 'CORPORATE',
  BIRTHDAY: 'BIRTHDAY',
  ANNIVERSARY: 'ANNIVERSARY',
  CONFERENCE: 'CONFERENCE',
  PARTY: 'PARTY',
  OTHER: 'OTHER'
} as const;

const EventStatus = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const;

const EquipmentCategory = {
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  VIDEOGRAPHY: 'VIDEOGRAPHY',
  LIGHTING: 'LIGHTING',
  AUDIO: 'AUDIO',
  STAGING: 'STAGING',
  DECORATION: 'DECORATION',
  OTHER: 'OTHER'
} as const;

const EquipmentStatus = {
  AVAILABLE: 'AVAILABLE',
  RENTED: 'RENTED',
  MAINTENANCE: 'MAINTENANCE',
  OUT_OF_ORDER: 'OUT_OF_ORDER'
} as const;

const CateringCategory = {
  APPETIZERS: 'APPETIZERS',
  MAIN_COURSE: 'MAIN_COURSE',
  DESSERTS: 'DESSERTS',
  BEVERAGES: 'BEVERAGES',
  SNACKS: 'SNACKS',
  SPECIAL_DIETARY: 'SPECIAL_DIETARY'
} as const;

// Common validation schemas
const cuidSchema = z.string().cuid();
const emailSchema = z.string().email();
const phoneSchema = z.string().regex(/^[\+]?[1-9][\d]{0,15}$/).optional();
const decimalSchema = z.number().min(0);
const positiveIntSchema = z.number().int().min(1);
const nonNegativeIntSchema = z.number().int().min(0);

// Event validation schemas
export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  eventType: z.nativeEnum(EventType),
  eventDate: z.string().datetime('Invalid event date format'),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').optional(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').optional(),
  duration: positiveIntSchema.optional(),
  location: z.string().min(1, 'Location is required').max(200, 'Location too long'),
  address: z.string().max(500, 'Address too long').optional(),
  city: z.string().max(100, 'City name too long').optional(),
  state: z.string().max(100, 'State name too long').optional(),
  country: z.string().max(100, 'Country name too long').optional(),
  expectedGuests: positiveIntSchema.optional(),
  minGuests: positiveIntSchema.optional(),
  maxGuests: positiveIntSchema.optional(),
  basePrice: decimalSchema.optional(),
  discountAmount: decimalSchema.optional(),
  contactName: z.string().min(1, 'Contact name is required').max(100, 'Name too long'),
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  specialRequests: z.string().max(1000, 'Special requests too long').optional(),
  dietaryRestrictions: z.string().max(500, 'Dietary restrictions too long').optional(),
  accessibilityNeeds: z.string().max(500, 'Accessibility needs too long').optional(),
  images: z.array(z.string().url('Invalid image URL')).max(20, 'Too many images').optional(),
  videos: z.array(z.string().url('Invalid video URL')).max(10, 'Too many videos').optional(),
  adminNotes: z.string().max(1000, 'Admin notes too long').optional(),
  internalNotes: z.string().max(1000, 'Internal notes too long').optional(),
});

export const updateEventSchema = createEventSchema.partial().extend({
  status: z.nativeEnum(EventStatus).optional(),
});

export const eventQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  eventType: z.nativeEnum(EventType).optional(),
  status: z.nativeEnum(EventStatus).optional(),
  eventDateFrom: z.string().datetime().optional(),
  eventDateTo: z.string().datetime().optional(),
  location: z.string().optional(),
  city: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['title', 'eventDate', 'createdAt', 'finalPrice']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Catering Service validation schemas
export const createCateringServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(200, 'Name too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  category: z.nativeEnum(CateringCategory),
  basePrice: decimalSchema,
  pricePerPerson: decimalSchema.optional(),
  minOrderQuantity: positiveIntSchema.optional(),
  maxOrderQuantity: positiveIntSchema.optional(),
  preparationTime: nonNegativeIntSchema.optional(),
  servingStyle: z.string().max(100, 'Serving style too long').optional(),
  dietaryInfo: z.array(z.string().max(50, 'Dietary info too long')).max(20, 'Too many dietary info').optional(),
  allergens: z.array(z.string().max(50, 'Allergen name too long')).max(20, 'Too many allergens').optional(),
  availableDays: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])).optional(),
  advanceBookingDays: nonNegativeIntSchema.optional(),
  images: z.array(z.string().url('Invalid image URL')).max(10, 'Too many images').optional(),
  adminNotes: z.string().max(1000, 'Admin notes too long').optional(),
});

export const updateCateringServiceSchema = createCateringServiceSchema.partial().extend({
  isActive: z.boolean().optional(),
});
export const cateringServiceQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  category: z.nativeEnum(CateringCategory).optional(),
  isActive: z.coerce.boolean().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'category', 'basePrice', 'createdAt']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// Equipment validation schemas
export const createEquipmentSchema = z.object({
  name: z.string().min(1, 'Equipment name is required').max(200, 'Name too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  category: z.nativeEnum(EquipmentCategory),
  brand: z.string().max(100, 'Brand name too long').optional(),
  model: z.string().max(100, 'Model name too long').optional(),
  serialNumber: z.string().max(100, 'Serial number too long').optional(),
  specifications: z.record(z.string(), z.unknown()).optional(),
  dailyRentalPrice: decimalSchema,
  weeklyRentalPrice: decimalSchema.optional(),
  monthlyRentalPrice: decimalSchema.optional(),
  securityDeposit: decimalSchema.optional(),
  availableFrom: z.string().datetime().optional(),
  availableTo: z.string().datetime().optional(),
  advanceBookingDays: nonNegativeIntSchema.optional(),
  dimensions: z.string().max(100, 'Dimensions too long').optional(),
  weight: decimalSchema.optional(),
  color: z.string().max(50, 'Color name too long').optional(),
  condition: z.enum(['excellent', 'good', 'fair', 'poor']).optional(),
  images: z.array(z.string().url('Invalid image URL')).max(10, 'Too many images').optional(),
  adminNotes: z.string().max(1000, 'Admin notes too long').optional(),
  maintenanceNotes: z.string().max(1000, 'Maintenance notes too long').optional(),
  lastMaintenance: z.string().datetime().optional(),
  nextMaintenance: z.string().datetime().optional(),
});

export const updateEquipmentSchema = createEquipmentSchema.partial().extend({
  status: z.nativeEnum(EquipmentStatus).optional(),
});

export const equipmentQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  category: z.nativeEnum(EquipmentCategory).optional(),
  status: z.nativeEnum(EquipmentStatus).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'category', 'dailyRentalPrice', 'createdAt']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// Event Catering Service validation schemas
export const createEventCateringServiceSchema = z.object({
  eventId: cuidSchema,
  cateringServiceId: cuidSchema,
  quantity: positiveIntSchema,
  customInstructions: z.string().max(500, 'Custom instructions too long').optional(),
  specialDietaryRequirements: z.string().max(500, 'Dietary requirements too long').optional(),
});

export const updateEventCateringServiceSchema = z.object({
  quantity: positiveIntSchema.optional(),
  customInstructions: z.string().max(500, 'Custom instructions too long').optional(),
  specialDietaryRequirements: z.string().max(500, 'Dietary requirements too long').optional(),
  isConfirmed: z.boolean().optional(),
  isDelivered: z.boolean().optional(),
});

// Event Equipment Rental validation schemas
export const createEventEquipmentRentalSchema = z.object({
  eventId: cuidSchema,
  equipmentId: cuidSchema,
  rentalStartDate: z.string().datetime('Invalid rental start date format'),
  rentalEndDate: z.string().datetime('Invalid rental end date format'),
  deliveryAddress: z.string().max(500, 'Delivery address too long').optional(),
  deliveryDate: z.string().datetime().optional(),
  deliveryNotes: z.string().max(500, 'Delivery notes too long').optional(),
  adminNotes: z.string().max(1000, 'Admin notes too long').optional(),
}).refine(
  (data) => new Date(data.rentalEndDate) > new Date(data.rentalStartDate),
  {
    message: 'Rental end date must be after start date',
    path: ['rentalEndDate'],
  }
);

export const updateEventEquipmentRentalSchema = z.object({
  rentalStartDate: z.string().datetime().optional(),
  rentalEndDate: z.string().datetime().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'RENTED', 'RETURNED', 'CANCELLED']).optional(),
  isDelivered: z.boolean().optional(),
  isReturned: z.boolean().optional(),
  deliveryAddress: z.string().max(500, 'Delivery address too long').optional(),
  deliveryDate: z.string().datetime().optional(),
  pickupDate: z.string().datetime().optional(),
  deliveryNotes: z.string().max(500, 'Delivery notes too long').optional(),
  pickupNotes: z.string().max(500, 'Pickup notes too long').optional(),
  conditionBefore: z.string().max(100, 'Condition description too long').optional(),
  conditionAfter: z.string().max(100, 'Condition description too long').optional(),
  damageReport: z.string().max(1000, 'Damage report too long').optional(),
  damageCost: decimalSchema.optional(),
  adminNotes: z.string().max(1000, 'Admin notes too long').optional(),
});

// Parameter validation schemas
export const idParamSchema = z.object({
  id: cuidSchema,
});

export const eventIdParamSchema = z.object({
  eventId: cuidSchema,
});

export const cateringServiceIdParamSchema = z.object({
  id: cuidSchema,
});

export const equipmentIdParamSchema = z.object({
  id: cuidSchema,
});

export const eventCateringServiceIdParamSchema = z.object({
  id: cuidSchema,
});

export const eventEquipmentRentalIdParamSchema = z.object({
  id: cuidSchema,
});

// Event statistics query schema
export const eventStatsQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  eventType: z.nativeEnum(EventType).optional(),
  status: z.nativeEnum(EventStatus).optional(),
});



