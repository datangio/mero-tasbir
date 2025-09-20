/**
 * Event Management Controller
 * Handles HTTP requests for events, catering services, and equipment rental
 */

import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
  createEventSchema,
  updateEventSchema,
  eventQuerySchema,
  createCateringServiceSchema,
  updateCateringServiceSchema,
  cateringServiceQuerySchema,
  createEquipmentSchema,
  updateEquipmentSchema,
  equipmentQuerySchema,
  createEventCateringServiceSchema,
  updateEventCateringServiceSchema,
  createEventEquipmentRentalSchema,
  updateEventEquipmentRentalSchema,
  idParamSchema,
  eventIdParamSchema,
  cateringServiceIdParamSchema,
  equipmentIdParamSchema,
  eventCateringServiceIdParamSchema,
  eventEquipmentRentalIdParamSchema,
  eventStatsQuerySchema
} from '../schemas/event.schemas';
import {
  EventService,
  CateringServiceService,
  EquipmentService,
  EventCateringServiceService,
  EventEquipmentRentalService
} from '../services/event.service';

const eventService = new EventService();
const cateringServiceService = new CateringServiceService();
const equipmentService = new EquipmentService();
const eventCateringServiceService = new EventCateringServiceService();
const eventEquipmentRentalService = new EventEquipmentRentalService();

// Event Controllers
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createEventSchema.parse(req.body);
  const event = await eventService.createEvent(validatedData);
  
  res.status(201).json({
    success: true,
    data: event,
    message: 'Event created successfully'
  });
});

export const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = idParamSchema.parse(req.params);
  const event = await eventService.getEventById(id);
  
  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }
  
  res.json({
    success: true,
    data: event,
    message: 'Event retrieved successfully'
  });
});

export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const validatedParams = eventQuerySchema.parse(req.query);
  const result = await eventService.getEvents(validatedParams);
  
  res.json({
    success: true,
    data: result.events,
    pagination: result.pagination,
    message: 'Events retrieved successfully'
  });
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = idParamSchema.parse(req.params);
  const validatedData = updateEventSchema.parse(req.body);
  
  const event = await eventService.updateEvent(id, validatedData);
  
  res.json({
    success: true,
    data: event,
    message: 'Event updated successfully'
  });
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = idParamSchema.parse(req.params);
  await eventService.deleteEvent(id);
  
  res.json({
    success: true,
    message: 'Event deleted successfully'
  });
});

export const getEventStats = asyncHandler(async (req: Request, res: Response) => {
  const validatedParams = eventStatsQuerySchema.parse(req.query);
  const stats = await eventService.getEventStats(validatedParams);
  
  res.json({
    success: true,
    data: stats,
    message: 'Event statistics retrieved successfully'
  });
});

// Catering Service Controllers
export const createCateringService = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createCateringServiceSchema.parse(req.body);
  const service = await cateringServiceService.createCateringService(validatedData);
  
  res.status(201).json({
    success: true,
    data: service,
    message: 'Catering service created successfully'
  });
});

export const getCateringServiceById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = cateringServiceIdParamSchema.parse(req.params);
  const service = await cateringServiceService.getCateringServiceById(id);
  
  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Catering service not found'
    });
  }
  
  res.json({
    success: true,
    data: service,
    message: 'Catering service retrieved successfully'
  });
});

export const getCateringServices = asyncHandler(async (req: Request, res: Response) => {
  const validatedParams = cateringServiceQuerySchema.parse(req.query);
  const result = await cateringServiceService.getCateringServices(validatedParams);
  
  res.json({
    success: true,
    data: result.services,
    pagination: result.pagination,
    message: 'Catering services retrieved successfully'
  });
});

export const updateCateringService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = cateringServiceIdParamSchema.parse(req.params);
  const validatedData = updateCateringServiceSchema.parse(req.body);
  
  const service = await cateringServiceService.updateCateringService(id, validatedData);
  
  res.json({
    success: true,
    data: service,
    message: 'Catering service updated successfully'
  });
});

