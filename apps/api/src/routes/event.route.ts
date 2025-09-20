/**
 * Event Management Routes
 * Defines all API endpoints for event management system
 */

import { Router } from 'express';
import {
  // Event controllers
  createEvent,
  getEventById,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventStats,
  
  // Catering service controllers
  createCateringService,
  getCateringServiceById,
  getCateringServices,
  updateCateringService,
  deleteCateringService,
  
  // Equipment controllers
  createEquipment,
  getEquipmentById,
  getEquipment,
  updateEquipment,
  deleteEquipment,
  
  // Event catering service controllers
  addCateringServiceToEvent,
  updateEventCateringService,
  removeCateringServiceFromEvent,
  
  // Event equipment rental controllers
  addEquipmentRentalToEvent,
  updateEventEquipmentRental,
  removeEquipmentRentalFromEvent
} from '../controller/event.controller';

const router = Router();

// Event Routes
router.post('/events', createEvent);
router.get('/events', getEvents);
router.get('/events/stats', getEventStats);
router.get('/events/:id', getEventById);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Catering Service Routes
router.post('/catering-services', createCateringService);
router.get('/catering-services', getCateringServices);
router.get('/catering-services/:id', getCateringServiceById);
router.put('/catering-services/:id', updateCateringService);
router.delete('/catering-services/:id', deleteCateringService);

// Equipment Routes
router.post('/equipment', createEquipment);
router.get('/equipment', getEquipment);
router.get('/equipment/:id', getEquipmentById);
router.put('/equipment/:id', updateEquipment);
router.delete('/equipment/:id', deleteEquipment);

// Event Catering Service Routes
router.post('/events/:eventId/catering-services', addCateringServiceToEvent);
router.put('/event-catering-services/:id', updateEventCateringService);
router.delete('/event-catering-services/:id', removeCateringServiceFromEvent);

// Event Equipment Rental Routes
router.post('/events/:eventId/equipment-rentals', addEquipmentRentalToEvent);
router.put('/event-equipment-rentals/:id', updateEventEquipmentRental);
router.delete('/event-equipment-rentals/:id', removeEquipmentRentalFromEvent);

export default router;





