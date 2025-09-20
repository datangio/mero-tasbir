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
import { upload } from "../utils/fileUpload";

const router = Router();

// Media CRUD routes
router.post("/", createMedia);
router.post("/upload", upload.array('files', 10), uploadMedia);
router.get("/", getAllMedia);
router.get("/stats", getMediaStats);
router.get("/category/:category", getMediaByCategory);
router.get("/client/:clientName", getClientPortfolio);
router.get("/:id", getMediaById);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

export { router as mediaRoutes };