export const deleteCateringService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = cateringServiceIdParamSchema.parse(req.params);
  await cateringServiceService.deleteCateringService(id);
  
  res.json({
    success: true,
    message: 'Catering service deleted successfully'
  });
});

// Equipment Controllers
export const createEquipment = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createEquipmentSchema.parse(req.body);
  const equipment = await equipmentService.createEquipment(validatedData);
  
  res.status(201).json({
    success: true,
    data: equipment,
    message: 'Equipment created successfully'
  });
});

export const getEquipmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = equipmentIdParamSchema.parse(req.params);
  const equipment = await equipmentService.getEquipmentById(id);
  
  if (!equipment) {
    return res.status(404).json({
      success: false,
      message: 'Equipment not found'
    });
  }
  
  res.json({
    success: true,
    data: equipment,
    message: 'Equipment retrieved successfully'
  });
});

export const getEquipment = asyncHandler(async (req: Request, res: Response) => {
  const validatedParams = equipmentQuerySchema.parse(req.query);
  const result = await equipmentService.getEquipment(validatedParams);
  
  res.json({
    success: true,
    data: result.equipment,
    pagination: result.pagination,
    message: 'Equipment retrieved successfully'
  });
});

export const updateEquipment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = equipmentIdParamSchema.parse(req.params);
  const validatedData = updateEquipmentSchema.parse(req.body);
  
  const equipment = await equipmentService.updateEquipment(id, validatedData);
  
  res.json({
    success: true,
    data: equipment,
    message: 'Equipment updated successfully'
  });
});

export const deleteEquipment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = equipmentIdParamSchema.parse(req.params);
  await equipmentService.deleteEquipment(id);
  
  res.json({
    success: true,
    message: 'Equipment deleted successfully'
  });
});

// Event Catering Service Controllers
export const addCateringServiceToEvent = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createEventCateringServiceSchema.parse(req.body);
  const eventCateringService = await eventCateringServiceService.addCateringServiceToEvent(validatedData);
  
  res.status(201).json({
    success: true,
    data: eventCateringService,
    message: 'Catering service added to event successfully'
  });
});

export const updateEventCateringService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = eventCateringServiceIdParamSchema.parse(req.params);
  const validatedData = updateEventCateringServiceSchema.parse(req.body);
  
  const eventCateringService = await eventCateringServiceService.updateEventCateringService(id, validatedData);
  
  res.json({
    success: true,
    data: eventCateringService,
    message: 'Event catering service updated successfully'
  });
});

export const removeCateringServiceFromEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = eventCateringServiceIdParamSchema.parse(req.params);
  await eventCateringServiceService.removeCateringServiceFromEvent(id);
  
  res.json({
    success: true,
    message: 'Catering service removed from event successfully'
  });
});

// Event Equipment Rental Controllers
export const addEquipmentRentalToEvent = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createEventEquipmentRentalSchema.parse(req.body);
  const eventEquipmentRental = await eventEquipmentRentalService.addEquipmentRentalToEvent(validatedData);
  
  res.status(201).json({
    success: true,
    data: eventEquipmentRental,
    message: 'Equipment rental added to event successfully'
  });
});

export const updateEventEquipmentRental = asyncHandler(async (req: Request, res: Response) => {
  const { id } = eventEquipmentRentalIdParamSchema.parse(req.params);
  const validatedData = updateEventEquipmentRentalSchema.parse(req.body);
  
  const eventEquipmentRental = await eventEquipmentRentalService.updateEventEquipmentRental(id, validatedData);
  
  res.json({
    success: true,
    data: eventEquipmentRental,
    message: 'Event equipment rental updated successfully'
  });
});

export const removeEquipmentRentalFromEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = eventEquipmentRentalIdParamSchema.parse(req.params);
  await eventEquipmentRentalService.removeEquipmentRentalFromEvent(id);
  
  res.json({
    success: true,
    message: 'Equipment rental removed from event successfully'
  });
});


