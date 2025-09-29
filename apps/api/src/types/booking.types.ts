export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventDate: Date;
  eventTime: string;
  eventLocation: string;
  guestCount: number;
  eventType: string;
  packageType: string;
  packageName: string;
  packagePrice: string;
  specialRequirements?: string;
  bookingType?: string;
  businessType?: string;
  personalType?: string;
  status: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  adminNotes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingData {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  guestCount: number;
  eventType: string;
  packageType: string;
  packageName: string;
  packagePrice: string;
  specialRequirements?: string;
  bookingType?: string;
  businessType?: string;
  personalType?: string;
}

export interface UpdateBookingData {
  status?: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  adminNotes?: string;
  isActive?: boolean;
}

export interface BookingFilters {
  status?: string;
  packageType?: string;
  bookingType?: string;
  isActive?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

