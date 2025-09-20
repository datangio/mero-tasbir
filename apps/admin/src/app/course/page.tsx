'use client';

import React, { useState } from 'react';
import { Plus, BookOpen, Users, Calendar, FileText, User } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';

interface Course {
  id: string;
  title: string;
  description: string;
  mentors: string[];
  startDate: string;
  endDate: string;
  courseInfo: string;
  modules: CourseModule[];
  instructorDetails: InstructorDetails;
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
}

interface InstructorDetails {
  name: string;
  email: string;
  bio: string;
  expertise: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleAddCourse = () => {
    setShowAddForm(true);
    setEditingCourse(null);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingCourse(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-2">Manage your courses, mentors, and content</p>
        </div>
        <button 
          onClick={handleAddCourse} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Mentors</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((acc, course) => acc + course.mentors.length, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ongoing Courses</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.filter(course => {
                  const now = new Date();
                  const start = new Date(course.startDate);
                  const end = new Date(course.endDate);
                  return now >= start && now <= end;
                }).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Modules</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((acc, course) => acc + course.modules.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Courses</h2>
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first course</p>
            <button 
              onClick={handleAddCourse} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Course
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-gray-600 mt-1">{course.description}</p>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.mentors.length} mentor{course.mentors.length !== 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {course.modules.length} module{course.modules.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md text-red-600 hover:text-red-700 hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Course Form Modal */}
      {showAddForm && (
        <CourseForm
          course={editingCourse}
          onClose={handleCloseForm}
          onSave={(course) => {
            if (editingCourse) {
              setCourses(courses.map(c => c.id === course.id ? course : c));
            } else {
              setCourses([...courses, { ...course, id: Date.now().toString() }]);
            }
            handleCloseForm();
          }}
        />
      )}
    </div>
  );
};

// Course Form Component
interface CourseFormProps {
  course?: Course | null;
  onClose: () => void;
  onSave: (course: Omit<Course, 'id' | 'createdAt'>) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    mentors: course?.mentors || [],
    startDate: course?.startDate || '',
    endDate: course?.endDate || '',
    courseInfo: course?.courseInfo || '',
    modules: course?.modules || [],
    instructorDetails: course?.instructorDetails || {
      name: '',
      email: '',
      bio: '',
      expertise: [],
      socialLinks: {}
    },
    status: course?.status || 'draft' as const
  });

  const [newMentor, setNewMentor] = useState('');
  const [newModule, setNewModule] = useState({ title: '', description: '', duration: '' });
  const [newExpertise, setNewExpertise] = useState('');

  const handleAddMentor = () => {
    if (newMentor.trim()) {
      setFormData({
        ...formData,
        mentors: [...formData.mentors, newMentor.trim()]
      });
      setNewMentor('');
    }
  };

  const handleRemoveMentor = (index: number) => {
    setFormData({
      ...formData,
      mentors: formData.mentors.filter((_, i) => i !== index)
    });
  };

  const handleAddModule = () => {
    if (newModule.title.trim()) {
      setFormData({
        ...formData,
        modules: [...formData.modules, {
          ...newModule,
          id: Date.now().toString(),
          order: formData.modules.length
        }]
      });
      setNewModule({ title: '', description: '', duration: '' });
    }
  };

  const handleRemoveModule = (id: string) => {
    setFormData({
      ...formData,
      modules: formData.modules.filter(module => module.id !== id)
    });
  };

  const handleAddExpertise = () => {
    if (newExpertise.trim()) {
      setFormData({
        ...formData,
        instructorDetails: {
          ...formData.instructorDetails,
          expertise: [...formData.instructorDetails.expertise, newExpertise.trim()]
        }
      });
      setNewExpertise('');
    }
  };

  const handleRemoveExpertise = (index: number) => {
    setFormData({
      ...formData,
      instructorDetails: {
        ...formData.instructorDetails,
        expertise: formData.instructorDetails.expertise.filter((_, i) => i !== index)
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {course ? 'Edit Course' : 'Add New Course'}
            </h2>
            <button 
              onClick={onClose}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course description"
              />
            </div>

            {/* Mentors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mentors
              </label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMentor}
                    onChange={(e) => setNewMentor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mentor name"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddMentor} 
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.mentors.map((mentor, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {mentor}
                      <button
                        type="button"
                        onClick={() => handleRemoveMentor(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Course Info (Rich Text Editor) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Information
              </label>
              <RichTextEditor
                value={formData.courseInfo}
                onChange={(content) => setFormData({ ...formData, courseInfo: content })}
                placeholder="Enter detailed course information..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Use the rich text editor to format your course information with headings, lists, links, and more.
              </p>
            </div>

            {/* Course Modules */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Modules
              </label>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={newModule.title}
                    onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Module title"
                  />
                  <input
                    type="text"
                    value={newModule.duration}
                    onChange={(e) => setNewModule({ ...newModule, duration: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Duration (e.g., 2 hours)"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddModule} 
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Add Module
                  </button>
                </div>
                <textarea
                  value={newModule.description}
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Module description"
                />
                
                <div className="space-y-2">
                  {formData.modules.map((module, index) => (
                    <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium text-gray-900">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                        <p className="text-xs text-gray-500">Duration: {module.duration}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveModule(module.id)}
                        className="px-2 py-1 text-xs border border-gray-300 rounded-md text-red-600 hover:text-red-700 hover:bg-gray-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructor Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Instructor Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructor Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.instructorDetails.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      instructorDetails: { ...formData.instructorDetails, name: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter instructor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.instructorDetails.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      instructorDetails: { ...formData.instructorDetails, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter instructor email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.instructorDetails.bio}
                  onChange={(e) => setFormData({
                    ...formData,
                    instructorDetails: { ...formData.instructorDetails, bio: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter instructor bio"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Expertise
                </label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter expertise area"
                    />
                    <button 
                      type="button" 
                      onClick={handleAddExpertise} 
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.instructorDetails.expertise.map((expertise, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        {expertise}
                        <button
                          type="button"
                          onClick={() => handleRemoveExpertise(index)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.instructorDetails.socialLinks.linkedin || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      instructorDetails: {
                        ...formData.instructorDetails,
                        socialLinks: { ...formData.instructorDetails.socialLinks, linkedin: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    value={formData.instructorDetails.socialLinks.twitter || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      instructorDetails: {
                        ...formData.instructorDetails,
                        socialLinks: { ...formData.instructorDetails.socialLinks, twitter: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.instructorDetails.socialLinks.website || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      instructorDetails: {
                        ...formData.instructorDetails,
                        socialLinks: { ...formData.instructorDetails.socialLinks, website: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                {course ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
