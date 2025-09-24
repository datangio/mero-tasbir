import { Router } from "express";
import {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  getActiveHeroSection,
  updateHeroSection,
  deleteHeroSection,
  setActiveHeroSection,
} from "../controller/hero.controller";

const router = Router();

/**
 * @route   POST /api/hero
 * @desc    Create a new hero section
 * @access  Private (Admin)
 */
router.post("/", createHeroSection);

/**
 * @route   GET /api/hero
 * @desc    Get all hero sections
 * @access  Public
 */
router.get("/", getAllHeroSections);

/**
 * @route   GET /api/hero/active
 * @desc    Get the active hero section
 * @access  Public
 */
router.get("/active", getActiveHeroSection);

/**
 * @route   GET /api/hero/:id
 * @desc    Get a single hero section by ID
 * @access  Public
 */
router.get("/:id", getHeroSectionById);

/**
 * @route   PUT /api/hero/:id
 * @desc    Update a hero section
 * @access  Private (Admin)
 */
router.put("/:id", updateHeroSection);

/**
 * @route   PATCH /api/hero/:id/activate
 * @desc    Set a hero section as active
 * @access  Private (Admin)
 */
router.patch("/:id/activate", setActiveHeroSection);

/**
 * @route   DELETE /api/hero/:id
 * @desc    Delete a hero section
 * @access  Private (Admin)
 */
router.delete("/:id", deleteHeroSection);

export default router;

