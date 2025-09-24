"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';

// Define course type to match API schema
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
    id?: string;
    title: string;
    duration: string;
    description?: string;
    lessons?: {
      id?: string;
      title: string;
      duration?: string;
      type?: 'video' | 'reading' | 'assignment' | 'quiz';
    }[];
  }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const CourseDetailPage: React.FC<{ params: Promise<{ id: string }> }> = ({ params }) => {
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [expandedCurriculum, setExpandedCurriculum] = useState<number | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Static courses array (same as in course page)
 

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

  // Find course by ID from static array
  useEffect(() => {
    const findCourse = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        const foundCourse = courses.find(c => c.id === resolvedParams.id);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setCourse(null);
        }
      } catch (err) {
        console.error('Error finding course:', err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    findCourse();
  }, [params]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-black">Loading course details...</p>
          <p className="text-sm text-black mt-2">Course ID: {course?.id}</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (!loading && !course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Course Not Found</h1>
          <p className="text-black mb-6">The course you are looking for does not exist.</p>
          <button 
            onClick={() => router.push('/course')}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `NPR ${price.toLocaleString()}`;
  };

  const handleAddToCart = () => {
    if (course) {
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
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Course not found</h2>
          <p className="text-black mb-6">The course you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/course')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/course')}
              className="flex items-center text-black hover:text-black transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-black hover:text-black rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="p-2 text-black hover:text-black rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video Preview */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Video Player */}
              <div className="relative bg-black">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-8xl text-white/30">🎓</div>
                  )}
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-2xl transform hover:scale-110">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <div className="flex items-center space-x-4 text-white">
                    <button className="hover:text-red-400 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                    <button className="hover:text-red-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </button>
                    <button className="hover:text-red-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </button>
                    <span className="text-sm font-medium">01:40</span>
                    <div className="flex-1 bg-white/30 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-sm font-medium">04:20</span>
                    <button className="hover:text-red-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                      </svg>
                    </button>
                    <button className="hover:text-red-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </button>
                    <button className="hover:text-red-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-black mb-4">{course.title}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-semibold">
                      {course.instructor.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-black">Instructor</p>
                    <p className="font-semibold text-black">{course.instructor}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-black">Duration</p>
                    <p className="font-semibold text-black">{course.duration}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-black">Level</p>
                    <p className="font-semibold capitalize text-black">{course.level}</p>
                  </div>
                </div>

                <p className="text-black leading-relaxed">{course.description}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Fixed Pricing & Actions */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-8"
            >
              {/* Pricing Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="text-4xl font-bold text-black">
                      {formatPrice(course.price)}
                    </span>
                    {course.originalPrice && (
                      <span className="text-xl text-black line-through">
                        {formatPrice(course.originalPrice)}
                      </span>
                    )}
                  </div>
                  {course.discount && (
                    <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                      {course.discount}% OFF
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Buy Now
                  </button>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-gray-100 text-black py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors border border-gray-300 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-black">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Lifetime access
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Certificate of completion
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      30-day money-back guarantee
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-black mb-4">Course Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-black">Duration</span>
                    <span className="font-medium text-black">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Level</span>
                    <span className="font-medium capitalize text-black">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Schedule</span>
                    <span className="font-medium text-black">{course.schedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Students</span>
                    <span className="font-medium text-black">1,234 enrolled</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - What You'll Learn & Prerequisites */}
          <div className="space-y-8">
            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What You&apos;ll Learn
                </h2>
                <p className="text-black">Master these essential skills and knowledge areas</p>
              </div>
              <div className="space-y-4">
                {course.whatYoullLearn.map((item, index) => (
                  <div key={index} className="flex items-start p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
                    <svg className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prerequisites */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Prerequisites
                </h2>
                <p className="text-black">What you need to know before starting this course</p>
              </div>
              <div className="space-y-4">
                {course.prerequisites.map((item, index) => (
                  <div key={index} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200">
                    <svg className="w-6 h-6 text-blue-500 mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Curriculum */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 h-full"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Course Curriculum
                </h2>
                <p className="text-black">Explore the comprehensive learning path</p>
              </div>

              <div className="space-y-4">
                {course.curriculum && course.curriculum.length > 0 ? (
                  course.curriculum.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 cursor-pointer hover:from-purple-100 hover:to-purple-200 transition-all duration-200"
                        onClick={() => setExpandedCurriculum(expandedCurriculum === moduleIndex ? null : moduleIndex)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4 font-semibold">
                              {moduleIndex + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-black">{module.title}</h3>
                              {expandedCurriculum === moduleIndex && (
                                <p className="text-sm text-black">{module.duration}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <svg 
                              className={`w-5 h-5 text-black transform transition-transform duration-200 ${
                                expandedCurriculum === moduleIndex ? 'rotate-180' : ''
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {module.description && (
                          <p className="text-sm text-black mt-2 ml-12">{module.description}</p>
                        )}
                      </div>
                      
                      {expandedCurriculum === moduleIndex && module.lessons && module.lessons.length > 0 && (
                        <div className="bg-white border-t border-gray-200">
                          <div className="p-4 space-y-3">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-center w-8 h-8 mr-4">
                                  {lesson.type === 'video' && (
                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  )}
                                  {lesson.type === 'reading' && (
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                  )}
                                  {lesson.type === 'assignment' && (
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  )}
                                  {lesson.type === 'quiz' && (
                                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  )}
                                  {!lesson.type && (
                                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-black">{lesson.title}</h4>
                                  {lesson.duration && (
                                    <p className="text-xs text-black">{lesson.duration}</p>
                                  )}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {lesson.type === 'video' && 'Video'}
                                  {lesson.type === 'reading' && 'Reading'}
                                  {lesson.type === 'assignment' && 'Assignment'}
                                  {lesson.type === 'quiz' && 'Quiz'}
                                  {!lesson.type && 'Lesson'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="text-lg font-medium text-black mb-2">Curriculum Coming Soon</h3>
                    <p className="text-black">The detailed curriculum for this course is being prepared.</p>
                  </div>
                )}
              </div>

              {/* Curriculum Summary */}
              {course.curriculum && course.curriculum.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-xl font-bold text-purple-600 mb-1">
                        {course.curriculum.length}
                      </div>
                      <div className="text-xs text-black">Modules</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-xl font-bold text-blue-600 mb-1">
                        {course.curriculum.reduce((total, module) => total + (module.lessons ? module.lessons.length : 0), 0)}
                      </div>
                      <div className="text-xs text-black">Lessons</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-xl font-bold text-green-600 mb-1">
                        {course.curriculum.reduce((total, module) => {
                          const videoLessons = module.lessons ? module.lessons.filter(lesson => lesson.type === 'video').length : 0;
                          return total + videoLessons;
                        }, 0)}
                      </div>
                      <div className="text-xs text-black">Videos</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Rating Section - Full Width Below */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Course Rating
              </h2>
              <p className="text-black">What students are saying about this course</p>
            </div>
            
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="flex text-yellow-400 text-4xl mr-4">
                  ★★★★☆
                </div>
                <div className="text-left">
                  <div className="text-4xl font-bold text-black">4.0</div>
                  <div className="text-black">out of 5.0</div>
                </div>
              </div>
              <p className="text-black">Based on 8 student ratings</p>
            </div>

            {/* Rating Breakdown */}
            <div className="max-w-md mx-auto">
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <span className="text-sm font-medium text-black w-8">{rating}</span>
                    <svg className="w-4 h-4 text-yellow-400 mx-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${rating === 5 ? 75 : rating === 4 ? 25 : rating === 3 ? 0 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-black w-8 text-right">
                      {rating === 5 ? '6' : rating === 4 ? '2' : '0'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-black">Enroll in Course</h3>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-black mb-2">{course.title}</p>
                <div className="text-2xl font-bold" style={{ color: '#E08E45' }}>
                  {formatPrice(course.price)}
                </div>
              </div>
              
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold" style={{ color: '#E08E45' }}>
                  {formatPrice(course.price)}
                </span>
              </div>
              
              <button
                onClick={() => {
                  // Handle enrollment logic here
                  alert('Enrollment functionality coming soon!');
                  setIsBookingModalOpen(false);
                }}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Complete Enrollment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;