import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import prisma from "../lib/prisma";
import {
  HeroSectionResponse,
  HeroSectionsResponse,
  HeroSectionDeleteResponse,
  CreateHeroSectionData,
  UpdateHeroSectionData,
} from "../types";

/**
 * Create a new hero section
 */
const createHeroSection = asyncHandler(async (req: Request, res: Response) => {
  const data: CreateHeroSectionData = req.body;

  // Validate required fields
  if (!data.title || !data.subtitle || !data.description) {
    res.status(400).json({
      message: "Title, subtitle, and description are required",
    });
    return;
  }

  // Create the hero section
  const heroSection = await prisma.hero_sections.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      backgroundImage: data.backgroundImage,
      ctaText: data.ctaText || "Get Started",
      rotatingTexts: data.rotatingTexts || ["Wedding", "Event", "Anniversary", "Pasni"],
    },
  });

  const response: HeroSectionResponse = {
    message: "Hero section created successfully",
    heroSection: {
      ...heroSection,
      backgroundImage: heroSection.backgroundImage || undefined,
      rotatingTexts: Array.isArray(heroSection.rotatingTexts) ? heroSection.rotatingTexts as string[] : [],
    },
  };

  res.status(201).json(response);
});

/**
 * Get all hero sections
 */
const getAllHeroSections = asyncHandler(async (req: Request, res: Response) => {
  const { active } = req.query;
  
  let whereClause = {};
  if (active === "true") {
    whereClause = { isActive: true };
  }

  const heroSections = await prisma.hero_sections.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  const response: HeroSectionsResponse = {
    message: "Hero sections retrieved successfully",
    heroSections: heroSections.map(section => ({
      ...section,
      backgroundImage: section.backgroundImage || undefined,
      rotatingTexts: Array.isArray(section.rotatingTexts) ? section.rotatingTexts as string[] : [],
    })),
    count: heroSections.length,
  };

  res.json(response);
});

/**
 * Get a single hero section by ID
 */
const getHeroSectionById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const heroSection = await prisma.hero_sections.findUnique({
    where: { id },
  });

  if (!heroSection) {
    res.status(404).json({
      message: "Hero section not found",
    });
    return;
  }

  const response: HeroSectionResponse = {
    message: "Hero section retrieved successfully",
    heroSection: {
      ...heroSection,
      backgroundImage: heroSection.backgroundImage || undefined,
      rotatingTexts: Array.isArray(heroSection.rotatingTexts) ? heroSection.rotatingTexts as string[] : [],
    },
  };

  res.json(response);
});

/**
 * Get the active hero section
 */
const getActiveHeroSection = asyncHandler(async (req: Request, res: Response) => {
  const heroSection = await prisma.hero_sections.findFirst({
    where: { isActive: true },
    orderBy: { updatedAt: "desc" },
  });

  if (!heroSection) {
    res.status(404).json({
      message: "No active hero section found",
    });
    return;
  }

  const response: HeroSectionResponse = {
    message: "Active hero section retrieved successfully",
    heroSection: {
      ...heroSection,
      backgroundImage: heroSection.backgroundImage || undefined,
      rotatingTexts: Array.isArray(heroSection.rotatingTexts) ? heroSection.rotatingTexts as string[] : [],
    },
  };

  res.json(response);
});

/**
 * Update a hero section
 */
const updateHeroSection = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateHeroSectionData = req.body;

  // Check if hero section exists
  const existingHeroSection = await prisma.hero_sections.findUnique({
    where: { id },
  });

  if (!existingHeroSection) {
    res.status(404).json({
      message: "Hero section not found",
    });
    return;
  }

  // Prepare update data
  const updateData: any = {};
  
  if (data.title !== undefined) updateData.title = data.title;
  if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.backgroundImage !== undefined) updateData.backgroundImage = data.backgroundImage;
  if (data.ctaText !== undefined) updateData.ctaText = data.ctaText;
  if (data.rotatingTexts !== undefined) updateData.rotatingTexts = data.rotatingTexts;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;

  // Update the hero section
  const updatedHeroSection = await prisma.hero_sections.update({
    where: { id },
    data: updateData,
  });

  const response: HeroSectionResponse = {
    message: "Hero section updated successfully",
    heroSection: {
      ...updatedHeroSection,
      backgroundImage: updatedHeroSection.backgroundImage || undefined,
      rotatingTexts: Array.isArray(updatedHeroSection.rotatingTexts) ? updatedHeroSection.rotatingTexts as string[] : [],
    },
  };

  res.json(response);
});

/**
 * Delete a hero section
 */
const deleteHeroSection = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if hero section exists
  const existingHeroSection = await prisma.hero_sections.findUnique({
    where: { id },
  });

  if (!existingHeroSection) {
    res.status(404).json({
      message: "Hero section not found",
    });
    return;
  }

  // Delete the hero section
  await prisma.hero_sections.delete({
    where: { id },
  });

  const response: HeroSectionDeleteResponse = {
    message: "Hero section deleted successfully",
    heroSectionId: id,
  };

  res.json(response);
});

/**
 * Set a hero section as active (deactivates others)
 */
const setActiveHeroSection = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if hero section exists
  const existingHeroSection = await prisma.hero_sections.findUnique({
    where: { id },
  });

  if (!existingHeroSection) {
    res.status(404).json({
      message: "Hero section not found",
    });
    return;
  }

  // Deactivate all hero sections first
  await prisma.hero_sections.updateMany({
    where: { isActive: true },
    data: { isActive: false },
  });

  // Activate the selected hero section
  const activeHeroSection = await prisma.hero_sections.update({
    where: { id },
    data: { isActive: true },
  });

  const response: HeroSectionResponse = {
    message: "Hero section set as active successfully",
    heroSection: {
      ...activeHeroSection,
      backgroundImage: activeHeroSection.backgroundImage || undefined,
      rotatingTexts: Array.isArray(activeHeroSection.rotatingTexts) ? activeHeroSection.rotatingTexts as string[] : [],
    },
  };

  res.json(response);
});

export {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  getActiveHeroSection,
  updateHeroSection,
  deleteHeroSection,
  setActiveHeroSection,
};

