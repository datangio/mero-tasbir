import { PrismaClient } from '../generated/prisma';
import { Course, CreateCourseRequest, UpdateCourseRequest, CoursesResponse } from '../types/course.types';

const prisma = new PrismaClient();

export class CourseService {
  async createCourse(data: CreateCourseRequest): Promise<Course> {
    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        instructor: data.instructor,
        duration: data.duration,
        schedule: data.schedule,
        level: data.level,
        tags: data.tags,
        image: data.image,
        price: data.price,
        originalPrice: data.originalPrice,
        discount: data.discount,
        whatYoullLearn: data.whatYoullLearn,
        prerequisites: data.prerequisites,
        curriculum: data.curriculum as any,
        isActive: true,
      },
    });

    return {
      ...course,
      curriculum: course.curriculum as any
    } as Course;
  }

  async getAllCourses(page: number = 1, limit: number = 10, isActive?: boolean): Promise<CoursesResponse> {
    const skip = (page - 1) * limit;
    
    const where = isActive !== undefined ? { isActive } : {};
    
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where }),
    ]);

    return {
      success: true,
      data: courses.map(course => ({
        ...course,
        curriculum: course.curriculum as any
      })) as Course[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCourseById(id: string): Promise<Course | null> {
    const course = await prisma.course.findUnique({
      where: { id },
    });

    return course as Course | null;
  }

  async updateCourse(id: string, data: UpdateCourseRequest): Promise<Course | null> {
    const course = await prisma.course.update({
      where: { id },
      data: {
        ...data,
        curriculum: data.curriculum ? data.curriculum as any : undefined,
      },
    });

    return {
      ...course,
      curriculum: course.curriculum as any
    } as Course;
  }

  async deleteCourse(id: string): Promise<boolean> {
    try {
      await prisma.course.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async toggleCourseStatus(id: string): Promise<Course | null> {
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) return null;

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { isActive: !course.isActive },
    });

    return {
      ...updatedCourse,
      curriculum: updatedCourse.curriculum as any
    } as Course;
  }

  async getCoursesByLevel(level: string): Promise<Course[]> {
    const courses = await prisma.course.findMany({
      where: { 
        level: {
          contains: level,
          mode: 'insensitive',
        },
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return courses.map(course => ({
      ...course,
      curriculum: course.curriculum as any
    })) as Course[];
  }

  async getCoursesByInstructor(instructor: string): Promise<Course[]> {
    const courses = await prisma.course.findMany({
      where: { 
        instructor: {
          contains: instructor,
          mode: 'insensitive',
        },
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return courses.map(course => ({
      ...course,
      curriculum: course.curriculum as any
    })) as Course[];
  }

  async searchCourses(query: string): Promise<Course[]> {
    const courses = await prisma.course.findMany({
      where: {
        isActive: true,
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            instructor: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              hasSome: [query],
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    return courses.map(course => ({
      ...course,
      curriculum: course.curriculum as any
    })) as Course[];
  }
}

