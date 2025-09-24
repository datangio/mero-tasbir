import { z } from 'zod';

export const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  instructor: z.string().min(1, 'Instructor is required'),
  duration: z.string().min(1, 'Duration is required'),
  schedule: z.string().min(1, 'Schedule is required'),
  level: z.string().min(1, 'Level is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  image: z.string().optional(),
  price: z.number().min(0, 'Price must be non-negative'),
  originalPrice: z.number().optional(),
  discount: z.number().optional(),
  whatYoullLearn: z.array(z.string()).min(1, 'At least one learning objective is required'),
  prerequisites: z.array(z.string()).min(1, 'At least one prerequisite is required'),
  curriculum: z.array(z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Module title is required'),
    duration: z.string().min(1, 'Module duration is required'),
    description: z.string().optional(),
    lessons: z.array(z.object({
      id: z.string().optional(),
      title: z.string().min(1, 'Lesson title is required'),
      duration: z.string().optional(),
      type: z.enum(['video', 'reading', 'assignment', 'quiz']).optional(),
    })).optional(),
  })).min(1, 'At least one curriculum module is required'),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createCourseSchema = courseSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateCourseSchema = courseSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });

export type Course = z.infer<typeof courseSchema>;
export type CreateCourse = z.infer<typeof createCourseSchema>;
export type UpdateCourse = z.infer<typeof updateCourseSchema>;

