
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Carousel data with images and content
const carouselItems = [
  {
    id: 1,
    image: "/images/Img.png",
    alt: "Videography services in Nepal",
    tags: [
      { label: "Videography", color: "bg-red-100 text-red-700" },
      { label: "Photography", color: "bg-green-100 text-green-700" }
    ],
    title: "Hire Nepal's Best Photographers & Videographers",
    description: "Professional services for all your creative needs"
  },
  {
    id: 2,
    image: "/images/creative-shop.jpg",
    alt: "Professional photo shoot session",
    tags: [
      { label: "Portrait", color: "bg-blue-100 text-blue-700" },
      { label: "Studio", color: "bg-purple-100 text-purple-700" }
    ],
    title: "Professional Studio Photography",
    description: "High-quality portrait and studio sessions"
  },
  {
    id: 3,
    image: "/images/bento-grid-1.jpg",
    alt: "Wedding and event photography",
    tags: [
      { label: "Wedding", color: "bg-pink-100 text-pink-700" },
      { label: "Events", color: "bg-orange-100 text-orange-700" }
    ],
    title: "Wedding & Event Photography",
    description: "Capture your special moments perfectly"
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-0 pb-16 sm:px-6 lg:px-8">
      <div className="relative h-[700px] overflow-hidden rounded-2xl shadow-xl">
        {/* Background Images */}
        <AnimatePresence >
          <motion.div
            key={currentIndex}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={carouselItems[currentIndex]?.image || ''}
              alt={carouselItems[currentIndex]?.alt || ''}
              fill
              className="object-cover"
              priority={currentIndex === 0}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute ml-10 bottom-5 inset-0 flex items-center justify-start p-6 md:p-10">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-lg rounded-2xl bg-white/70 p-6 shadow-xl backdrop-blur-sm"
          >
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {carouselItems[currentIndex]?.tags?.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${tag.color}`}
                >
                  {tag.label}
                </motion.span>
              ))}
            </div>

            {/* Title */}
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl font-bold text-black md:text-3xl mb-2"
            >
              {carouselItems[currentIndex]?.title || ''}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-black mb-4"
            >
              {carouselItems[currentIndex]?.description || ''}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="px-6 py-2 text-white text-sm font-semibold rounded-full transition-all duration-300"
              style={{ backgroundColor: '#FB7F33' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E06B2A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FB7F33'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-black shadow-md hover:bg-white focus:outline-none focus:ring-2 transition-all duration-300"
          style={{ '--tw-ring-color': '#FB7F33' } as React.CSSProperties}
          type="button"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-black shadow-md hover:bg-white focus:outline-none focus:ring-2 transition-all duration-300"
          style={{ '--tw-ring-color': '#FB7F33' } as React.CSSProperties}
          type="button"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 text-black shadow-md hover:bg-white transition-all duration-300"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};

export default ImageCarousel;
