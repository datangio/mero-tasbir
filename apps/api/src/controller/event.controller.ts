import { Request, Response } from "express";
import { EventService } from "../services/event.service";
import { createEventSchema, updateEventSchema } from "../schemas/event.schemas";

const eventService = new EventService();

export class EventController {
  // Get all events
  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await eventService.getEvents({});
      res.json({
        success: true,
        data: events,
        message: "Events retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve events",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Get event by ID
  async getEventById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const event = await eventService.getEventById(id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found",
        });
      }
      res.json({
        success: true,
        data: event,
        message: "Event retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Create event
  async createEvent(req: Request, res: Response) {
    try {
      const validatedData = createEventSchema.parse(req.body);
      const event = await eventService.createEvent(validatedData);
      res.status(201).json({
        success: true,
        data: event,
        message: "Event created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Update event
  async updateEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateEventSchema.parse(req.body);
      const event = await eventService.updateEvent(id, {
        ...validatedData,
        status: validatedData.status as any,
      });
      res.json({
        success: true,
        data: event,
        message: "Event updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Delete event
  async deleteEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await eventService.deleteEvent(id);
      res.json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}