import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';
import asyncHandler from '../utils/asyncHandler';
import { createCourseSchema, updateCourseSchema } from '../schemas/course.schemas';

const courseService = new CourseService();

export const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createCourseSchema.parse(req.body);
  
  const course = await courseService.createCourse({
    ...validatedData,
    curriculum: validatedData.curriculum as any,
  });
  
  res.status(201).json({
    success: true,
    data: course,
    message: 'Course created successfully',
  });
});

export const getAllCourses = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const isActive = req.query.isActive ? req.query.isActive === 'true' : undefined;
  
  const result = await courseService.getAllCourses(page, limit, isActive);
  
  res.status(200).json(result);
});

export const getCourseById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const course = await courseService.getCourseById(id);
  
  if (!course) {
    res.status(404).json({
      success: false,
      message: 'Course not found',
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: course,
  });
});

export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = updateCourseSchema.parse(req.body);
  
  const course = await courseService.updateCourse(id, {
    ...validatedData,
    curriculum: validatedData.curriculum as any,
  });
  
  if (!course) {
    res.status(404).json({
      success: false,
      message: 'Course not found',
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: course,
    message: 'Course updated successfully',
  });
});

export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const success = await courseService.deleteCourse(id);
  
  if (!success) {
    res.status(404).json({
      success: false,
      message: 'Course not found or could not be deleted',
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Course deleted successfully',
  });
});

export const toggleCourseStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const course = await courseService.toggleCourseStatus(id);
  
  if (!course) {
    res.status(404).json({
      success: false,
      message: 'Course not found',
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: course,
    message: `Course ${course.isActive ? 'activated' : 'deactivated'} successfully`,
  });
});

export const getCoursesByLevel = asyncHandler(async (req: Request, res: Response) => {
  const { level } = req.params;
  
  const courses = await courseService.getCoursesByLevel(level);
  
  res.status(200).json({
    success: true,
    data: courses,
  });
});

export const getCoursesByInstructor = asyncHandler(async (req: Request, res: Response) => {
  const { instructor } = req.params;
  
  const courses = await courseService.getCoursesByInstructor(instructor);
  
  res.status(200).json({
    success: true,
    data: courses,
  });
});

export const searchCourses = asyncHandler(async (req: Request, res: Response) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Search query is required',
    });
    return;
  }
  
  const courses = await courseService.searchCourses(q);
  
  res.status(200).json({
    success: true,
    data: courses,
  });
});

