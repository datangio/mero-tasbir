"use client";

import React, { useState } from "react";
import Image from "next/image";

// ✅ Use string paths from public/images/
const heroImages = [
  { src: "/images/Img.png", alt: "Videography services in Nepal" },
  { src: "/images/creative-shop.jpg", alt: "Professional photo shoot session" },
  { src: "/images/hero3.jpg", alt: "Wedding and event photography" },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-xl">
        {/* ✅ Use string path directly */}
        <Image
          src={
            heroImages[currentIndex]?.src || "/images/default-placeholder.jpg"
          }
          alt={heroImages[currentIndex]?.alt || "Hero image"}
          fill
          className="object-cover transition-opacity duration-700 ease-in-out"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-start p-6 md:p-10">
          <div className="w-full max-w-lg rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                Videography
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Photography
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Hire Nepal's Best Photographers & Videographers
            </h1>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-gray-700 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          onClick={nextImage}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-gray-700 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
      </div>
    </section>
  );
};

export default HeroSection;
