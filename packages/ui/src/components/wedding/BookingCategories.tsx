"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Heart, Camera, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: "wedding",
    title: "Wedding",
    description: "Capture your special day with beautiful wedding photography",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    hoverColor: "hover:from-pink-600 hover:to-rose-600"
  },
  {
    id: "pasni",
    title: "Pasni",
    description: "Celebrate your child's first rice feeding ceremony",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Sparkles,
    color: "from-blue-500 to-cyan-500",
    hoverColor: "hover:from-blue-600 hover:to-cyan-600"
  },
  {
    id: "event",
    title: "Event",
    description: "Professional photography for all your special events",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Calendar,
    color: "from-purple-500 to-indigo-500",
    hoverColor: "hover:from-purple-600 hover:to-indigo-600"
  },
  {
    id: "anniversary",
    title: "Anniversary",
    description: "Mark your milestones with memorable anniversary photos",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Camera,
    color: "from-orange-500 to-yellow-500",
    hoverColor: "hover:from-orange-600 hover:to-yellow-600"
  }
];

interface BookingCategoriesProps {
  onCategorySelect?: (categoryId: string) => void;
}

export const BookingCategories: React.FC<BookingCategoriesProps> = ({ 
  onCategorySelect 
}) => {
 
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Calculate scroll amount based on screen size
      const scrollAmount = window.innerWidth < 640 ? 304 : 384; // w-72 + gap-4 = 304px, w-80 + gap-6 = 384px
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Calculate scroll amount based on screen size
      const scrollAmount = window.innerWidth < 640 ? 304 : 384; // w-72 + gap-4 = 304px, w-80 + gap-6 = 384px
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full bg-white px-4 sm:px-8 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          {/* Left Side - Title and Description */}
          <motion.div
            className="mb-6 sm:mb-8 lg:mb-0 lg:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Choose Your Photography
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Select the type of photography service that best fits your needs
            </p>
          </motion.div>

          {/* Right Side - Scrollable Categories */}
          <div className="lg:w-2/3">
            {/* Navigation Buttons */}
            <div className="mb-4 sm:mb-6 flex items-center justify-end gap-2 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollLeft}
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollRight}
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.button>
            </div>

            <div 
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer flex-shrink-0 w-72 sm:w-80 md:w-96"
                onClick={() => onCategorySelect?.(category.id)}
              >
                <div className="relative overflow-hidden rounded-2xl group-hover:rounded-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Image - Takes most of the space */}
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-2xl"
                    />
                    {/* Subtle overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content - Compact at bottom */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-700 mb-2">
                      {category.title}
                    </h3>
                    <a 
                      href="#" 
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle view gallery action
                      }}
                    >
                      View Gallery
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
            </div>
          </div>
        </div>

       

      
      </div>
    </div>
  );
};
