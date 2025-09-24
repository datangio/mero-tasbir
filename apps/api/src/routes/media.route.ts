import { Router } from "express";
import {
  createMedia,
  getMediaById,
  getAllMedia,
  updateMedia,
  deleteMedia,
  getMediaStats,
  getMediaByCategory,
  getClientPortfolio,
  uploadMedia,
} from "../controller/media.controller";
import { uploadMultiple, handleMulterError } from "../middleware";

const router = Router();

// Media CRUD routes
router.post("/", createMedia);
router.post("/upload", uploadMultiple('files', 10), handleMulterError, uploadMedia);
router.get("/", getAllMedia);
router.get("/stats", getMediaStats);
router.get("/category/:category", getMediaByCategory);
router.get("/client/:clientName", getClientPortfolio);
router.get("/:id", getMediaById);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

export { router as mediaRoutes };
