import { Router } from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  toggleCourseStatus,
  getCoursesByLevel,
  getCoursesByInstructor,
  searchCourses,
} from '../controller/course.controller';
import { validateZod } from '../middleware/zodValidation';
import { createCourseSchema, updateCourseSchema } from '../schemas/course.schemas';
import { uploadCourseImages, handleMulterError } from '../middleware';

const router = Router();

// Public routes
router.get('/', getAllCourses);
router.get('/search', searchCourses);
router.get('/level/:level', getCoursesByLevel);
router.get('/instructor/:instructor', getCoursesByInstructor);
router.get('/:id', getCourseById);

// Admin routes (you can add authentication middleware here)
router.post('/', validateZod({ body: createCourseSchema }), createCourse);
router.post('/upload-images', uploadCourseImages, handleMulterError, (req: any, res: any) => {
  // Example upload handler
  const files = req.files as Express.Multer.File[];
  res.json({
    success: true,
    message: 'Images uploaded successfully',
    data: files?.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `/uploads/courses/${file.filename}`
    }))
  });
});
router.put('/:id', validateZod({ body: updateCourseSchema }), updateCourse);
router.delete('/:id', deleteCourse);
router.patch('/:id/toggle-status', toggleCourseStatus);

export default router;

