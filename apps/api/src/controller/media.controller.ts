import { Request, Response } from "express";
import { MediaService } from "../services/media.service";
import asyncHandler from "../utils/asyncHandler";
import { createMediaSchema, updateMediaSchema, mediaQuerySchema, mediaUploadSchema } from "../schemas/media.schemas";
import { MediaCategory } from "../types/media.types";
import { generateFileUrl, generateThumbnailUrl } from "../utils/fileUpload";

const mediaService = new MediaService();

export const createMedia = asyncHandler(async (req: Request, res: Response) => {
  try {
    const validatedData = createMediaSchema.parse(req.body);
    const media = await mediaService.createMedia(validatedData);
    
    res.status(201).json({
      success: true,
      message: "Media created successfully",
      data: media,
    });
  } catch (error: any) {
    console.error('Create media error:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    } else if (error.message && error.message.includes('Client name is required')) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

export const getMediaById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const media = await mediaService.getMediaById(id);
    
    res.json({
      success: true,
      message: "Media retrieved successfully",
      data: media,
    });
  } catch (error: any) {
    console.error('Get media error:', error);
    if (error.message === 'Media not found') {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

export const getAllMedia = asyncHandler(async (req: Request, res: Response) => {
  try {
    const validatedParams = mediaQuerySchema.parse(req.query);
    const result = await mediaService.getAllMedia(validatedParams);
    
    res.json({
      success: true,
      message: "Media retrieved successfully",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error: any) {
    console.error('Get all media error:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

export const updateMedia = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateMediaSchema.parse(req.body);
    const media = await mediaService.updateMedia(id, validatedData);
    
    res.json({
      success: true,
      message: "Media updated successfully",
      data: media,
    });
  } catch (error: any) {
    console.error('Update media error:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    } else if (error.message === 'Media not found') {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else if (error.message && error.message.includes('Client name is required')) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const deletedMedia = await mediaService.deleteMedia(id, userId);

    if (!deletedMedia) {
      res.status(404).json({
        success: false,
        message: "Media not found or you don't have permission to delete it",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Media deleted successfully",
      data: deletedMedia,
    });
  } catch (error: any) {
    console.error('Delete media error:', error);
    if (error.message === 'Media not found') {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

export const getMediaStats = asyncHandler(async (req: Request, res: Response) => {
  try {
    const stats = await mediaService.getMediaStats();
    
    res.json({
      success: true,
      message: "Media stats retrieved successfully",
      data: stats,
    });
  } catch (error: any) {
    console.error('Get media stats error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const getMediaByCategory = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    
    if (!Object.values(MediaCategory).includes(category as MediaCategory)) {
      res.status(400).json({
        success: false,
        message: "Invalid media category",
      });
      return;
    }
    
    const media = await mediaService.getMediaByCategory(category as MediaCategory);
    
    res.json({
      success: true,
      message: "Media retrieved successfully",
      data: media,
    });
  } catch (error: any) {
    console.error('Get media by category error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const getClientPortfolio = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { clientName } = req.params;
    const media = await mediaService.getClientPortfolio(clientName);
    
    res.json({
      success: true,
      message: "Client portfolio retrieved successfully",
      data: media,
    });
  } catch (error: any) {
    console.error('Get client portfolio error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
      return;
    }

    const uploadedMedia = [];
    
    // Parse metadata array if provided
    let metadataArray = [];
    if (req.body.metadata) {
      try {
        metadataArray = JSON.parse(req.body.metadata);
      } catch (error) {
        console.error('Error parsing metadata:', error);
      }
    }
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      let mediaData;
      
      if (metadataArray.length > i && metadataArray[i]) {
        // New format: metadata array
        const metadata = metadataArray[i];
        mediaData = {
          title: metadata.title || file.originalname.split('.')[0] || 'Untitled',
          url: generateFileUrl(file.filename),
          thumbnailUrl: generateThumbnailUrl(file.filename),
          type: 'image',
          category: metadata.category || 'Other',
          clientName: req.body.clientName || 'user',
          description: metadata.description || '',
          tags: metadata.tags || [],
          price: parseFloat(metadata.price) || 0,
          uploadedBy: (req as any).user?.id,
        };
      } else {
        // Old format: single metadata (for backward compatibility)
        mediaData = {
          title: req.body.title || file.originalname.split('.')[0] || 'Untitled',
          url: generateFileUrl(file.filename),
          thumbnailUrl: generateThumbnailUrl(file.filename),
          type: 'image',
          category: req.body.category || 'Other',
          clientName: req.body.clientName || 'user',
          description: req.body.description || '',
          tags: req.body.tags ? JSON.parse(req.body.tags) : [],
          price: parseFloat(req.body.price) || 0,
          uploadedBy: (req as any).user?.id,
        };
      }

      console.log(`Processing file ${i}:`, {
        filename: file.filename,
        title: mediaData.title,
        category: mediaData.category,
        price: mediaData.price
      });

      const media = await mediaService.createMedia(mediaData);
      uploadedMedia.push(media);
    }
    
    res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      data: uploadedMedia,
    });
  } catch (error: any) {
    console.error('Upload media error:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    } else if (error.message && error.message.includes('Client name is required')) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

export const getUserMedia = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const userMedia = await mediaService.getMediaByUser(userId);

    res.status(200).json({
      success: true,
      message: "User media retrieved successfully",
      data: userMedia,
    });
  } catch (error: any) {
    console.error('Get user media error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
