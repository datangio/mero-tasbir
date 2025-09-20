import React, { useState } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  handle: string;
  testimonial: string;
  profileImage: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aavash Ganeju",
    handle: "@theaavashh",
    testimonial:
      "Mero Tasbir captured our wedding day perfectly! Every moment was beautifully preserved and the photos exceeded our expectations.",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Anil Nhemafuki",
    handle: "@anilnhemafuki_",
    testimonial:
      "Professional, creative, and incredibly talented. Mero Tasbir made our special day even more memorable with stunning photography.",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Pawan Bhattarai",
    handle: "@iampawan",
    testimonial:
      "From engagement to wedding, Mero Tasbir documented our journey beautifully. Highly recommended for any special occasion!",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 4,
    name: "Alish Prajapati",
    handle: "@alishprajapati",
    testimonial:
      "The attention to detail and artistic vision of Mero Tasbir is unmatched. Our wedding photos are absolutely breathtaking.",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 5,
    name: "Abhishek Prajapati",
    handle: "@weabhishek",
    testimonial:
      "Mero Tasbir made our wedding day stress-free and captured every precious moment. The photos tell our love story perfectly.",
    profileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 6,
    name: "Ankit Shrestha",
    handle: "@thatankit",
    testimonial:
      "Outstanding photography service! Mero Tasbir's team was professional, creative, and delivered exactly what we envisioned.",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = testimonials.length - itemsPerPage + 1;

  const nextPage = () => {
    setCurrentIndex(prev => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <motion.div
      className="w-full bg-gray-50 px-8 py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center justify-between">
          <motion.h2
            className="title-regular text-4xl font-bold text-gray-900 md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            What Our Clients Say
          </motion.h2>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
            >
              <svg
                className="h-6 w-6 text-gray-600"
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
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
            >
              <svg
                className="h-6 w-6 text-gray-600"
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

        <div className="relative">
          {/* Testimonials Grid */}
          <div className="overflow-hidden px-8">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * (100 / itemsPerPage) + "%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map(testimonial => (
                <motion.div
                  key={testimonial.id}
                  className="flex-shrink-0 rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                  style={{
                    width: `calc(${100 / itemsPerPage}% - ${(6 * 16) / itemsPerPage}px)`,
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 overflow-hidden rounded-full">
                        <img
                          src={testimonial.profileImage}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.handle}
                    </p>
                  </div>

                  <p className="leading-relaxed text-gray-700">
                    "{testimonial.testimonial}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 overflow-hidden rounded-full bg-gray-200">
              <motion.div
                className="h-full rounded-full bg-orange-500"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentIndex + 1) / totalPages) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
