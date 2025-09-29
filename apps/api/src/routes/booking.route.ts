import { Router } from "express";
import { BookingController } from "../controller/booking.controller";

const router = Router();
const bookingController = new BookingController();

// Booking routes
router.post("/", (req, res) => bookingController.createBooking(req, res));
router.get("/", (req, res) => bookingController.getAllBookings(req, res));
router.get("/stats", (req, res) => bookingController.getBookingStats(req, res));
router.get("/:id", (req, res) => bookingController.getBookingById(req, res));
router.put("/:id", (req, res) => bookingController.updateBooking(req, res));
router.delete("/:id", (req, res) => bookingController.deleteBooking(req, res));

export default router;

