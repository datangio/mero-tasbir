/**
 * File Upload Controller
 * Demonstrates various Multer upload configurations and handling
 */

import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import path from 'path';

// Single file upload handler
export const uploadSingleFile = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  
  if (!file) {
    res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
    return;
  }

  res.json({
    success: true,
    message: 'File uploaded successfully',
    data: {
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.destination.split('/').pop()}/${file.filename}`,
      path: file.path
    }
  });
});

// Multiple files upload handler
export const uploadMultipleFiles = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  
  if (!files || files.length === 0) {
    res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
    return;
  }

  const uploadedFiles = files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: `/uploads/${file.destination.split('/').pop()}/${file.filename}`,
    path: file.path
  }));

  res.json({
    success: true,
    message: `${files.length} files uploaded successfully`,
    data: uploadedFiles
  });
});

// Mixed files upload handler (different field names)
export const uploadMixedFiles = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  
  if (!files || Object.keys(files).length === 0) {
    res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
  }

  const result: any = {};
  
  for (const [fieldName, fileArray] of Object.entries(files)) {
    result[fieldName] = fileArray.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.destination.split('/').pop()}/${file.filename}`,
      path: file.path
    }));
  }

  res.json({
    success: true,
    message: 'Files uploaded successfully',
    data: result
  });
});

// Profile image upload handler
export const uploadProfileImage = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  
  if (!file) {
    res.status(400).json({
      success: false,
      message: 'No profile image uploaded'
    });
  }

  res.json({
    success: true,
    message: 'Profile image uploaded successfully',
    data: {
      filename: file!.filename,
      originalName: file!.originalname,
      mimetype: file!.mimetype,
      size: file!.size,
      url: `/uploads/profiles/${file!.filename}`,
      path: file!.path
    }
  });
});

// Course images upload handler
export const uploadCourseImages = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  
  if (!files || files.length === 0) {
    res.status(400).json({
      success: false,
      message: 'No course images uploaded'
    });
  }

  const uploadedImages = files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: `/uploads/courses/${file.filename}`,
    path: file.path
  }));

  res.json({
    success: true,
    message: `${files.length} course images uploaded successfully`,
    data: uploadedImages
  });
});

// Marketplace images upload handler
export const uploadMarketplaceImages = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  
  if (!files || files.length === 0) {
    res.status(400).json({
      success: false,
      message: 'No marketplace images uploaded'
    });
  }

  const uploadedImages = files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: `/uploads/marketplace/${file.filename}`,
    path: file.path
  }));

  res.json({
    success: true,
    message: `${files.length} marketplace images uploaded successfully`,
    data: uploadedImages
  });
});

// Event images upload handler
export const uploadEventImages = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  
  if (!files || files.length === 0) {
    res.status(400).json({
      success: false,
      message: 'No event images uploaded'
    });
  }

  const uploadedImages = files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: `/uploads/events/${file.filename}`,
    path: file.path
  }));

  res.json({
    success: true,
    message: `${files.length} event images uploaded successfully`,
    data: uploadedImages
  });
});

// Hero image upload handler
export const uploadHeroImage = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  
  if (!file) {
    res.status(400).json({
      success: false,
      message: 'No hero image uploaded'
    });
  }

  res.json({
    success: true,
    message: 'Hero image uploaded successfully',
    data: {
      filename: file!.filename,
      originalName: file!.originalname,
      mimetype: file!.mimetype,
      size: file!.size,
      url: `/uploads/hero/${file!.filename}`,
      path: file!.path
    }
  });
});

// Delete uploaded file handler
export const deleteUploadedFile = asyncHandler(async (req: Request, res: Response) => {
  const { filename, category } = req.params;
  
  if (!filename || !category) {
    res.status(400).json({
      success: false,
      message: 'Filename and category are required'
    });
  }

  const fs = require('fs');
  const filePath = path.join(__dirname, `../../uploads/${category}/${filename}`);
  
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting file'
    });
  }
});

// Get upload statistics
export const getUploadStats = asyncHandler(async (req: Request, res: Response) => {
  const fs = require('fs');
  const uploadsDir = path.join(__dirname, '../../uploads');
  
  try {
    const categories = fs.readdirSync(uploadsDir);
    const stats: any = {};
    
    for (const category of categories) {
      const categoryPath = path.join(uploadsDir, category);
      if (fs.statSync(categoryPath).isDirectory()) {
        const files = fs.readdirSync(categoryPath);
        stats[category] = {
          fileCount: files.length,
          files: files.map((file: string) => ({
            filename: file,
            url: `/uploads/${category}/${file}`
          }))
        };
      }
    }
    
    res.json({
      success: true,
      message: 'Upload statistics retrieved successfully',
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving upload statistics'
    });
  }
});
