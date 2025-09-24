/**
 * Multer configuration for file uploads
 * Handles image and file uploads with proper validation and storage
 */

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create subdirectories based on file type
    let subDir = 'general';
    
    if (file.fieldname === 'profileImage') {
      subDir = 'profiles';
    } else if (file.fieldname === 'courseImage' || file.fieldname === 'courseThumbnail') {
      subDir = 'courses';
    } else if (file.fieldname === 'marketplaceImage') {
      subDir = 'marketplace';
    } else if (file.fieldname === 'eventImage') {
      subDir = 'events';
    } else if (file.fieldname === 'heroImage') {
      subDir = 'hero';
    }
    
    const fullPath = path.join(uploadsDir, subDir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, `${sanitizedName}-${uniqueSuffix}${ext}`);
  }
});

// File filter for validation
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allowed file types
  const allowedMimes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];
  
  // Check file type
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Only ${allowedMimes.join(', ')} are allowed.`));
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files per request
  }
});

// Predefined upload configurations for different use cases
export const uploadSingle = (fieldName: string) => upload.single(fieldName);
export const uploadMultiple = (fieldName: string, maxCount: number = 10) => upload.array(fieldName, maxCount);
export const uploadFields = (fields: multer.Field[]) => upload.fields(fields);

// Specific upload configurations
export const uploadProfileImage = uploadSingle('profileImage');
export const uploadCourseImages = uploadMultiple('courseImages', 5);
export const uploadMarketplaceImages = uploadMultiple('marketplaceImages', 10);
export const uploadEventImages = uploadMultiple('eventImages', 10);
export const uploadHeroImage = uploadSingle('heroImage');

// Mixed upload for forms with multiple file types
export const uploadMixedFiles = uploadFields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'courseImages', maxCount: 5 },
  { name: 'marketplaceImages', maxCount: 10 },
  { name: 'eventImages', maxCount: 10 },
  { name: 'heroImage', maxCount: 1 }
]);

// Error handling middleware for multer
export const handleMulterError = (err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.',
        error: err.message
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 10 files allowed.',
        error: err.message
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name for file upload.',
        error: err.message
      });
    }
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: 'File type validation failed'
    });
  }
  
  next(err);
};

export default upload;
