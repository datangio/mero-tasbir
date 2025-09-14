"use client";

import React, { useState } from "react";
import Image from "next/image";

// Define course type
interface Course {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  time: string;
  tags: string[];
  image: string;
}

const CoursePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  // Sample course data
  const courses: Course[] = [
    {
      id: 1,
      title: "Full Photography & Videography Course",
      subtitle: "Morning & Evening",
      duration: "3.5 Months",
      time: "Morning & Evening",
      tags: ["Videography", "Photography"],
      image: "/images/photography.jpg",
    },
    {
      id: 2,
      title: "Basic VFX Course",
      subtitle: "Morning & Evening",
      duration: "3 Months",
      time: "Morning & Evening",
      tags: ["VFX"],
      image: "/images/v1.jpg",
    },
    {
      id: 3,
      title: "Video and Photo Editing Course",
      subtitle: "Evening",
      duration: "3 Months",
      time: "Evening",
      tags: ["Editing"],
      image: "/images/a1.jpg",
    },
    {
      id: 4,
      title: "Basic To Advanced Photography Course",
      subtitle: "Morning",
      duration: "1 Month",
      time: "Morning",
      tags: ["Photography"],
      image: "/images/online-photography.jpg",
    },
    {
      id: 5,
      title: "Drone Photography & Filmmaking",
      subtitle: "Weekend",
      duration: "2 Months",
      time: "Weekend",
      tags: ["Videography", "Drone"],
      image: "/images/camera-scaled.jpg",
    },
    {
      id: 6,
      title: "Portrait Photography Masterclass",
      subtitle: "Evening",
      duration: "1.5 Months",
      time: "Evening",
      tags: ["Photography"],
      image: "/images/camera-scaled.jpg",
    },
    {
      id: 7,
      title: "Professional Video Editing",
      subtitle: "Morning",
      duration: "2 Months",
      time: "Morning",
      tags: ["Editing", "Videography"],
      image: "/images/camera-scaled.jpg",
    },
    {
      id: 8,
      title: "Creative Storytelling with Camera",
      subtitle: "Weekend",
      duration: "3 Months",
      time: "Weekend",
      tags: ["Videography", "Storytelling"],
      image: "/images/camera-scaled.jpg",
    },
  ];

  // Pagination logic
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="mt-2 text-gray-600">
            Learn to take amazing photos, shoot professional videos, and edit
            like a pro!
          </p>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex items-center justify-between">
          {/* Left Side: Text */}
          <div className="flex-shrink-0"></div>

          {/* Right Side: Page Number & Arrows */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="border rounded-full p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
              className="border rounded-full p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {currentCourses.map(course => (
          <div
            key={course.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-transform hover:shadow-md"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={180}
                className="h-48 w-full object-cover"
              />
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1">
              {course.tags.map(tag => (
                <span
                  key={tag}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    tag === "Videography"
                      ? "bg-red-100 text-red-700"
                      : tag === "Photography"
                        ? "bg-green-100 text-green-700"
                        : tag === "Editing"
                          ? "bg-blue-100 text-blue-700"
                          : tag === "VFX"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="mt-2 text-lg font-semibold text-gray-900">
              {course.title}
            </h3>

            {/* Subtitle */}
            <p className="mt-1 text-sm text-gray-600">{course.subtitle}</p>

            {/* Duration */}
            <p className="mt-1 text-xs text-gray-500">• {course.duration}</p>

            {/* Bookmark Button */}
            <button
              className="mt-3 flex items-center justify-end text-gray-400 transition-colors hover:text-gray-600"
              aria-label="Save course"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v14l-5-2.5L5 19V5z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="mt-8 flex justify-center">
        <button
          className="rounded-lg bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          onClick={() => setCurrentPage(1)}
        >
          Show me more
        </button>
      </div>
    </div>
  );
};

export default CoursePage;
