import { Router } from "express";
import { EventController } from "../controller/event.controller";

const router = Router();
const eventController = new EventController();

// Basic event routes
router.get("/", (req, res) => eventController.getAllEvents(req, res));
router.get("/:id", (req, res) => eventController.getEventById(req, res));
router.post("/", (req, res) => eventController.createEvent(req, res));
router.put("/:id", (req, res) => eventController.updateEvent(req, res));
router.delete("/:id", (req, res) => eventController.deleteEvent(req, res));

export default router;