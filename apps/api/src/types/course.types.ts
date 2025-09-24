export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  schedule: string;
  level: string;
  tags: string[];
  image?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  whatYoullLearn: string[];
  prerequisites: string[];
  curriculum: CurriculumModule[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CurriculumModule {
  id: string;
  title: string;
  duration: string;
  description?: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration?: string;
  type?: 'video' | 'reading' | 'assignment' | 'quiz';
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  schedule: string;
  level: string;
  tags: string[];
  image?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  whatYoullLearn: string[];
  prerequisites: string[];
  curriculum: Omit<CurriculumModule, 'id'>[];
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  instructor?: string;
  duration?: string;
  schedule?: string;
  level?: string;
  tags?: string[];
  image?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  whatYoullLearn?: string[];
  prerequisites?: string[];
  curriculum?: Omit<CurriculumModule, 'id'>[];
  isActive?: boolean;
}

export interface CourseResponse {
  success: boolean;
  data?: Course;
  message?: string;
}

export interface CoursesResponse {
  success: boolean;
  data?: Course[];
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

