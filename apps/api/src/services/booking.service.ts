import { PrismaClient } from "../generated/prisma";
import { CreateBookingData, UpdateBookingData, BookingFilters } from "../types/booking.types";
import { sendBookingConfirmationEmail } from "../utils/emailService";

const prisma = new PrismaClient();

export class BookingService {
  // Create a new booking
  async createBooking(data: CreateBookingData) {
    try {
      const booking = await prisma.booking.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          eventDate: new Date(data.eventDate),
          eventTime: data.eventTime,
          eventLocation: data.eventLocation,
          guestCount: data.guestCount,
          eventType: data.eventType,
          packageType: data.packageType,
          packageName: data.packageName,
          packagePrice: data.packagePrice,
          specialRequirements: data.specialRequirements,
          bookingType: data.bookingType,
          businessType: data.businessType,
          personalType: data.personalType,
        },
      });

      // Send confirmation email
      try {
        const emailSent = await sendBookingConfirmationEmail(booking);
        if (emailSent) {
          console.log(`✅ Booking confirmation email sent to ${booking.email}`);
        } else {
          console.log(`⚠️ Failed to send booking confirmation email to ${booking.email}`);
        }
      } catch (emailError) {
        console.error("Error sending booking confirmation email:", emailError);
        // Don't throw error here as booking was created successfully
      }

      return booking;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw new Error("Failed to create booking");
    }
  }

  // Get all bookings with optional filters
  async getBookings(filters: BookingFilters = {}) {
    try {
      const where: any = {};
      
      if (filters.status) {
        where.status = filters.status;
      }
      
      if (filters.packageType) {
        where.packageType = filters.packageType;
      }
      
      if (filters.bookingType) {
        where.bookingType = filters.bookingType;
      }
      
      if (filters.isActive !== undefined) {
        where.isActive = filters.isActive;
      }
      
      if (filters.dateFrom || filters.dateTo) {
        where.eventDate = {};
        if (filters.dateFrom) {
          where.eventDate.gte = filters.dateFrom;
        }
        if (filters.dateTo) {
          where.eventDate.lte = filters.dateTo;
        }
      }

      const bookings = await prisma.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw new Error("Failed to fetch bookings");
    }
  }

  // Get booking by ID
  async getBookingById(id: string) {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id },
      });
      return booking;
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw new Error("Failed to fetch booking");
    }
  }

  // Update booking
  async updateBooking(id: string, data: UpdateBookingData) {
    try {
      const booking = await prisma.booking.update({
        where: { id },
        data,
      });
      return booking;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw new Error("Failed to update booking");
    }
  }

  // Delete booking (soft delete by setting isActive to false)
  async deleteBooking(id: string) {
    try {
      const booking = await prisma.booking.update({
        where: { id },
        data: { isActive: false },
      });
      return booking;
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw new Error("Failed to delete booking");
    }
  }

  // Get booking statistics
  async getBookingStats() {
    try {
      const totalBookings = await prisma.booking.count({
        where: { isActive: true },
      });
      
      const pendingBookings = await prisma.booking.count({
        where: { isActive: true, status: "PENDING" },
      });
      
      const confirmedBookings = await prisma.booking.count({
        where: { isActive: true, status: "CONFIRMED" },
      });
      
      const completedBookings = await prisma.booking.count({
        where: { isActive: true, status: "COMPLETED" },
      });

      return {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
      };
    } catch (error) {
      console.error("Error fetching booking stats:", error);
      throw new Error("Failed to fetch booking statistics");
    }
  }
}
