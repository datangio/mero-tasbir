/**
 * File Upload Routes
 * Demonstrates various Multer upload configurations
 */

import { Router } from 'express';
import {
  uploadSingleFile,
  uploadMultipleFiles,
  uploadMixedFiles,
  uploadProfileImage,
  uploadCourseImages,
  uploadMarketplaceImages,
  uploadEventImages,
  uploadHeroImage,
  deleteUploadedFile,
  getUploadStats,
} from '../controller/upload.controller';
import {
  uploadSingle,
  uploadMultiple,
  uploadFields,
  uploadProfileImage as uploadProfileImageMiddleware,
  uploadCourseImages as uploadCourseImagesMiddleware,
  uploadMarketplaceImages as uploadMarketplaceImagesMiddleware,
  uploadEventImages as uploadEventImagesMiddleware,
  uploadHeroImage as uploadHeroImageMiddleware,
  uploadMixedFiles as uploadMixedFilesMiddleware,
  handleMulterError,
} from '../middleware';

const router = Router();

// Basic upload routes
router.post('/single', uploadSingle('file'), handleMulterError, uploadSingleFile);
router.post('/multiple', uploadMultiple('files', 10), handleMulterError, uploadMultipleFiles);
router.post('/mixed', uploadMixedFilesMiddleware, handleMulterError, uploadMixedFiles);

// Specific category upload routes
router.post('/profile', uploadProfileImageMiddleware, handleMulterError, uploadProfileImage);
router.post('/course', uploadCourseImagesMiddleware, handleMulterError, uploadCourseImages);
router.post('/marketplace', uploadMarketplaceImagesMiddleware, handleMulterError, uploadMarketplaceImages);
router.post('/event', uploadEventImagesMiddleware, handleMulterError, uploadEventImages);
router.post('/hero', uploadHeroImageMiddleware, handleMulterError, uploadHeroImage);

// File management routes
router.delete('/:category/:filename', deleteUploadedFile);
router.get('/stats', getUploadStats);

export default router;
