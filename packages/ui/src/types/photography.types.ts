/**
 * TypeScript types for Photography Booking Management
 * Defines interfaces for photography bookings, packages, and services
 */

export interface PhotographyBooking {
  id: string;
  bookingNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  eventType: 'WEDDING' | 'CORPORATE' | 'PERSONAL' | 'EVENT';
  serviceCategory: 'WEDDING' | 'CORPORATE' | 'PERSONAL' | 'EVENT';
  packageType: 'PHOTOGRAPHY' | 'VIDEOGRAPHY' | 'BOTH';
  
  // Event Details
  eventDate: string;
  eventTime?: string;
  duration: number;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  
  // Package Information
  packageId?: string;
  packageName?: string;
  isCustomPackage: boolean;
  customRequirements?: string;
  
  // Pricing
  basePrice: number;
  addOnPrice: number;
  totalPrice: number;
  discountAmount: number;
  finalPrice: number;
  
  // Status
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PARTIAL' | 'PAID' | 'REFUNDED';
  
  // Add-ons
  addOns: BookingAddOn[];
  
  // Special Requirements
  specialRequests?: string;
  deliveryPreferences?: string;
  
  // Media
  sampleImages?: string[];
  finalImages?: string[];
  
  // Admin
  adminNotes?: string;
  internalNotes?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface BookingAddOn {
  id: string;
  addOnId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface PhotographyPackage {
  id: string;
  name: string;
  description?: string;
  packageType: 'PHOTOGRAPHY' | 'VIDEOGRAPHY' | 'BOTH';
  serviceCategory: 'WEDDING' | 'CORPORATE' | 'PERSONAL' | 'EVENT';
  basePrice: number;
  duration: number;
  maxPhotos?: number;
  includes: string[];
  addOns: string[];
  isCustomizable: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePhotographyBookingRequest {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  eventType: 'WEDDING' | 'CORPORATE' | 'PERSONAL' | 'EVENT';
  serviceCategory: 'WEDDING' | 'CORPORATE' | 'PERSONAL' | 'EVENT';
  packageType: 'PHOTOGRAPHY' | 'VIDEOGRAPHY' | 'BOTH';
  eventDate: string;
  eventTime?: string;
  duration: number;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  packageId?: string;
  isCustomPackage: boolean;
  customRequirements?: string;
  addOns?: string[];
  specialRequests?: string;
  deliveryPreferences?: string;
  adminNotes?: string;
}

export interface UpdatePhotographyBookingRequest {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  eventType?: 'WEDDING' | 'CORPORATE' | 'PERSONAL' | 'EVENT';
  serviceCategory?: 'WEDDING' | 'CORPORATE' | 'PERSONAL' | 'EVENT';
  packageType?: 'PHOTOGRAPHY' | 'VIDEOGRAPHY' | 'BOTH';
  eventDate?: string;
  eventTime?: string;
  duration?: number;
  location?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  packageId?: string;
  isCustomPackage?: boolean;
  customRequirements?: string;
  addOns?: string[];
  specialRequests?: string;
  deliveryPreferences?: string;
  status?: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  paymentStatus?: 'PENDING' | 'PARTIAL' | 'PAID' | 'REFUNDED';
  adminNotes?: string;
  internalNotes?: string;
}

export interface PhotographyBookingQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  eventType?: string;
  serviceCategory?: string;
  packageType?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PhotographyBookingStats {
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  monthlyRevenue: number;
  bookingsByStatus: Array<{
    status: string;
    count: number;
  }>;
  bookingsByEventType: Array<{
    eventType: string;
    count: number;
    revenue: number;
  }>;
  popularPackages: Array<{
    packageId: string;
    packageName: string;
    bookingCount: number;
    revenue: number;
  }>;
  recentBookings: PhotographyBooking[];
}

// Animation Variants for UI Components
export interface PhotographyAnimationVariants {
  container: Record<string, unknown>;
  item: Record<string, unknown>;
  fadeIn: Record<string, unknown>;
  slideUp: Record<string, unknown>;
  stagger: Record<string, unknown>;
}





















