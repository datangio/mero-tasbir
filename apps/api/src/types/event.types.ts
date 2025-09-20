/**
 * TypeScript types for Event Management System
 * Defines interfaces for events, catering services, and equipment rental
 */

import { 
  EventType, 
  EventStatus, 
  EquipmentCategory, 
  EquipmentStatus, 
  CateringCategory 
} from '../generated/prisma';

// Event Types
export interface CreateEventRequest {
  title: string;
  description?: string;
  eventType: EventType;
  eventDate: string; // ISO date string
  startTime?: string;
  endTime?: string;
  duration?: number;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  expectedGuests?: number;
  minGuests?: number;
  maxGuests?: number;
  basePrice?: number;
  discountAmount?: number;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  specialRequests?: string;
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  images?: string[];
  videos?: string[];
  adminNotes?: string;
  internalNotes?: string;
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  eventType?: EventType;
  status?: EventStatus;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  location?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  expectedGuests?: number;
  minGuests?: number;
  maxGuests?: number;
  basePrice?: number;
  discountAmount?: number;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  specialRequests?: string;
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  images?: string[];
  videos?: string[];
  adminNotes?: string;
  internalNotes?: string;
}

export interface EventQueryParams {
  page?: number;
  limit?: number;
  eventType?: EventType;
  status?: EventStatus;
  eventDateFrom?: string;
  eventDateTo?: string;
  location?: string;
  city?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Catering Service Types
export interface CreateCateringServiceRequest {
  name: string;
  description?: string;
  category: CateringCategory;
  basePrice: number;
  pricePerPerson?: number;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  preparationTime?: number;
  servingStyle?: string;
  dietaryInfo?: string[];
  allergens?: string[];
  availableDays?: string[];
  advanceBookingDays?: number;
  images?: string[];
  adminNotes?: string;
}

export interface UpdateCateringServiceRequest {
  name?: string;
  description?: string;
  category?: CateringCategory;
  isActive?: boolean;
  basePrice?: number;
  pricePerPerson?: number;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  preparationTime?: number;
  servingStyle?: string;
  dietaryInfo?: string[];
  allergens?: string[];
  availableDays?: string[];
  advanceBookingDays?: number;
  images?: string[];
  adminNotes?: string;
}

export interface CateringServiceQueryParams {
  page?: number;
  limit?: number;
  category?: CateringCategory;
  isActive?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Equipment Types
export interface CreateEquipmentRequest {
  name: string;
  description?: string;
  category: EquipmentCategory;
  brand?: string;
  model?: string;
  serialNumber?: string;
  specifications?: Record<string, unknown>;
  dailyRentalPrice: number;
  weeklyRentalPrice?: number;
  monthlyRentalPrice?: number;
  securityDeposit?: number;
  availableFrom?: string;
  availableTo?: string;
  advanceBookingDays?: number;
  dimensions?: string;
  weight?: number;
  color?: string;
  condition?: string;
  images?: string[];
  adminNotes?: string;
  maintenanceNotes?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
}

export interface UpdateEquipmentRequest {
  name?: string;
  description?: string;
  category?: EquipmentCategory;
  status?: EquipmentStatus;
  brand?: string;
  model?: string;
  serialNumber?: string;
  specifications?: Record<string, unknown>;
  dailyRentalPrice?: number;
  weeklyRentalPrice?: number;
  monthlyRentalPrice?: number;
  securityDeposit?: number;
  availableFrom?: string;
  availableTo?: string;
  advanceBookingDays?: number;
  dimensions?: string;
  weight?: number;
  color?: string;
  condition?: string;
  images?: string[];
  adminNotes?: string;
  maintenanceNotes?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
}

export interface EquipmentQueryParams {
  page?: number;
  limit?: number;
  category?: EquipmentCategory;
  status?: EquipmentStatus;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Event Catering Service Types
export interface CreateEventCateringServiceRequest {
  eventId: string;
  cateringServiceId: string;
  quantity: number;
  customInstructions?: string;
  specialDietaryRequirements?: string;
}

export interface UpdateEventCateringServiceRequest {
  quantity?: number;
  customInstructions?: string;
  specialDietaryRequirements?: string;
  isConfirmed?: boolean;
  isDelivered?: boolean;
}

// Event Equipment Rental Types
export interface CreateEventEquipmentRentalRequest {
  eventId: string;
  equipmentId: string;
  rentalStartDate: string;
  rentalEndDate: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  deliveryNotes?: string;
  adminNotes?: string;
}

export interface UpdateEventEquipmentRentalRequest {
  rentalStartDate?: string;
  rentalEndDate?: string;
  status?: string;
  isDelivered?: boolean;
  isReturned?: boolean;
  deliveryAddress?: string;
  deliveryDate?: string;
  pickupDate?: string;
  deliveryNotes?: string;
  pickupNotes?: string;
  conditionBefore?: string;
  conditionAfter?: string;
  damageReport?: string;
  damageCost?: number;
  adminNotes?: string;
}

// Event Statistics Types
export interface EventStatsResponse {
  totalEvents: number;
  totalRevenue: number;
  averageEventValue: number;
  monthlyRevenue: number;
  eventsByType: Array<{
    eventType: EventType;
    count: number;
    revenue: number;
  }>;
  eventsByStatus: Array<{
    status: EventStatus;
    count: number;
  }>;
  popularCateringServices: Array<{
    serviceId: string;
    serviceName: string;
    bookingCount: number;
    revenue: number;
  }>;
  popularEquipment: Array<{
    equipmentId: string;
    equipmentName: string;
    rentalCount: number;
    revenue: number;
  }>;
}

// Common Response Types
export interface EventResponse {
  success: boolean;
  data?: any;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Animation Variants for UI Components
export interface EventAnimationVariants {
  container: Record<string, unknown>;
  item: Record<string, unknown>;
  fadeIn: Record<string, unknown>;
  slideUp: Record<string, unknown>;
  stagger: Record<string, unknown>;
}

