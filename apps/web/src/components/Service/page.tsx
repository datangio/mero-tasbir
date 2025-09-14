"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ServiceCard {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  image: string;
}

const ServiceCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const services: ServiceCard[] = [
  {
    id: 1,
    title: "Photography",
    subtitle: "Wedding, events, portraits",
    color: "bg-amber-500", // Warm golden tone for photography
    image: "/images/photography.jpg",
  },
  {
    id: 2,
    title: "Videography",
    subtitle: "Cinematic coverage for weddings, events & ceremonies",
    color: "bg-blue-600", // Deep blue for cinematic/video feel
    image: "/images/videography.jpeg",
  },
  {
    id: 3,
    title: "Video Editing",
    subtitle: "Professional editing for events, reels & promotional content",
    color: "bg-purple-600", // Purple for creative post-production
    image: "/images/video-editing.jpg",
  },
  {
    id: 4,
    title: "VFX (Visual Effects)",
    subtitle: "Creative visual effects for films, ads & digital content",
    color: "bg-pink-600", // Vibrant pink/magenta for high-impact VFX
    image: "/images/vfx.jpeg",
  },
  {
    id: 5,
    title: "Podcast Set Booking",
    subtitle: "Book professional podcast studios with full production setup",
    color: "bg-green-500", // Fresh green for audio/content creation
    image: "/images/podcast-set.jpeg",
  },
  {
    id: 6,
    title: "Event Management Services",
    subtitle: "End-to-end planning for weddings, receptions, Pasni & more",
    color: "bg-orange-600", // Energetic orange for dynamic event planning
    image: "/images/event-management.jpg",
  }
];

  const cardWidth = 384; // 24rem = 384px

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, services.length]);

  // Touch swipe handling
  const startX = useRef<number | null>(null);
  const scrollLeft = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);

    // ✅ Check if touches exist AND has at least one touch
    const touch = e.touches[0];
    if (!touch) return;

    startX.current = touch.pageX;
    scrollLeft.current = carouselRef.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX.current || !scrollLeft.current) return;

    // ✅ Always check for touch availability
    const touch = e.touches[0];
    if (!touch) return;

    const x = touch.pageX;
    const walk = (x - startX.current) * 1.5;

    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX.current) return;

    const threshold = cardWidth / 3;
    const currentScroll = carouselRef.current?.scrollLeft || 0;
    const moved = startX.current - currentScroll;

    if (moved > threshold) {
      setCurrentIndex(prev => (prev - 1 + services.length) % services.length);
    } else if (moved < -threshold) {
      setCurrentIndex(prev => (prev + 1) % services.length);
    }

    // Reset
    startX.current = null;
    scrollLeft.current = null;
    setTimeout(() => setIsPaused(false), 100);
  };

  // Scroll to keep current card in view
  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = currentIndex * cardWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex, cardWidth]);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + services.length) % services.length);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % services.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Carousel Container */}
      <div className="relative rounded-lg">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth rounded-3xl pb-6"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {services.map(service => (
            <div
              key={service.id}
              className="w-96 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="flex h-full">
                {/* Text Section */}
                <div
                  className={`${service.color} flex w-1/2 flex-col justify-center rounded-bl-2xl rounded-tl-2xl p-5 text-white`}
                >
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <p className="mt-1 text-sm opacity-90">{service.subtitle}</p>
                  <button
                    type="button"
                    className="mt-3 self-start rounded-lg bg-white px-3 py-1 text-xs font-medium text-gray-800 transition-colors hover:bg-gray-100"
                  >
                    Book now
                  </button>
                </div>

                {/* Image Section */}
                <div className="w-1/2 overflow-hidden rounded-br-2xl rounded-tr-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={192}
                    height={128}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

export default ServiceCarousel;
