import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";
import { createBookingSchema, updateBookingSchema } from "../schemas/booking.schemas";

const bookingService = new BookingService();

export class BookingController {
  // Create a new booking
  async createBooking(req: Request, res: Response) {
    try {
      const validatedData = createBookingSchema.parse(req.body);
      const booking = await bookingService.createBooking(validatedData);
      
      res.status(201).json({
        success: true,
        data: booking,
        message: "Booking created successfully",
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create booking",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Get all bookings
  async getAllBookings(req: Request, res: Response) {
    try {
      const { status, packageType, bookingType, isActive, dateFrom, dateTo } = req.query;
      
      const filters: any = {};
      if (status) filters.status = status as string;
      if (packageType) filters.packageType = packageType as string;
      if (bookingType) filters.bookingType = bookingType as string;
      if (isActive !== undefined) filters.isActive = isActive === "true";
      if (dateFrom) filters.dateFrom = new Date(dateFrom as string);
      if (dateTo) filters.dateTo = new Date(dateTo as string);

      const bookings = await bookingService.getBookings(filters);
      
      res.json({
        success: true,
        data: bookings,
        message: "Bookings retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve bookings",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Get booking by ID
  async getBookingById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await bookingService.getBookingById(id);
      
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }
      
      res.json({
        success: true,
        data: booking,
        message: "Booking retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve booking",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Update booking
  async updateBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateBookingSchema.parse(req.body);
      const booking = await bookingService.updateBooking(id, validatedData);
      
      res.json({
        success: true,
        data: booking,
        message: "Booking updated successfully",
      });
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update booking",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Delete booking
  async deleteBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await bookingService.deleteBooking(id);
      
      res.json({
        success: true,
        message: "Booking deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete booking",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Get booking statistics
  async getBookingStats(req: Request, res: Response) {
    try {
      const stats = await bookingService.getBookingStats();
      
      res.json({
        success: true,
        data: stats,
        message: "Booking statistics retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching booking stats:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve booking statistics",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

