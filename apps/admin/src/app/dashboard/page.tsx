"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AdminLayout, BookingManagement, EventHeroForm, FeaturedEventModal, EventPackageModal, EquipmentRental } from "@repo/ui";
import {
  LayoutDashboard,
  Truck,
  Package,
  MessageSquare,
  Clock,
  FileText,
  Headphones,
  User,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Calendar,
  Box,
  Zap,
  Camera,
  Video,
  Edit3,
  Upload,
  X,
  Save,
  Image,
  Users,
  Star,
  Edit,
  Trash2,
  Plus,
  CalendarDays,
  Sparkles,
  Crown,
  Wrench
} from "lucide-react";

// Course interface
interface Course {
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
  curriculum: Array<{
    title: string;
    duration: string;
    description?: string;
    lessons?: Array<{
      title: string;
      duration?: string;
      type?: 'video' | 'reading' | 'assignment' | 'quiz';
    }>;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Simple inline CourseManagement component
const CourseManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    schedule: '',
    level: 'beginner',
    tags: [] as string[],
    image: '',
    price: '',
    originalPrice: '',
    discount: '',
    whatYoullLearn: [] as string[],
    prerequisites: [] as string[],
    curriculum: [] as Array<{
      title: string;
      duration: string;
      description: string;
      lessons: Array<{
        title: string;
        duration: string;
        type: 'video' | 'reading' | 'assignment' | 'quiz';
      }>;
    }>,
    isActive: true
  });

  const [newTag, setNewTag] = useState('');
  const [newLearningObjective, setNewLearningObjective] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newModule, setNewModule] = useState({
    title: '',
    duration: '',
    description: '',
    lessons: [] as Array<{
      title: string;
      duration: string;
      type: 'video' | 'reading' | 'assignment' | 'quiz';
    }>
  });
  const [newLesson, setNewLesson] = useState({
    title: '',
    duration: '',
    type: 'video' as 'video' | 'reading' | 'assignment' | 'quiz'
  });

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/v1/courses');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.data) {
        setCourses(data.data);
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert(`Error fetching courses: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete course
  const deleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/v1/courses/${courseId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      alert('Course deleted successfully!');
      fetchCourses(); // Refresh the list
    } catch (error) {
      console.error('Error deleting course:', error);
      alert(`Error deleting course: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Toggle course status
  const toggleCourseStatus = async (courseId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/courses/${courseId}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      alert(`Course ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      fetchCourses(); // Refresh the list
    } catch (error) {
      console.error('Error toggling course status:', error);
      alert(`Error toggling course status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Edit course
  const editCourse = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      schedule: course.schedule,
      level: course.level,
      tags: course.tags,
      image: course.image || '',
      price: course.price.toString(),
      originalPrice: course.originalPrice?.toString() || '',
      discount: course.discount?.toString() || '',
      whatYoullLearn: course.whatYoullLearn,
      prerequisites: course.prerequisites,
      curriculum: course.curriculum.map(module => ({
        title: module.title,
        duration: module.duration,
        description: module.description || '',
        lessons: module.lessons?.map(lesson => ({
          title: lesson.title,
          duration: lesson.duration || '',
          type: lesson.type || 'video'
        })) || []
      })),
      isActive: course.isActive
    });
    setIsModalOpen(true);
  };

  // Load courses on component mount
  React.useEffect(() => {
    fetchCourses();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  // Reset to first page when courses change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [courses.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };


  const addLearningObjective = () => {
    if (newLearningObjective.trim()) {
      setFormData(prev => ({
        ...prev,
        whatYoullLearn: [...prev.whatYoullLearn, newLearningObjective.trim()]
      }));
      setNewLearningObjective('');
    }
  };

  const removeLearningObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      whatYoullLearn: prev.whatYoullLearn.filter((_, i) => i !== index)
    }));
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite.trim()]
      }));
      setNewPrerequisite('');
    }
  };

  const removePrerequisite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index)
    }));
  };

  const addLessonToModule = () => {
    if (newLesson.title.trim()) {
      setNewModule(prev => ({
        ...prev,
        lessons: [...prev.lessons, { ...newLesson }]
      }));
      setNewLesson({ title: '', duration: '', type: 'video' });
    }
  };

  const removeLessonFromModule = (index: number) => {
    setNewModule(prev => ({
      ...prev,
      lessons: prev.lessons.filter((_, i) => i !== index)
    }));
  };

  const addModule = () => {
    if (newModule.title.trim()) {
      setFormData(prev => ({
        ...prev,
        curriculum: [...prev.curriculum, { ...newModule }]
      }));
      setNewModule({ title: '', duration: '', description: '', lessons: [] });
    }
  };

  const removeModule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Convert string values to numbers where needed
      const submitData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        discount: formData.discount ? parseFloat(formData.discount) : undefined,
      };

      console.log('Submitting course data:', submitData);

      // Send data to API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const isEdit = editingCourse !== null;
      const requestUrl = isEdit ? `${apiUrl}/courses/${editingCourse.id}` : `${apiUrl}/courses`;
      const method = isEdit ? 'PUT' : 'POST';
      
      console.log('Making request to:', requestUrl, 'Method:', method);
      
      const response = await fetch(requestUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Expected JSON response but got: ${contentType}. Response: ${text.substring(0, 200)}...`);
      }

      let result;
      try {
        result = await response.json();
        console.log(`Course ${isEdit ? 'updated' : 'created'} successfully:`, result);
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        const text = await response.text();
        console.error('Response text that failed to parse:', text);
        throw new Error(`Failed to parse JSON response: ${jsonError instanceof Error ? jsonError.message : 'Unknown error'}. Response: ${text.substring(0, 200)}...`);
      }
      
      alert(`Course ${isEdit ? 'updated' : 'added'} successfully!`);
      setIsModalOpen(false);
      setEditingCourse(null);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        schedule: '',
        level: 'beginner',
        tags: [],
        image: '',
        price: '',
        originalPrice: '',
        discount: '',
        whatYoullLearn: [],
        prerequisites: [],
        curriculum: [],
        isActive: true
      });
      
      // Refresh courses list
      fetchCourses();
    } catch (error) {
      console.error(`Error ${editingCourse ? 'updating' : 'creating'} course:`, error);
      alert(`Error ${editingCourse ? 'updating' : 'creating'} course: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Management</h1>
          <p className="text-gray-600">Manage your courses and educational content.</p>
        </div>
        <button 
          onClick={() => {
            setEditingCourse(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Course
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Found</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first course.</p>
          <button 
            onClick={() => {
              setEditingCourse(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Course Image */}
              <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                {course.image ? (
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">🎓</div>
                )}
              </div>
              
              {/* Course Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {course.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">Instructor:</span>
                    <span className="ml-2">{course.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">Duration:</span>
                    <span className="ml-2">{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">Level:</span>
                    <span className="ml-2 capitalize">{course.level}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
                    )}
                  </div>
                  {course.discount && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {course.discount}% OFF
                    </span>
                  )}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{course.tags.length - 3} more
                    </span>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => editCourse(course)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleCourseStatus(course.id, course.isActive)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      course.isActive
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {course.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="bg-red-100 text-red-800 px-3 py-2 rounded-lg hover:bg-red-200 text-sm font-medium flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Previous
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Pagination Info */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, courses.length)} of {courses.length} courses
          </div>
        </>
      )}

      {/* Add Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCourse ? 'Edit Course' : 'Add New Course'}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCourse(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter course title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter course description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instructor *
                      </label>
                      <input
                        type="text"
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter instructor name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration *
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 4 weeks, 20 hours"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Schedule *
                      </label>
                      <input
                        type="text"
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Mon, Wed, Fri 6-8 PM"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Level *
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Pricing</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter course price"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Original Price
                      </label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter original price"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter discount percentage"
                      />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Tags *</h3>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* What You'll Learn */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">What You&apos;ll Learn *</h3>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLearningObjective}
                      onChange={(e) => setNewLearningObjective(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter a learning objective"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLearningObjective())}
                    />
                    <button
                      type="button"
                      onClick={addLearningObjective}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  
                  <ul className="space-y-2">
                    {formData.whatYoullLearn.map((objective, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        <span className="text-gray-700">{objective}</span>
                        <button
                          type="button"
                          onClick={() => removeLearningObjective(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Prerequisites *</h3>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPrerequisite}
                      onChange={(e) => setNewPrerequisite(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter a prerequisite"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                    />
                    <button
                      type="button"
                      onClick={addPrerequisite}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  
                  <ul className="space-y-2">
                    {formData.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                        <span className="text-gray-700">{prerequisite}</span>
                        <button
                          type="button"
                          onClick={() => removePrerequisite(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Curriculum */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Curriculum *</h3>
                  
                  {/* Add New Module */}
                  <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <h4 className="font-medium text-gray-900">Add New Module</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={newModule.title}
                        onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Module title"
                      />
                      <input
                        type="text"
                        value={newModule.duration}
                        onChange={(e) => setNewModule(prev => ({ ...prev, duration: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Module duration"
                      />
                    </div>
                    
                    <textarea
                      value={newModule.description}
                      onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Module description"
                      rows={2}
                    />
                    
                    {/* Add Lessons to Module */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-700">Add Lessons</h5>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newLesson.title}
                          onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Lesson title"
                        />
                        <input
                          type="text"
                          value={newLesson.duration}
                          onChange={(e) => setNewLesson(prev => ({ ...prev, duration: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Duration"
                        />
                        <select
                          value={newLesson.type}
                          onChange={(e) => setNewLesson(prev => ({ ...prev, type: e.target.value as 'video' | 'reading' | 'assignment' | 'quiz' }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="video">Video</option>
                          <option value="reading">Reading</option>
                          <option value="assignment">Assignment</option>
                          <option value="quiz">Quiz</option>
                        </select>
                        <button
                          type="button"
                          onClick={addLessonToModule}
                          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Add Lesson
                        </button>
                      </div>
                      
                      {/* Module Lessons */}
                      <div className="space-y-1">
                        {newModule.lessons.map((lesson, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                            <span className="text-gray-700">{lesson.title}</span>
                            <span className="text-gray-500">({lesson.duration})</span>
                            <span className="text-gray-500">- {lesson.type}</span>
                            <button
                              type="button"
                              onClick={() => removeLessonFromModule(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={addModule}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add Module
                    </button>
                  </div>
                  
                  {/* Existing Modules */}
                  <div className="space-y-3">
                    {formData.curriculum.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{module.title}</h4>
                            <p className="text-sm text-gray-600">{module.duration}</p>
                            <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeModule(moduleIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-2 space-y-1">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              <span>{lesson.title}</span>
                              <span>({lesson.duration})</span>
                              <span>- {lesson.type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    {isSubmitting 
                      ? (editingCourse ? 'Updating Course...' : 'Adding Course...') 
                      : (editingCourse ? 'Update Course' : 'Add Course')
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Marketplace Management component with modal
const MarketplaceManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Array<{
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    tags: string[];
    seller: { id: string; name: string; email: string; rating: number; reviewCount: number };
    location: { city: string; country: string; coordinates?: { lat: number; lng: number } };
    isActive: boolean;
    isFeatured: boolean;
    currency?: string;
    condition?: string;
    rating?: number;
    reviewCount?: number;
    quantity?: number;
    views?: number;
  }>>([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [newTag, setNewTag] = useState('');

  // Fetch marketplace items
  const fetchItems = async () => {
    try {
      setItemsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/marketplace`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch marketplace items');
      }
      
      const result = await response.json();
      const itemsWithDefaults = (result.data || []).map((item: Record<string, unknown>) => ({
        ...item,
        isActive: item.isActive ?? true,
        isFeatured: item.isFeatured ?? false,
        currency: item.currency ?? 'NPR',
        condition: item.condition ?? 'New',
        rating: item.rating ?? 0,
        reviewCount: item.reviewCount ?? 0,
        quantity: item.quantity ?? 1,
        views: item.views ?? 0
      }));
      setItems(itemsWithDefaults);
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
    } finally {
      setItemsLoading(false);
    }
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Tag and image handling functions
  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result;
            if (result) {
              setFormData(prev => ({
                ...prev,
                images: [...prev.images, result as string]
              }));
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    originalPrice: '',
    discount: '',
    currency: 'NPR',
    images: [] as string[],
    tags: [] as string[],
    condition: 'new' as 'new' | 'like_new' | 'good' | 'fair' | 'poor',
    availability: 'in_stock' as 'in_stock' | 'out_of_stock' | 'limited',
    quantity: 1,
    itemType: 'new' as 'new' | 'resale',
    marketplaceItemType: 'sale' as 'rental' | 'sale',
    rating: 0,
    reviewCount: 0,
    seller: {
      id: '',
      name: '',
      email: '',
      rating: 0,
      reviewCount: 0,
    },
    isActive: true,
    isFeatured: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('seller.')) {
      const sellerField = name.split('.')[1] as keyof typeof formData.seller;
      setFormData(prev => ({
        ...prev,
        seller: {
          ...prev.seller,
          [sellerField]: value
        }
      }));
    } else {
      setFormData(prev => {
        const newData = {
          ...prev,
          [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                  type === 'number' ? parseFloat(value) || 0 : value
        };

        // Auto-update condition based on item type
        if (name === 'itemType') {
          if (value === 'new') {
            newData.condition = 'new';
          } else if (value === 'resale') {
            newData.condition = 'like_new';
          }
        }

        return newData;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!formData.category.trim()) {
        throw new Error('Category is required');
      }
      if (!formData.price || parseFloat(formData.price) < 0) {
        throw new Error('Valid price is required');
      }
      if (!formData.seller.id.trim()) {
        throw new Error('Seller ID is required');
      }
      if (!formData.seller.name.trim()) {
        throw new Error('Seller name is required');
      }
      if (!formData.seller.email.trim() || !formData.seller.email.includes('@')) {
        throw new Error('Valid seller email is required');
      }
      if (formData.images.length === 0) {
        throw new Error('At least one image is required');
      }

      // Prepare the data for API submission
      const apiData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        subcategory: formData.subcategory.trim() || undefined,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        discount: formData.discount ? parseFloat(formData.discount) : undefined,
        currency: formData.currency,
        images: formData.images,
        tags: formData.tags,
        itemType: formData.marketplaceItemType,
        condition: formData.condition,
        availability: formData.availability,
        quantity: formData.quantity,
        rating: formData.rating,
        reviewCount: formData.reviewCount,
        seller: {
          id: formData.seller.id.trim(),
          name: formData.seller.name.trim(),
          email: formData.seller.email.trim(),
          rating: formData.seller.rating,
          reviewCount: formData.seller.reviewCount,
        },
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      };

      console.log('Creating marketplace item:', apiData);

      // Make API call to create marketplace item
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/marketplace`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create marketplace item');
      }

      const result = await response.json();
      console.log('Marketplace item created successfully:', result);

      // Refresh the items list
      await fetchItems();

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        category: '',
        subcategory: '',
        price: '',
        originalPrice: '',
        discount: '',
        currency: 'NPR',
        images: [],
        tags: [],
        condition: 'new',
        availability: 'in_stock',
        quantity: 1,
        itemType: 'new',
        marketplaceItemType: 'sale',
        rating: 0,
        reviewCount: 0,
        seller: {
          id: '',
          name: '',
          email: '',
          rating: 0,
          reviewCount: 0,
        },
        isActive: true,
        isFeatured: false,
      });
      setShowModal(false);
      
      // Show success message (you could add a toast notification here)
      alert('Marketplace item created successfully!');
      
    } catch (error) {
      console.error('Error creating marketplace item:', error);
      alert(`Error creating marketplace item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Marketplace Management</h1>
        <p className="text-gray-600">Manage marketplace items and products.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Marketplace Items</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Item
          </button>
        </div>
        
        {itemsLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading marketplace items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Items Yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first marketplace item.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {item.isFeatured && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {item.currency} {item.price}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">{item.condition}</span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{item.rating || 0}</span>
                    <span className="text-xs text-gray-500">({item.reviewCount || 0} reviews)</span>
                  </div>
                  <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Category: {item.category}</span>
                  <span>Views: {item.views || 0}</span>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Add New Marketplace Item</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Basic Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="photography">Photography</option>
                        <option value="videography">Videography</option>
                        <option value="equipment">Equipment</option>
                        <option value="accessories">Accessories</option>
                        <option value="software">Software</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                      <input
                        type="text"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* New or Resale Section */}
                  <div className="space-y-4">
                    <h5 className="text-md font-semibold text-gray-800">Item Type</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.itemType === 'new' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="itemType"
                          value="new"
                          checked={formData.itemType === 'new'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            formData.itemType === 'new' 
                              ? 'border-green-500 bg-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {formData.itemType === 'new' && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">New Product</div>
                            <div className="text-xs text-gray-500">Brand new, unused items</div>
                          </div>
                        </div>
                        {formData.itemType === 'new' && (
                          <div className="absolute top-2 right-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        )}
                      </label>

                      <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.itemType === 'resale' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="itemType"
                          value="resale"
                          checked={formData.itemType === 'resale'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            formData.itemType === 'resale' 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-gray-300'
                          }`}>
                            {formData.itemType === 'resale' && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Resale Item</div>
                            <div className="text-xs text-gray-500">Previously owned, second-hand items</div>
                          </div>
                        </div>
                        {formData.itemType === 'resale' && (
                          <div className="absolute top-2 right-2">
                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Rental or Sale */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Marketplace Type</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.marketplaceItemType === 'rental' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange({ target: { name: 'marketplaceItemType', value: 'rental' } } as React.ChangeEvent<HTMLInputElement>)}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="marketplaceItemType"
                          value="rental"
                          checked={formData.marketplaceItemType === 'rental'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Rental Item</div>
                          <div className="text-xs text-gray-500">For short-term rental</div>
                        </div>
                        {formData.marketplaceItemType === 'rental' && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    <div 
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.marketplaceItemType === 'sale' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange({ target: { name: 'marketplaceItemType', value: 'sale' } } as React.ChangeEvent<HTMLInputElement>)}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="marketplaceItemType"
                          value="sale"
                          checked={formData.marketplaceItemType === 'sale'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-green-600"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Sale Item</div>
                          <div className="text-xs text-gray-500">For permanent sale</div>
                        </div>
                        {formData.marketplaceItemType === 'sale' && (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Pricing</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="NPR">NPR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Condition
                        {formData.itemType === 'new' && <span className="text-xs text-gray-500 ml-1">(for new items)</span>}
                        {formData.itemType === 'resale' && <span className="text-xs text-gray-500 ml-1">(for resale items)</span>}
                      </label>
                      <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {formData.itemType === 'new' ? (
                          <>
                            <option value="new">New</option>
                            <option value="like_new">Like New</option>
                          </>
                        ) : (
                          <>
                            <option value="like_new">Like New</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="limited">Limited</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Images *</h3>
                  
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Click to upload images</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                    </label>
                  </div>
                  
                  {/* Image Preview */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-500">At least one image is required</p>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Tags</h3>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Rating & Reviews</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                      <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Review Count</label>
                      <input
                        type="number"
                        name="reviewCount"
                        value={formData.reviewCount}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Seller Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Seller Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seller ID</label>
                    <input
                      type="text"
                      name="seller.id"
                      value={formData.seller.id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seller Name</label>
                    <input
                      type="text"
                      name="seller.name"
                      value={formData.seller.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seller Email</label>
                    <input
                      type="email"
                      name="seller.email"
                      value={formData.seller.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>


              {/* Settings */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Settings</h4>
                
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Featured</span>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("overview");
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Loading states
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  // Photography content state
  const [photographyContent, setPhotographyContent] = useState<{
    title: string;
    subtitle: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    isActive: boolean;
  } | null>(null);
  
  
  
  
  

  // Event Hero data
  const [eventHeroData, setEventHeroData] = useState<{
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    isActive: boolean;
  }>({
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image',
    isActive: true
  });

  // Featured Events data
  const [featuredEvents, setFeaturedEvents] = useState<Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    eventDate: string;
    location: string;
    isActive: boolean;
  }>>([]);
  const [isFeaturedEventModalOpen, setIsFeaturedEventModalOpen] = useState(false);
  const [editingFeaturedEvent, setEditingFeaturedEvent] = useState<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    eventDate: string;
    location: string;
    isActive: boolean;
  } | null>(null);

  // Event Packages data
  const [isEventPackageModalOpen, setIsEventPackageModalOpen] = useState(false);
  const [editingEventPackage, setEditingEventPackage] = useState<{
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    maxGuests: number;
    features: Array<{ name: string; included: boolean }>;
    isPopular: boolean;
    icon: string;
  } | null>(null);


  // API Service Functions
  const apiService = {
    // Photography Hero Section API
    fetchPhotographyContent: async () => {
      try {
        const response = await fetch('/api/photography/hero-section');
        if (!response.ok) throw new Error('Failed to fetch photography content');
        return await response.json();
      } catch (error) {
        console.error('Error fetching photography content:', error);
        return null;
      }
    },

    // Portfolio API
    fetchPortfolioData: async () => {
      try {
        const response = await fetch('/api/photography/portfolio');
        if (!response.ok) throw new Error('Failed to fetch portfolio data');
        return await response.json();
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        return [];
      }
    },

    // Gallery API
    fetchGalleryData: async () => {
      try {
        const response = await fetch('/api/photography/gallery');
        if (!response.ok) throw new Error('Failed to fetch gallery data');
        return await response.json();
      } catch (error) {
        console.error('Error fetching gallery data:', error);
        return [];
      }
    },

    // FAQ API
    fetchFaqData: async () => {
      try {
        const response = await fetch('/api/photography/faq');
        if (!response.ok) throw new Error('Failed to fetch FAQ data');
        return await response.json();
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
        return [];
      }
    },

    // About API
    fetchAboutData: async () => {
      try {
        const response = await fetch('/api/photography/about');
        if (!response.ok) throw new Error('Failed to fetch about data');
        return await response.json();
      } catch (error) {
        console.error('Error fetching about data:', error);
        return null;
      }
    },

    // Categories API
    fetchCategoriesData: async () => {
      try {
        const response = await fetch('/api/photography/categories');
        if (!response.ok) throw new Error('Failed to fetch categories data');
        return await response.json();
      } catch (error) {
        console.error('Error fetching categories data:', error);
        return [];
      }
    },

    // Save Photography Content
    savePhotographyContent: async (content: {
      title: string;
      description: string;
      mediaUrl: string;
      mediaType: 'image' | 'video';
      isActive: boolean;
    }) => {
      try {
        const response = await fetch('/api/photography/hero-section', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(content),
        });
        if (!response.ok) throw new Error('Failed to save photography content');
        return await response.json();
      } catch (error) {
        console.error('Error saving photography content:', error);
        throw error;
      }
    },

    // Event Hero API
    saveEventHero: async (data: {
      title: string;
      description: string;
      mediaUrl: string;
      mediaType: 'image' | 'video';
      isActive: boolean;
    }) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/hero`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to save event hero');
        return await response.json();
      } catch (error) {
        console.error('Error saving event hero:', error);
        throw error;
      }
    },

    updateEventHero: async (id: string, data: {
      title: string;
      description: string;
      mediaUrl: string;
      mediaType: 'image' | 'video';
      isActive: boolean;
    }) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/hero/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update event hero');
        return await response.json();
      } catch (error) {
        console.error('Error updating event hero:', error);
        throw error;
      }
    },

    // Featured Events API
    saveFeaturedEvent: async (data: {
      title: string;
      description: string;
      imageUrl: string;
      eventDate: string;
      location: string;
      isActive: boolean;
    }) => {
      try {
        console.log('Sending featured event data:', data);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/featured`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to save featured event: ${response.status} ${errorText}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error saving featured event:', error);
        throw error;
      }
    },

    updateFeaturedEvent: async (id: string, data: {
      title: string;
      description: string;
      imageUrl: string;
      eventDate: string;
      location: string;
      isActive: boolean;
    }) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/featured/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update featured event');
        return await response.json();
      } catch (error) {
        console.error('Error updating featured event:', error);
        throw error;
      }
    },

    deleteFeaturedEvent: async (id: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/featured/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete featured event');
        return await response.json();
      } catch (error) {
        console.error('Error deleting featured event:', error);
        throw error;
      }
    }
  };

  // Loading state helper
  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  };

  // Get loading state
  const getLoading = (key: string) => loadingStates[key] || false;

  // Breadcrumbs component
  const Breadcrumbs = () => {
    const getBreadcrumbs = () => {
      const breadcrumbs = [
        { label: "Dashboard", href: "overview" }
      ];

      if (activeMenu === "overview") {
        return breadcrumbs;
      }

      // Add Content Management
      if (activeMenu.startsWith("booking") || activeMenu.startsWith("photography") || activeMenu.startsWith("event") || activeMenu === "videography" || activeMenu === "blog") {
        breadcrumbs.push({ label: "Content Management", href: "content-management" });
      }

      // Add Booking
      if (activeMenu.startsWith("booking")) {
        breadcrumbs.push({ label: "Booking", href: "booking" });
      }

      // Add Photography
      if (activeMenu.startsWith("photography")) {
        breadcrumbs.push({ label: "Photography", href: "photography" });
      }

      // Add Event
      if (activeMenu.startsWith("event")) {
        breadcrumbs.push({ label: "Event", href: "event" });
      }

      // Add specific booking section
      if (activeMenu.startsWith("booking-")) {
        const sectionMap: Record<string, string> = {
          "booking-hero-section": "Hero Section",
          "booking-packages": "Packages",
          "booking-management": "Booking Management"
        };
        
        const sectionName = sectionMap[activeMenu];
        if (sectionName) {
          breadcrumbs.push({ label: sectionName, href: activeMenu });
        }
      }

      // Add specific photography section
      if (activeMenu.startsWith("photography-")) {
        const sectionMap: Record<string, string> = {
          "photography-portfolio": "Portfolio",
          "photography-gallery": "Gallery",
          "photography-faq": "FAQ",
          "photography-about": "About",
          "photography-categories": "Categories"
        };
        
        const sectionName = sectionMap[activeMenu];
        if (sectionName) {
          breadcrumbs.push({ label: sectionName, href: activeMenu });
        }
      }

      // Add specific event section
      if (activeMenu.startsWith("event-")) {
        const sectionMap: Record<string, string> = {
          "event-hero-section": "Hero Section",
          "event-featured": "Featured Event",
          "event-packages": "Event Packages"
        };
        
        const sectionName = sectionMap[activeMenu];
        if (sectionName) {
          breadcrumbs.push({ label: sectionName, href: activeMenu });
        }
      }

      // Add other main sections
      if (activeMenu === "videography") {
        breadcrumbs.push({ label: "Videography", href: "videography" });
      }
      if (activeMenu === "blog") {
        breadcrumbs.push({ label: "Blog", href: "blog" });
      }
      if (activeMenu === "orders") {
        breadcrumbs.push({ label: "Orders", href: "orders" });
      }
      if (activeMenu === "message") {
        breadcrumbs.push({ label: "Messages", href: "message" });
      }
      if (activeMenu === "activity") {
        breadcrumbs.push({ label: "Activity", href: "activity" });
      }

      return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    const handleBreadcrumbClick = (href: string) => {
      // Handle navigation for different breadcrumb levels
      if (href === "content-management") {
        setActiveMenu("overview");
        setExpandedMenus(["content-management"]);
      } else if (href === "booking") {
        setActiveMenu("overview");
        setExpandedMenus(["content-management", "booking"]);
      } else if (href === "photography") {
        setActiveMenu("overview");
        setExpandedMenus(["content-management", "photography"]);
      } else if (href === "event") {
        setActiveMenu("overview");
        setExpandedMenus(["content-management", "event"]);
      } else {
        setActiveMenu(href);
      }
    };

    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-2 px-4 py-3">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center space-x-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-black font-medium">{crumb.label}</span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(crumb.href)}
                className="text-gray-500 hover:text-purple-600 transition-colors font-medium"
              >
                {crumb.label}
              </button>
            )}
          </div>
        ))}
      </nav>
    );
  };

  // Elegant No Data Found Component
  const NoDataFound = ({ 
    icon: Icon, 
    title, 
    description, 
    actionLabel, 
    onAction 
  }: { 
    icon: React.ComponentType<{ className?: string }>; 
    title: string; 
    description: string; 
    actionLabel?: string; 
    onAction?: () => void; 
  }) => (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );

  // Loading Component
  const LoadingSpinner = ({ size = "medium" }: { size?: "small" | "medium" | "large" }) => {
    const sizeClasses = {
      small: "w-4 h-4",
      medium: "w-8 h-8",
      large: "w-12 h-12"
    };
    
    return (
      <div className="flex items-center justify-center py-8">
        <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-purple-600 ${sizeClasses[size]}`}></div>
      </div>
    );
  };
  
  // Modal state
  const [showContentModal, setShowContentModal] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const [editingContent, setEditingContent] = useState({
    title: "",
    subtitle: "",
    description: "",
    mediaType: "image",
    mediaUrl: "",
    isActive: true
  });

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { 
      id: "content-management", 
      label: "Content Management", 
      icon: FileText,
      hasSubmenu: true,
      subItems: [
        { 
          id: "booking", 
          label: "Booking", 
          icon: Calendar,
          hasSubmenu: true,
          subItems: [
            { id: "booking-hero-section", label: "Hero Section", icon: Camera },
            { id: "booking-packages", label: "Packages", icon: Package },
            { id: "booking-management", label: "Booking Management", icon: Calendar },
          ]
        },
        { 
          id: "photography", 
          label: "Photography", 
          icon: Camera,
          hasSubmenu: true,
          subItems: [
            { id: "photography-portfolio", label: "Portfolio", icon: Edit3 },
            { id: "photography-gallery", label: "Gallery", icon: Image },
            { id: "photography-faq", label: "FAQ", icon: MessageSquare },
            { id: "photography-about", label: "About", icon: User },
            { id: "photography-categories", label: "Categories", icon: Settings },
          ]
        },
        { 
          id: "event", 
          label: "Event", 
          icon: CalendarDays,
          hasSubmenu: true,
          subItems: [
            { id: "event-hero-section", label: "Hero Section", icon: Camera },
            { id: "event-featured", label: "Featured Event", icon: Sparkles },
            { id: "event-packages", label: "Event Packages", icon: Package },
          ]
        },
        { id: "videography", label: "Videography", icon: Video },
        { id: "blog", label: "Blog", icon: Edit3 },
      ]
    },
    { id: "courses", label: "Courses", icon: Users },
    { id: "marketplace", label: "Marketplace", icon: Package },
    { id: "equipment-rental", label: "Equipment Rental", icon: Wrench },
    { id: "orders", label: "Orders", icon: Package },
    { id: "message", label: "Message", icon: MessageSquare, badge: 6 },
    { id: "activity", label: "Activity", icon: Clock },
  ];

  const generalItems = [
    { id: "report", label: "Report", icon: FileText },
    { id: "support", label: "Support", icon: Headphones },
    { id: "account", label: "Account", icon: User },
  ];

  const otherItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Log out", icon: LogOut },
  ];

  const toggleMenuExpansion = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleMenuClick = (item: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    hasSubmenu?: boolean;
    submenu?: Array<{ id: string; label: string; href: string }>;
  }) => {
    if (item.hasSubmenu) {
      toggleMenuExpansion(item.id);
    } else if (item.href) {
      // Handle navigation to external routes
      window.location.href = item.href;
    } else {
      setActiveMenu(item.id);
    }
  };

  const handleSubmenuClick = (subItem: {
    id: string;
    label: string;
    href: string;
    hasSubmenu?: boolean;
  }) => {
    if (subItem.hasSubmenu) {
      toggleMenuExpansion(subItem.id);
    } else {
      setActiveMenu(subItem.id);
    }
  };

  const handleSubSubmenuClick = (subSubItemId: string) => {
    setActiveMenu(subSubItemId);
  };

  // Photography content management functions
  const openContentModal = () => {
    setEditingContent(photographyContent || {
      title: "",
      subtitle: "",
      description: "",
      mediaType: "image",
      mediaUrl: "",
      isActive: false
    });
    setShowContentModal(true);
    // Small delay to ensure the modal starts off-screen
    setTimeout(() => {
      setIsModalAnimating(true);
    }, 10);
  };

  const closeContentModal = () => {
    setIsModalAnimating(false);
    setTimeout(() => {
      setShowContentModal(false);
      setEditingContent({
        title: "",
        subtitle: "",
        description: "",
        mediaType: "image",
        mediaUrl: "",
        isActive: false
      });
    }, 300); // Match the transition duration
  };

  const handleContentSave = async () => {
    try {
      setLoading('save-content', true);
      await apiService.savePhotographyContent({
        title: editingContent.title,
        description: editingContent.description,
        mediaUrl: editingContent.mediaUrl,
        mediaType: editingContent.mediaType as 'image' | 'video',
        isActive: editingContent.isActive ?? true
      });
      setPhotographyContent({ 
        ...editingContent,
        mediaType: editingContent.mediaType as "video" | "image"
      });
      closeContentModal();
    } catch (error) {
      console.error('Error saving content:', error);
      // Handle error (could show toast notification)
    } finally {
      setLoading('save-content', false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditingContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file and get the URL
      const url = URL.createObjectURL(file);
      setEditingContent(prev => ({
        ...prev,
        mediaUrl: url
      }));
    }
  };

  // Fetch data based on active menu
  useEffect(() => {
    const fetchData = async () => {
      switch (activeMenu) {
        case "booking-hero-section":
          // Handle booking hero section data fetching
          setLoading('booking-hero-section', true);
          // Add booking hero section API call here when needed
          setLoading('booking-hero-section', false);
          break;

        case "booking-packages":
          // Handle booking packages data fetching
          setLoading('booking-packages', true);
          // Add booking packages API call here when needed
          setLoading('booking-packages', false);
          break;

        case "booking-management":
          // Handle booking management data fetching
          setLoading('booking-management', true);
          // Add booking management API call here when needed
          setLoading('booking-management', false);
          break;

        case "photography-hero-section": {
          setLoading('hero-section', true);
          const heroData = await apiService.fetchPhotographyContent();
          setPhotographyContent(heroData);
          setLoading('hero-section', false);
          break;
        }

        // case "photography-portfolio": {
        //   setLoading('portfolio', true);
        //   const portfolioData = await apiService.fetchPortfolioData();
        //   setPortfolioData(portfolioData);
        //   setLoading('portfolio', false);
        //   break;
        // }

        // case "photography-gallery": {
        //   setLoading('gallery', true);
        //   const galleryData = await apiService.fetchGalleryData();
        //   setGalleryData(galleryData);
        //   setLoading('gallery', false);
        //   break;
        // }

        // case "photography-faq": {
        //   setLoading('faq', true);
        //   const faqData = await apiService.fetchFaqData();
        //   setFaqData(faqData);
        //   setLoading('faq', false);
        //   break;
        // }

        // case "photography-about": {
        //   setLoading('about', true);
        //   const aboutData = await apiService.fetchAboutData();
        //   setAboutData(aboutData);
        //   setLoading('about', false);
        //   break;
        // }

        // case "photography-categories": {
        //   setLoading('categories', true);
        //   const categoriesData = await apiService.fetchCategoriesData();
        //   setCategoriesData(categoriesData);
        //   setLoading('categories', false);
        //   break;
        // }
        case "event-hero-section": {
          // Handle event hero section data fetching
          setLoading('event-hero-section', true);
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/hero/active`);
            if (response.ok) {
              const data = await response.json();
              const eventData = data.data || {
                id: '',
                title: '',
                description: '',
                mediaUrl: '',
                mediaType: 'image',
                isActive: true
              };
              setEventHeroData(eventData);
            }
          } catch (error) {
            console.error('Error fetching event hero data:', error);
          } finally {
            setLoading('event-hero-section', false);
          }
          break;
        }
        case "event-featured": {
          // Handle event featured data fetching
          setLoading('event-featured', true);
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/featured`);
            if (response.ok) {
              const data = await response.json();
              setFeaturedEvents(data.data || []);
            }
          } catch (error) {
            console.error('Error fetching featured events:', error);
          } finally {
            setLoading('event-featured', false);
          }
          break;
        }
        case "event-packages": {
          // Handle event packages data fetching
          setLoading('event-packages', true);
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/packages`);
            if (response.ok) {
              const data = await response.json();
              // setEventPackages(data.data || []);
            }
          } catch (error) {
            console.error('Error fetching event packages:', error);
          } finally {
            setLoading('event-packages', false);
          }
          break;
        }

        default:
          break;
      }
    };

    if (activeMenu.startsWith("booking-") || activeMenu.startsWith("photography-") || activeMenu.startsWith("event-")) {
      fetchData();
    }
  }, [activeMenu]);

  // Featured Event handlers
  const handleAddFeaturedEvent = () => {
    setEditingFeaturedEvent(null);
    setIsFeaturedEventModalOpen(true);
  };

  const handleEditFeaturedEvent = (event: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    eventDate: string;
    location: string;
    isActive: boolean;
  }) => {
    setEditingFeaturedEvent(event);
    setIsFeaturedEventModalOpen(true);
  };

  const handleSaveFeaturedEvent = async (data: {
    title: string;
    description: string;
    imageUrl: string;
    eventDate: string;
    location: string;
    isActive: boolean;
  }) => {
    try {
      setLoading('event-featured', true);
      await apiService.saveFeaturedEvent(data);
      // Refresh featured events
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/featured`);
      if (response.ok) {
        const result = await response.json();
        setFeaturedEvents(result.data || []);
      }
    } catch (error) {
      console.error('Error saving featured event:', error);
      throw error;
    } finally {
      setLoading('event-featured', false);
    }
  };

  const handleUpdateFeaturedEvent = async (id: string, data: {
    title: string;
    description: string;
    imageUrl: string;
    eventDate: string;
    location: string;
    isActive: boolean;
  }) => {
    try {
      setLoading('event-featured', true);
      await apiService.updateFeaturedEvent(id, data);
      // Refresh featured events
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/featured`);
      if (response.ok) {
        const result = await response.json();
        setFeaturedEvents(result.data || []);
      }
    } catch (error) {
      console.error('Error updating featured event:', error);
      throw error;
    } finally {
      setLoading('event-featured', false);
    }
  };

  const handleDeleteFeaturedEvent = async (id: string) => {
    if (confirm('Are you sure you want to delete this featured event?')) {
      try {
        setLoading('event-featured', true);
        await apiService.deleteFeaturedEvent(id);
        // Refresh featured events
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/featured`);
        if (response.ok) {
          const result = await response.json();
          setFeaturedEvents(result.data || []);
        }
        toast.success('Featured event deleted successfully!');
      } catch (error) {
        console.error('Error deleting featured event:', error);
        toast.error('Error deleting featured event. Please try again.');
      } finally {
        setLoading('event-featured', false);
      }
    }
  };

  // Event Package handlers
  const handleAddEventPackage = () => {
    setEditingEventPackage(null);
    setIsEventPackageModalOpen(true);
  };

  const handleEditEventPackage = (packageData: {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    maxGuests: number;
    features: Array<{ name: string; included: boolean }>;
    isPopular: boolean;
    icon: string;
  }) => {
    setEditingEventPackage(packageData);
    setIsEventPackageModalOpen(true);
  };

  const handleSaveEventPackage = async (data: {
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    maxGuests: number;
    features: Array<{ name: string; included: boolean }>;
    isPopular: boolean;
    icon: string;
  }) => {
    try {
      setLoading('event-packages', true);
      console.log('Sending event package data:', data);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/packages`;
      console.log('API URL:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
        }
        console.error('API Error Response:', errorData);
        console.error('Response status:', response.status);
        console.error('Response headers:', Object.fromEntries(response.headers.entries()));
        throw new Error(errorData.message || `Failed to save event package (${response.status})`);
      }

      const result = await response.json();
      // setEventPackages(prev => [result.data, ...prev]);
      toast.success('Event package saved successfully!');
    } catch (error) {
      console.error('Error saving event package:', error);
      throw error;
    } finally {
      setLoading('event-packages', false);
    }
  };

  const handleUpdateEventPackage = async (id: string, data: {
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    maxGuests: number;
    features: Array<{ name: string; included: boolean }>;
    isPopular: boolean;
    icon: string;
  }) => {
    try {
      setLoading('event-packages', true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/packages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update event package');
      }

      const result = await response.json();
      // setEventPackages(prev => prev.map(pkg => 
      //   pkg.id === id ? result.data : pkg
      // ));
      toast.success('Event package updated successfully!');
    } catch (error) {
      console.error('Error updating event package:', error);
      throw error;
    } finally {
      setLoading('event-packages', false);
    }
  };

  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="flex h-screen bg-gray-50">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-lg flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">Drivergo</span>
            </div>

            {/* Main Menu */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                MAIN MENU
              </h3>
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeMenu === item.id || 
                    (item.hasSubmenu && item.subItems?.some(subItem => 
                      activeMenu === subItem.id || 
                      (subItem.hasSubmenu && subItem.subItems?.some(subSubItem => activeMenu === subSubItem.id))
                    ));
                  const isExpanded = expandedMenus.includes(item.id);
                  
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => handleMenuClick(item)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                          isActive
                            ? "bg-purple-100 text-purple-600"
                            : "text-black hover:bg-gray-50 hover:text-black"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                          {item.hasSubmenu && (
                            isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )
                          )}
                        </div>
                      </button>
                      
                      {/* Submenu items */}
                      {item.hasSubmenu && isExpanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.subItems?.map((subItem) => {
                            const SubIconComponent = subItem.icon;
                            const isSubActive = activeMenu === subItem.id || 
                              (subItem.hasSubmenu && subItem.subItems?.some(subSubItem => activeMenu === subSubItem.id));
                            const isSubExpanded = expandedMenus.includes(subItem.id);
                            
                            return (
                              <div key={subItem.id}>
                                <button
                                  onClick={() => handleSubmenuClick({...subItem, href: '#'})}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                                    isSubActive
                                      ? "bg-purple-50 text-purple-600"
                                      : "text-gray-500 hover:bg-gray-50 hover:text-black"
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <SubIconComponent className="w-4 h-4" />
                                    <span className="text-sm font-medium">{subItem.label}</span>
                                  </div>
                                  {subItem.hasSubmenu && (
                                    isSubExpanded ? (
                                      <ChevronDown className="w-3 h-3" />
                                    ) : (
                                      <ChevronRight className="w-3 h-3" />
                                    )
                                  )}
                                </button>
                                
                                {/* Sub-submenu items */}
                                {subItem.hasSubmenu && isSubExpanded && (
                                  <div className="ml-6 mt-1 space-y-1">
                                    {subItem.subItems?.map((subSubItem) => {
                                      const SubSubIconComponent = subSubItem.icon;
                                      const isSubSubActive = activeMenu === subSubItem.id;
                                      return (
                                        <button
                                          key={subSubItem.id}
                                          onClick={() => handleSubSubmenuClick(subSubItem.id)}
                                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                            isSubSubActive
                                              ? "bg-purple-50 text-purple-600"
                                              : "text-gray-400 hover:bg-gray-50 hover:text-black"
                                          }`}
                                        >
                                          <SubSubIconComponent className="w-3 h-3" />
                                          <span className="text-xs font-medium">{subSubItem.label}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* General */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                GENERAL
              </h3>
              <nav className="space-y-2">
                {generalItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-black hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Others */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                OTHERS
              </h3>
              <nav className="space-y-2">
                {otherItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-black hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-black">
                  {activeMenu === "overview" ? "Dashboard" : 
                   activeMenu === "booking" ? "Booking" :
                   activeMenu === "booking-hero-section" ? "Hero Section" :
                   activeMenu === "booking-packages" ? "Packages" :
                   activeMenu === "booking-management" ? "Booking Management" :
                   activeMenu === "photography" ? "Photography" :
                   activeMenu === "photography-portfolio" ? "Portfolio" :
                   activeMenu === "photography-gallery" ? "Gallery" :
                   activeMenu === "photography-faq" ? "FAQ" :
                   activeMenu === "photography-about" ? "About" :
                   activeMenu === "photography-categories" ? "Categories" :
                   activeMenu === "event" ? "Event" :
                   activeMenu === "event-hero-section" ? "Hero Section" :
                   activeMenu === "event-featured" ? "Featured Event" :
                   activeMenu === "event-packages" ? "Event Packages" :
                   activeMenu === "videography" ? "Videography" :
                   activeMenu === "blog" ? "Blog" :
                   activeMenu === "courses" ? "Courses" :
                  activeMenu === "marketplace" ? "Marketplace" :
                  activeMenu === "equipment-rental" ? "Equipment Rental" :
                   activeMenu === "orders" ? "Orders" :
                   activeMenu === "message" ? "Messages" :
                   activeMenu === "activity" ? "Activity" :
                   "Content Management"}
                </h1>
                <div className="relative">
                  <select className="bg-gray-100 border-0 rounded-lg px-3 py-1 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Status</option>
                    <option>All</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="relative p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-black">Michael K.</p>
                    <p className="text-xs text-gray-500">Manager</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">MK</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs />
            
            {activeMenu === "overview" && (
              <div className="space-y-6">
                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Total Bookings */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                        <p className="text-3xl font-bold text-black">247</p>
                        <div className="flex items-center mt-2 text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+12%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Photography Bookings */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Photography</p>
                        <p className="text-3xl font-bold text-black">89</p>
                        <div className="flex items-center mt-2 text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+8%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Camera className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  {/* Event Bookings */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Events</p>
                        <p className="text-3xl font-bold text-black">156</p>
                        <div className="flex items-center mt-2 text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+18%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CalendarDays className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  {/* Equipment Rentals */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Equipment</p>
                        <p className="text-3xl font-bold text-black">73</p>
                        <div className="flex items-center mt-2 text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+5%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue and Analytics Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Monthly Revenue Chart */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Monthly Revenue</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="w-full h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-end justify-between px-4 pb-2">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-16 bg-blue-500 rounded-t"></div>
                          <span className="text-xs text-gray-500 mt-1">Jan</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-20 bg-blue-500 rounded-t"></div>
                          <span className="text-xs text-gray-500 mt-1">Feb</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-24 bg-blue-500 rounded-t"></div>
                          <span className="text-xs text-gray-500 mt-1">Mar</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-28 bg-blue-500 rounded-t"></div>
                          <span className="text-xs text-gray-500 mt-1">Apr</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-32 bg-blue-500 rounded-t"></div>
                          <span className="text-xs text-gray-500 mt-1">May</span>
                    </div>
                    <div className="flex flex-col items-center relative">
                          <div className="w-6 h-36 bg-purple-600 rounded-t"></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                            <span className="text-xs font-medium text-black">₹2.4L</span>
                      </div>
                          <span className="text-xs text-gray-500 mt-1">Jun</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-30 bg-blue-500 rounded-t"></div>
                      <span className="text-xs text-gray-500 mt-1">Jul</span>
                    </div>
                    <div className="flex flex-col items-center">
                          <div className="w-6 h-26 bg-blue-500 rounded-t"></div>
                      <span className="text-xs text-gray-500 mt-1">Aug</span>
                    </div>
                    <div className="flex flex-col items-center">
                          <div className="w-6 h-28 bg-blue-500 rounded-t"></div>
                      <span className="text-xs text-gray-500 mt-1">Sep</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-24 bg-blue-500 rounded-t"></div>
                      <span className="text-xs text-gray-500 mt-1">Oct</span>
                    </div>
                    <div className="flex flex-col items-center">
                          <div className="w-6 h-22 bg-blue-500 rounded-t"></div>
                      <span className="text-xs text-gray-500 mt-1">Nov</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-20 bg-blue-500 rounded-t"></div>
                      <span className="text-xs text-gray-500 mt-1">Dec</span>
                    </div>
                  </div>
                </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">+15% from last month</span>
                </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-black">₹2.4L</p>
                        <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
                  </div>
                </div>

                  {/* Revenue Breakdown */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Revenue Breakdown</h3>
                    <div className="space-y-4">
                  <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-black">Photography</span>
                    </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-black">₹1.8L</span>
                          <p className="text-xs text-gray-500">75%</p>
                        </div>
                  </div>
                  <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-black">Events</span>
                    </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-black">₹1.2L</span>
                          <p className="text-xs text-gray-500">50%</p>
                  </div>
                </div>
                  <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-black">Equipment</span>
                    </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-black">₹60K</span>
                          <p className="text-xs text-gray-500">25%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-black">Videography</span>
                      </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-black">₹40K</span>
                          <p className="text-xs text-gray-500">17%</p>
                    </div>
                  </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-black">Total</span>
                        <span className="text-lg font-bold text-black">₹2.4L</span>
                    </div>
                  </div>
                    </div>
                  </div>

                {/* Recent Activity and Equipment Status Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Bookings */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Recent Bookings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Camera className="w-5 h-5 text-purple-600" />
                </div>
                        <div className="flex-1">
                          <p className="font-medium text-black">Wedding Photography</p>
                          <p className="text-sm text-gray-500">Sarah Johnson • Dec 15, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-black">₹45,000</p>
                          <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Confirmed</span>
                </div>
              </div>

                      <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CalendarDays className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                          <p className="font-medium text-black">Corporate Event</p>
                          <p className="text-sm text-gray-500">Tech Solutions Inc • Dec 18, 2024</p>
                    </div>
                        <div className="text-right">
                          <p className="font-semibold text-black">₹75,000</p>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">Pending</span>
                  </div>
                </div>
                      
                      <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-orange-600" />
                  </div>
                        <div className="flex-1">
                          <p className="font-medium text-black">Equipment Rental</p>
                          <p className="text-sm text-gray-500">Mike Chen • Dec 20, 2024</p>
                  </div>
                        <div className="text-right">
                          <p className="font-semibold text-black">₹12,000</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Processing</span>
                  </div>
                  </div>
                </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full text-center text-blue-600 hover:text-blue-800 font-medium">
                        View All Bookings
                      </button>
                    </div>
              </div>

                  {/* Equipment Status */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Equipment Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Camera className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-black">Cameras</span>
                  </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                          <span className="text-sm font-medium text-black">8/10</span>
                        </div>
                      </div>
                      
                  <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Zap className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-black">Lighting</span>
                  </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <span className="text-sm font-medium text-black">6/10</span>
                        </div>
                      </div>
                      
                  <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Video className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-black">Audio</span>
                  </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                          <span className="text-sm font-medium text-black">9/10</span>
                    </div>
                  </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Box className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-black">Accessories</span>
                    </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                          <span className="text-sm font-medium text-black">7/10</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-black">Total Available</span>
                        <span className="text-lg font-bold text-green-600">30/40</span>
                      </div>
                  </div>
                </div>
              </div>

                {/* Performance Metrics Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer Satisfaction */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Customer Satisfaction</h3>
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-black mb-2">4.8</div>
                      <div className="flex items-center justify-center text-yellow-500 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                  </div>
                      <p className="text-sm text-gray-500">Based on 127 reviews</p>
                </div>
                    <div className="space-y-2">
                  <div className="flex items-center justify-between">
                        <span className="text-sm text-black">5 stars</span>
                        <div className="flex-1 mx-3">
                          <div className="h-2 bg-yellow-500 rounded-full w-4/5"></div>
                  </div>
                        <span className="text-sm font-medium text-black">85%</span>
                  </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black">4 stars</span>
                        <div className="flex-1 mx-3">
                          <div className="h-2 bg-yellow-500 rounded-full w-1/4"></div>
                  </div>
                        <span className="text-sm font-medium text-black">12%</span>
                  </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black">3 stars</span>
                        <div className="flex-1 mx-3">
                          <div className="h-2 bg-yellow-500 rounded-full w-1/10"></div>
                        </div>
                        <span className="text-sm font-medium text-black">3%</span>
                      </div>
                </div>
              </div>

                  {/* Monthly Growth */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Monthly Growth</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black">Bookings</span>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+12%</span>
                    </div>
                  </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black">Revenue</span>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+15%</span>
                  </div>
                </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black">New Customers</span>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+8%</span>
              </div>
                </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black">Equipment Usage</span>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">+5%</span>
                      </div>
                    </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">+12.5%</p>
                        <p className="text-sm text-gray-500">Overall Growth</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Upcoming Events */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Upcoming Events</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium text-black">Wedding Photography</p>
                          <p className="text-sm text-gray-500">Dec 22, 2024 • 2:00 PM</p>
                      </div>
                        <span className="text-xs text-blue-600 font-medium">2 days</span>
                    </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium text-black">Corporate Event</p>
                          <p className="text-sm text-gray-500">Dec 25, 2024 • 10:00 AM</p>
                    </div>
                        <span className="text-xs text-green-600 font-medium">5 days</span>
                  </div>
                  
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium text-black">Birthday Party</p>
                          <p className="text-sm text-gray-500">Dec 28, 2024 • 6:00 PM</p>
                      </div>
                        <span className="text-xs text-purple-600 font-medium">8 days</span>
                    </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium text-black">Equipment Rental</p>
                          <p className="text-sm text-gray-500">Dec 30, 2024 • 9:00 AM</p>
                    </div>
                        <span className="text-xs text-orange-600 font-medium">10 days</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full text-center text-blue-600 hover:text-blue-800 font-medium">
                        View Calendar
                      </button>
                  </div>
                </div>
              </div>
            </div>
            )}


            {activeMenu === "booking-hero-section" && (
              <div className="p-6">
                <BookingManagement />
              </div>
            )}

            {activeMenu === "booking-packages" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-black mb-4">Package Management</h2>
                    <p className="text-black">Manage photography and videography packages, pricing, and features.</p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <Package className="w-8 h-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold text-black">Create Package</h3>
                        <p className="text-sm text-black">Add new service packages</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <Edit3 className="w-8 h-8 text-green-600 mb-2" />
                        <h3 className="font-semibold text-black">Edit Packages</h3>
                        <p className="text-sm text-black">Modify existing packages</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
                        <h3 className="font-semibold text-black">Analytics</h3>
                        <p className="text-sm text-black">Track package performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "booking-management" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-black">Booking Management</h2>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Calendar className="w-4 h-4" />
                        <span>New Booking</span>
                      </button>
                    </div>
                    
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-black mb-2">Booking Management System</h3>
                      <p className="text-black mb-6">Manage all your photography bookings, schedules, and client appointments in one place.</p>
                      <div className="flex justify-center space-x-4">
                        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          View Bookings
                        </button>
                        <button className="px-6 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors">
                          Calendar View
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {activeMenu === "photography-hero-section" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-black">Hero Section</h2>
                      <button
                        onClick={openContentModal}
                        disabled={getLoading('save-content')}
                        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {getLoading('save-content') ? (
                          <LoadingSpinner size="small" />
                        ) : (
                          <Edit3 className="w-4 h-4" />
                        )}
                        <span>{getLoading('save-content') ? 'Saving...' : 'Manage Content'}</span>
                      </button>
                    </div>
                    
                    {/* Loading State */}
                    {getLoading('hero-section') ? (
                      <LoadingSpinner size="large" />
                    ) : photographyContent ? (
                      /* Current Content Display */
                      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Content Info */}
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-black">Title</label>
                              <p className="text-lg font-semibold text-black mt-1">{photographyContent.title}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-black">Subtitle</label>
                              <p className="text-base text-black mt-1">{photographyContent.subtitle}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-black">Description</label>
                              <p className="text-sm text-black mt-1">{photographyContent.description}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-black">Media Type</label>
                              <div className="flex items-center space-x-2 mt-1">
                                {photographyContent.mediaType === "image" ? (
                                  <Camera className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <Video className="w-4 h-4 text-red-600" />
                                )}
                                <span className="text-sm font-medium text-black capitalize">
                                  {photographyContent.mediaType}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Media Preview */}
                          <div>
                            <label className="text-sm font-medium text-black">Media Preview</label>
                            <div className="mt-2 w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                              {photographyContent.mediaType === "image" ? (
                                <img
                                  src={photographyContent.mediaUrl}
                                  alt="Photography content"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                  <Video className="w-12 h-12 text-gray-500" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* No Data Found */
                      <NoDataFound
                        icon={Camera}
                        title="No Hero Content Found"
                        description="Create compelling hero content to showcase your photography services and attract potential clients."
                        actionLabel="Create Hero Content"
                        onAction={openContentModal}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "photography-portfolio" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-black mb-4">Portfolio Management</h2>
                    <p className="text-black">Manage your photography portfolio, showcase your best work, and organize your projects.</p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <Edit3 className="w-8 h-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold text-black">Add Portfolio Item</h3>
                        <p className="text-sm text-black">Upload new portfolio pieces</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <Image className="w-8 h-8 text-green-600 mb-2" />
                        <h3 className="font-semibold text-black">Gallery View</h3>
                        <p className="text-sm text-black">Browse portfolio items</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <Settings className="w-8 h-8 text-purple-600 mb-2" />
                        <h3 className="font-semibold text-black">Organize</h3>
                        <p className="text-sm text-black">Categorize and sort items</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "photography-gallery" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-black mb-4">Gallery Management</h2>
                    <p className="text-black">Organize and manage your photo galleries, create collections, and showcase your work.</p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <Image className="w-8 h-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold text-black">Create Gallery</h3>
                        <p className="text-sm text-black">Build new photo galleries</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <Edit3 className="w-8 h-8 text-green-600 mb-2" />
                        <h3 className="font-semibold text-black">Edit Galleries</h3>
                        <p className="text-sm text-black">Modify existing galleries</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <Settings className="w-8 h-8 text-purple-600 mb-2" />
                        <h3 className="font-semibold text-black">Organize</h3>
                        <p className="text-sm text-black">Sort and categorize images</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "photography-faq" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-black mb-4">FAQ Management</h2>
                    <p className="text-black">Manage frequently asked questions to help your clients and visitors.</p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <MessageSquare className="w-8 h-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold text-black">Add FAQ</h3>
                        <p className="text-sm text-black">Create new FAQ entries</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <Edit3 className="w-8 h-8 text-green-600 mb-2" />
                        <h3 className="font-semibold text-black">Edit FAQs</h3>
                        <p className="text-sm text-black">Modify existing questions</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <Settings className="w-8 h-8 text-purple-600 mb-2" />
                        <h3 className="font-semibold text-black">Organize</h3>
                        <p className="text-sm text-black">Categorize and sort FAQs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "photography-about" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-black">About Section</h2>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Edit3 className="w-4 h-4" />
                        <span>Edit About Section</span>
                      </button>
                    </div>
                    
                    {getLoading('about') ? (
                      <LoadingSpinner size="large" />
                    ) : false ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-black mb-4">About Our Photography</h3>
                          <p className="text-black mb-6">About our photography services</p>
                          
                          {false && (
                            <div>
                              <h4 className="font-semibold text-black mb-4">Our Team</h4>
                              <div className="space-y-3">
                                {[].map((member: Record<string, unknown>, index: number) => (
                                  <div key={index} className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                                      {member.avatar ? (
                                        <img 
                                          src={member.avatar as string} 
                                          alt={member.name as string}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                          <User className="w-6 h-6 text-gray-400" />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-black">{member.name as string}</h5>
                                      <p className="text-sm text-gray-500">{member.role as string}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-black mb-4">Our Stats</h3>
                          <div className="space-y-4">
                            {[].map((stat: Record<string, unknown>, index: number) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-black">{stat.label as string}</span>
                                <span className="font-semibold text-black">{stat.value as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <NoDataFound
                        icon={User}
                        title="No About Information Found"
                        description="Create compelling about content to tell your story and build trust with potential clients."
                        actionLabel="Create About Section"
                        onAction={() => console.log('Create about section')}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "photography-categories" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-black mb-4">Category Management</h2>
                    <p className="text-black">Organize your photography services into categories for better client navigation.</p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <Settings className="w-8 h-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold text-black">Create Category</h3>
                        <p className="text-sm text-black">Add new service categories</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <Edit3 className="w-8 h-8 text-green-600 mb-2" />
                        <h3 className="font-semibold text-black">Edit Categories</h3>
                        <p className="text-sm text-black">Modify existing categories</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <Package className="w-8 h-8 text-purple-600 mb-2" />
                        <h3 className="font-semibold text-black">Organize</h3>
                        <p className="text-sm text-black">Sort and manage categories</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "event-hero-section" && (
              <div className="p-6">
                <EventHeroForm
                  eventHeroData={eventHeroData}
                  setEventHeroData={setEventHeroData}
                  loading={getLoading('event-hero-section')}
                  onSave={async (data) => {
                    await apiService.saveEventHero(data);
                    // Refresh data
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/hero/active`);
                    if (response.ok) {
                      const result = await response.json();
                      const eventData = result.data || {
                        id: '',
                        title: '',
                        description: '',
                        mediaUrl: '',
                        mediaType: 'image',
                        isActive: true
                      };
                      setEventHeroData(eventData);
                    }
                  }}
                  onUpdate={async (id, data) => {
                    await apiService.updateEventHero(id, data);
                    // Refresh data
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/event/hero/active`);
                    if (response.ok) {
                      const result = await response.json();
                      const eventData = result.data || {
                        id: '',
                        title: '',
                        description: '',
                        mediaUrl: '',
                        mediaType: 'image',
                        isActive: true
                      };
                      setEventHeroData(eventData);
                    }
                  }}
                />
              </div>
            )}

            {activeMenu === "event-packages" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-black mb-2">Event Packages</h2>
                        <p className="text-black">Manage different event packages with pricing and features.</p>
                      </div>
                      <button 
                        onClick={handleAddEventPackage}
                        className="px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2"
                        style={{ backgroundColor: '#E08E45' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#D17A2F'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#E08E45'}
                      >
                        <Plus className="w-4 h-4" />
                        Add Package
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Essential Package */}
                      <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Package className="w-8 h-8 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-600">Essential Package</h3>
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-bold text-orange-600">NPR 2,000</span>
                              <span className="text-lg text-gray-500 line-through">2,500</span>
                            </div>
                            <span className="text-sm text-black">per person</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Basic event setup
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Standard decorations
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Basic sound system
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Event coordination
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Cleanup service
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Up to 50 guests
                          </li>
                        </ul>
                        
                        <button 
                          onClick={() => handleEditEventPackage({
                            id: 'essential',
                            name: 'Essential Package',
                            price: 2500,
                            discountPrice: 2000,
                            description: 'Basic event package with essential services',
                            features: [
                              { id: '1', text: 'Basic event setup' },
                              { id: '2', text: 'Standard decorations' },
                              { id: '3', text: 'Basic sound system' },
                              { id: '4', text: 'Event coordination' },
                              { id: '5', text: 'Cleanup service' },
                              { id: '6', text: 'Up to 50 guests' }
                            ],
                            maxGuests: 50,
                            isPopular: false,
                            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDdMMTIgM0w0IDdMMTIgMTFMMjAgN1oiIHN0cm9rZT0iI0Y5OTU0MyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTQgN1YxN0wxMiAyMUwyMCAxN1Y3IiBzdHJva2U9IiNGOUE1NDMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='
                          })}
                          className="w-full px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Edit Package
                        </button>
                      </div>

                      {/* Premium Package - Most Popular */}
                      <div className="border-2 border-orange-500 rounded-xl p-6 hover:shadow-lg transition-shadow relative">
                        <div className="absolute -top-3 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Most Popular
                        </div>
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Star className="w-8 h-8 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-600">Premium Package</h3>
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-bold text-orange-600">NPR 3,800</span>
                              <span className="text-lg text-gray-500 line-through">4,500</span>
                            </div>
                            <span className="text-sm text-black">per person</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Full event planning
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Premium decorations
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Professional sound & lighting
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Event coordination
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Photography service
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Cleanup service
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Up to 100 guests
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Custom menu options
                          </li>
                        </ul>
                        
                        <button 
                          onClick={() => handleEditEventPackage({
                            id: 'premium',
                            name: 'Premium Package',
                            price: 4500,
                            discountPrice: 3800,
                            description: 'Premium event package with enhanced services',
                            features: [
                              { id: '1', text: 'Full event planning' },
                              { id: '2', text: 'Premium decorations' },
                              { id: '3', text: 'Professional sound & lighting' },
                              { id: '4', text: 'Event coordination' },
                              { id: '5', text: 'Photography service' },
                              { id: '6', text: 'Cleanup service' },
                              { id: '7', text: 'Up to 100 guests' },
                              { id: '8', text: 'Custom menu options' }
                            ],
                            maxGuests: 100,
                            isPopular: true,
                            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTUuMDkgOC4yNkwyMiA5LjI3TDE3IDE0LjE0TDE4LjE4IDIxTDEyIDE3Ljc3TDUuODIgMjFMNyAxNC4xNEwyIDkuMjhMOS4xMSA4LjI2TDEyIDJaIiBzdHJva2U9IiNGOUE1NDMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='
                          })}
                          className="w-full px-4 py-2 text-white rounded-lg transition-colors" 
                          style={{ backgroundColor: '#E08E45' }}
                        >
                          Edit Package
                        </button>
                      </div>

                      {/* Luxury Package */}
                      <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Crown className="w-8 h-8 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-black">Luxury Package</h3>
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-bold text-orange-600">NPR 6,500</span>
                              <span className="text-lg text-gray-500 line-through">7,500</span>
                            </div>
                            <span className="text-sm text-black">per person</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Complete event management
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Luxury decorations
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Premium sound & lighting
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Dedicated event manager
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Professional photography
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Full event coordination
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Cleanup service
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Up to 200 guests
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Custom menu design
                          </li>
                          <li className="flex items-center text-sm text-black">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Live entertainment
                          </li>
                        </ul>
                        
                        <button 
                          onClick={() => handleEditEventPackage({
                            id: 'luxury',
                            name: 'Luxury Package',
                            price: 7500,
                            discountPrice: 6500,
                            description: 'Luxury event package with premium services',
                            features: [
                              { id: '1', text: 'Complete event management' },
                              { id: '2', text: 'Luxury decorations' },
                              { id: '3', text: 'Premium sound & lighting' },
                              { id: '4', text: 'Dedicated event manager' },
                              { id: '5', text: 'Professional photography' },
                              { id: '6', text: 'Full event coordination' },
                              { id: '7', text: 'Cleanup service' },
                              { id: '8', text: 'Up to 200 guests' },
                              { id: '9', text: 'Custom menu design' },
                              { id: '10', text: 'Live entertainment' }
                            ],
                            maxGuests: 200,
                            isPopular: false,
                            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgMTZMMTIgMTJMMTkgMTZWMTlIMVYxNloiIHN0cm9rZT0iI0Y5OTU0MyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEyIDJMMTAgNkgxNEwxMiAyWiIgc3Ryb2tlPSIjRjlBNTQzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K'
                          })}
                          className="w-full px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Edit Package
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "event-featured" && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-black mb-2">Featured Events</h2>
                        <p className="text-black">Manage featured events that will be highlighted on your website.</p>
                      </div>
                      <button 
                        onClick={handleAddFeaturedEvent}
                        className="px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2"
                        style={{ backgroundColor: '#E08E45' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#D17A2F'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#E08E45'}
                      >
                        <Plus className="w-4 h-4" />
                        Add Featured Event
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-black">Featured Events List</h3>
                      </div>
                      
                      {getLoading('event-featured') ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        </div>
                      ) : featuredEvents.length === 0 ? (
                        <div className="text-center py-8">
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No featured events yet. Add your first event!</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {featuredEvents.map((event) => (
                            <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                                {event.imageUrl ? (
                                  <img 
                                    src={event.imageUrl} 
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Camera className="w-8 h-8 text-gray-400" />
                                )}
                              </div>
                              <h4 className="font-semibold text-black mb-2">{event.title}</h4>
                              <p className="text-sm text-black mb-3">{event.description}</p>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleEditFeaturedEvent(event)}
                                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteFeaturedEvent(event.id)}
                                  className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "videography" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-black mb-4">Videography Management</h2>
                  <p className="text-black">Manage your video content, projects, and productions.</p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <Video className="w-8 h-8 text-blue-600 mb-2" />
                      <h3 className="font-semibold text-black">Video Library</h3>
                      <p className="text-sm text-black">Manage video collections</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <Edit3 className="w-8 h-8 text-green-600 mb-2" />
                      <h3 className="font-semibold text-black">Projects</h3>
                      <p className="text-sm text-black">Track video projects</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <Calendar className="w-8 h-8 text-purple-600 mb-2" />
                      <h3 className="font-semibold text-black">Shooting Schedule</h3>
                      <p className="text-sm text-black">Plan video shoots</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "blog" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-black mb-4">Blog Management</h2>
                  <p className="text-black">Create and manage blog posts, articles, and content.</p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <Edit3 className="w-8 h-8 text-blue-600 mb-2" />
                      <h3 className="font-semibold text-black">Write Post</h3>
                      <p className="text-sm text-black">Create new blog posts</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <FileText className="w-8 h-8 text-green-600 mb-2" />
                      <h3 className="font-semibold text-black">Posts</h3>
                      <p className="text-sm text-black">Manage existing posts</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
                      <h3 className="font-semibold text-black">Analytics</h3>
                      <p className="text-sm text-black">Track post performance</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "courses" && (
              <div className="p-6">
                <CourseManagement />
              </div>
            )}

            {activeMenu === "marketplace" && (
              <div className="p-6">
                <MarketplaceManagement />
              </div>
            )}

            {activeMenu === "equipment-rental" && (
              <div className="p-6">
                <EquipmentRental />
              </div>
            )}

            {(activeMenu === "orders" || activeMenu === "message" || activeMenu === "activity") && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    {activeMenu === "orders" ? "Orders" : 
                     activeMenu === "message" ? "Messages" : "Activity"}
                  </h2>
                  <p className="text-black">
                    {activeMenu === "orders" ? "Manage customer orders and transactions." :
                     activeMenu === "message" ? "View and respond to customer messages." :
                     "Track recent activity and system events."}
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Content Management Modal */}
      {showContentModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeContentModal}
        >
          <div 
            className={`absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
              isModalAnimating ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-black">Manage Photography Content</h2>
              <button
                onClick={closeContentModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingContent.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter photography title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={editingContent.subtitle}
                  onChange={(e) => handleInputChange("subtitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter subtitle"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Description
                </label>
                <textarea
                  value={editingContent.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Enter description"
                />
              </div>

              {/* Media Type */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Media Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mediaType"
                      value="image"
                      checked={editingContent.mediaType === "image"}
                      onChange={(e) => handleInputChange("mediaType", e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-black">Image</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mediaType"
                      value="video"
                      checked={editingContent.mediaType === "video"}
                      onChange={(e) => handleInputChange("mediaType", e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <Video className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-black">Video</span>
                  </label>
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Media Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept={editingContent.mediaType === "image" ? "image/*" : "video/*"}
                    onChange={handleMediaUpload}
                    className="hidden"
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-black">
                      Click to upload {editingContent.mediaType} or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {editingContent.mediaType === "image" ? "PNG, JPG, GIF up to 10MB" : "MP4, MOV up to 100MB"}
                    </p>
                  </label>
                </div>
                
                {/* Media URL Input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Or enter media URL
                  </label>
                  <input
                    type="url"
                    value={editingContent.mediaUrl}
                    onChange={(e) => handleInputChange("mediaUrl", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter media URL"
                  />
                </div>
              </div>

              {/* Media Preview */}
              {editingContent.mediaUrl && (
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Preview
                  </label>
                  <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                    {editingContent.mediaType === "image" ? (
                      <img
                        src={editingContent.mediaUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+";
                        }}
                      />
                    ) : (
                      <video
                        src={editingContent.mediaUrl}
                        controls
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLVideoElement).style.display = "none";
                          (e.currentTarget as HTMLVideoElement).parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-300"><svg class="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/></svg></div>';
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeContentModal}
                className="px-4 py-2 text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleContentSave}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Event Modal */}
      <FeaturedEventModal
        isOpen={isFeaturedEventModalOpen}
        onClose={() => {
          setIsFeaturedEventModalOpen(false);
          setEditingFeaturedEvent(null);
        }}
        onSave={handleSaveFeaturedEvent}
        onUpdate={handleUpdateFeaturedEvent}
        eventData={editingFeaturedEvent}
        loading={getLoading('event-featured')}
      />

      {/* Event Package Modal */}
      <EventPackageModal
        isOpen={isEventPackageModalOpen}
        onClose={() => {
          setIsEventPackageModalOpen(false);
          setEditingEventPackage(null);
        }}
        onSave={handleSaveEventPackage}
        onUpdate={handleUpdateEventPackage}
        packageData={editingEventPackage}
        loading={getLoading('event-packages')}
      />

      <Toaster position="top-right" />
    </AdminLayout>
  );
}
