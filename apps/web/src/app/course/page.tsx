"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";

// Define course type
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  schedule: string;
  shift: string;
  level: string;
  tags: string[];
  image?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  whatYoullLearn: string[];
  prerequisites: string[];
  curriculum: {
    id: string;
    title: string;
    duration: string;
    description?: string;
    lessons?: {
      id: string;
      title: string;
      duration?: string;
      type?: 'video' | 'reading' | 'assignment' | 'quiz';
    }[];
  }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const CoursePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const router = useRouter();
  const { addToCart } = useCart();

  // Static courses array in memory
  const courses: Course[] = [
    {
      id: '1',
      title: 'Photography Fundamentals',
      description: 'Master the basics of photography including composition, lighting, and camera settings',
      instructor: 'Ram Shrestha',
      duration: '8 weeks',
      schedule: 'Mon, Wed, Fri 6:00 PM',
      shift: 'Evening',
      level: 'Beginner',
      tags: ['Photography', 'Basics', 'Composition'],
      image: '/images/photography.jpg',
      price: 199,
      originalPrice: 299,
      discount: 33,
      whatYoullLearn: [
        'Camera settings and modes',
        'Composition techniques',
        'Lighting fundamentals',
        'Post-processing basics'
      ],
      prerequisites: ['No prior experience required'],
      curriculum: [
        {
          id: '1',
          title: 'Introduction to Photography',
          duration: '2 hours',
          description: 'Understanding your camera and basic concepts',
          lessons: [
            { id: '1', title: 'Camera Anatomy', duration: '30 min', type: 'video' },
            { id: '2', title: 'Exposure Triangle', duration: '45 min', type: 'video' },
            { id: '3', title: 'Assignment: First Photos', duration: '45 min', type: 'assignment' }
          ]
        }
      ],
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Advanced Videography',
      description: 'Professional video production techniques for commercial and creative projects',
      instructor: 'Shyam Karki',
      duration: '12 weeks',
      schedule: 'Tue, Thu 7:00 PM',
      shift: 'Evening',
      level: 'Intermediate',
      tags: ['Videography', 'Production', 'Editing'],
      image: '/images/videography.jpeg',
      price: 399,
      originalPrice: 499,
      discount: 20,
      whatYoullLearn: [
        'Cinematic techniques',
        'Professional editing',
        'Audio recording',
        'Color grading'
      ],
      prerequisites: ['Basic photography knowledge', 'Video editing software'],
      curriculum: [
        {
          id: '1',
          title: 'Cinematic Storytelling',
          duration: '3 hours',
          description: 'Learn to tell compelling stories through video',
          lessons: [
            { id: '1', title: 'Story Structure', duration: '60 min', type: 'video' },
            { id: '2', title: 'Visual Language', duration: '60 min', type: 'video' },
            { id: '3', title: 'Project: Short Film', duration: '60 min', type: 'assignment' }
          ]
        }
      ],
      isActive: true,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Portrait Photography Masterclass',
      description: 'Professional portrait photography techniques for studio and outdoor shoots',
      instructor: 'Ram Shrestha',
      duration: '6 weeks',
      schedule: 'Sat 10:00 AM',
      shift: 'Morning',
      level: 'All Levels',
      tags: ['Photography', 'Portraits', 'Studio'],
      image: '/images/online-photography.jpg',
      price: 299,
      originalPrice: 399,
      discount: 25,
      whatYoullLearn: [
        'Portrait lighting setups',
        'Posing techniques',
        'Studio equipment',
        'Client communication'
      ],
      prerequisites: ['Basic camera knowledge'],
      curriculum: [
        {
          id: '1',
          title: 'Portrait Lighting',
          duration: '2.5 hours',
          description: 'Master different lighting setups for portraits',
          lessons: [
            { id: '1', title: 'Natural Light', duration: '45 min', type: 'video' },
            { id: '2', title: 'Studio Lighting', duration: '60 min', type: 'video' },
            { id: '3', title: 'Practice Session', duration: '45 min', type: 'assignment' }
          ]
        }
      ],
      isActive: true,
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25'
    },
    {
      id: '4',
      title: 'Wedding Photography Workshop',
      description: 'Complete guide to wedding photography from preparation to delivery',
      instructor: 'Ram Shrestha',
      duration: '10 weeks',
      schedule: 'Sun 2:00 PM',
      shift: 'Afternoon',
      level: 'Intermediate',
      tags: ['Photography', 'Wedding', 'Events'],
      image: '/images/video-editing.jpg',
      price: 499,
      originalPrice: 699,
      discount: 29,
      whatYoullLearn: [
        'Wedding day workflow',
        'Candid photography',
        'Group shots',
        'Post-wedding editing'
      ],
      prerequisites: ['Portrait photography experience'],
      curriculum: [
        {
          id: '1',
          title: 'Wedding Day Planning',
          duration: '3 hours',
          description: 'Planning and preparation for wedding shoots',
          lessons: [
            { id: '1', title: 'Client Consultation', duration: '60 min', type: 'video' },
            { id: '2', title: 'Timeline Planning', duration: '60 min', type: 'video' },
            { id: '3', title: 'Equipment Checklist', duration: '60 min', type: 'reading' }
          ]
        }
      ],
      isActive: true,
      createdAt: '2024-02-01',
      updatedAt: '2024-02-01'
    },
    {
      id: '5',
      title: 'Drone Photography & Videography',
      description: 'Learn aerial photography and videography with drones',
      instructor: 'Alex Thapa',
      duration: '4 weeks',
      schedule: 'Wed 6:30 PM',
      shift: 'Evening',
      level: 'Beginner',
      tags: ['Drone', 'Aerial', 'Videography'],
      image: '/images/v1.jpg',
      price: 249,
      originalPrice: 349,
      discount: 29,
      whatYoullLearn: [
        'Drone operation',
        'Aerial composition',
        'Safety regulations',
        'Post-processing aerial footage'
      ],
      prerequisites: ['No prior experience required'],
      curriculum: [
        {
          id: '1',
          title: 'Drone Basics',
          duration: '2 hours',
          description: 'Introduction to drone operation and safety',
          lessons: [
            { id: '1', title: 'Drone Setup', duration: '30 min', type: 'video' },
            { id: '2', title: 'Flight Controls', duration: '45 min', type: 'video' },
            { id: '3', title: 'Safety Guidelines', duration: '45 min', type: 'reading' }
          ]
        }
      ],
      isActive: true,
      createdAt: '2024-02-05',
      updatedAt: '2024-02-05'
    },
    {
      id: '6',
      title: 'Photo Editing Mastery',
      description: 'Advanced photo editing techniques using Adobe Lightroom and Photoshop',
      instructor: 'Lisa Thapa',
      duration: '8 weeks',
      schedule: 'Mon, Wed 8:00 PM',
      shift: 'Evening',
      level: 'Intermediate',
      tags: ['Editing', 'Lightroom', 'Photoshop'],
      image: '/images/online-photography.jpg',
      price: 349,
      originalPrice: 449,
      discount: 22,
      whatYoullLearn: [
        'Lightroom workflow',
        'Photoshop techniques',
        'Color correction',
        'Retouching skills'
      ],
      prerequisites: ['Basic photo editing knowledge'],
      curriculum: [
        {
          id: '1',
          title: 'Lightroom Fundamentals',
          duration: '2.5 hours',
          description: 'Master Lightroom for efficient photo editing',
          lessons: [
            { id: '1', title: 'Import & Organization', duration: '45 min', type: 'video' },
            { id: '2', title: 'Basic Adjustments', duration: '60 min', type: 'video' },
            { id: '3', title: 'Presets & Batch Editing', duration: '45 min', type: 'video' }
          ]
        }
      ],
      isActive: true,
      createdAt: '2024-02-10',
      updatedAt: '2024-02-10'
    }
  ];

  // Use static courses array
  const displayCourses = courses;

  // Pagination logic
  const totalPages = Math.ceil(displayCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = displayCourses.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCourseClick = (course: Course) => {
    // Navigate to course detail page
    router.push(`/course/${course.id}`);
  };

  const handleAddToCart = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent course click
    addToCart({
      id: course.id,
      title: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      type: 'course',
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      shift: course.shift,
    });
    toast.success('Course added to cart!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Enhanced the
              <span className="block" style={{ color: '#E08E45' }}>Knowledge</span>
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto leading-relaxed mb-8">
              Master the art of photography, videography, and visual storytelling with our comprehensive courses designed for all skill levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#E08E45' }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px rgba(224, 142, 69, 0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning Today
              </motion.button>
              <motion.button
                className="px-8 py-4 text-black text-lg font-semibold rounded-full border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Courses
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hardcore Course Section - Matching the Image Design */}
      <div className="bg-white rounded-lg p-8 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Left Side: Title and Description */}
          <div className="flex-1 mb-6 lg:mb-0">
            <h2 className="text-4xl font-bold text-black mb-4" style={{ fontFamily: 'serif' }}>
              Available Courses
            </h2>
            <p className="text-lg text-black max-w-2xl">
              Choose from our comprehensive range of photography and videography courses
            </p>
          </div>

          {/* Right Side: Navigation Controls */}
          <div className="flex items-center space-x-4">
            {/* Page Indicator */}
            <span className="text-sm font-medium text-black">
              {currentPage}/{totalPages}
            </span>
            
            {/* Navigation Arrows */}
            <div className="flex space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="w-8 h-8 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="w-8 h-8 border border-black rounded-full flex items-center justify-center text-black hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid - Inside the hardcore section */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentCourses.map(course => (
              <motion.div
                key={course.id}
                className="rounded-xl border border-gray-200 bg-white px-2 pb-5 shadow-sm transition-transform hover:shadow-md cursor-pointer relative"
                onClick={() => handleCourseClick(course)}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Course Image/Illustration */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={course.image || "/images/photography.jpg"}
                    alt={course.title}
                    width={300}
                    height={180}
                    className="h-56 w-full object-cover"
                  />
                  
                  {/* Level Tag */}
                  <div className="absolute top-3 left-3 ">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      course.level === 'Beginner' 
                        ? 'bg-purple-500 text-white' 
                        : course.level === 'Intermediate'
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}>
                      {course.level}
                    </span>
                  </div>

                  {/* Bookmark Icon */}
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-sm hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">4.8 (24)</span>
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {course.description || course.title}
                </p>

                {/* Duration, Shift and Students */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.shift === 'Morning' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : course.shift === 'Afternoon'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {course.shift}
                    </span>
                  </div>
                </div>

                {/* Price and Enroll Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-black">
                      {course.price === 0 ? 'Free' : `NPR ${course.price.toLocaleString()}`}
                    </span>
                    {course.originalPrice && course.originalPrice > course.price && (
                      <span className="text-sm text-gray-500 line-through">NPR {course.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button
                    className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(course, e);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Show Me More Button - Centered */}
        <div className="flex justify-center mt-8 relative">
          <motion.button
            onClick={() => setCurrentPage(1)}
            className="px-8 py-3 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300"
            style={{ backgroundColor: '#FB7F33' }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px rgba(251, 127, 51, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            Show me more
          </motion.button>
          
          {/* Small N Logo - Bottom Left */}
         
        </div>
      </div>

      </div>
    </div>
  );
};

export default CoursePage;

