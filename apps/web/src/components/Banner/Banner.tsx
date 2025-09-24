"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Banner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-orange-500 py-2 mb-10"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Banner Text */}
          <div className="text-center sm:text-left">
            <h2 className="text-lg md:text-xl font-bold text-white">
             30% off on Wedding Photographer
            </h2>
          </div>
          
          {/* Book Now Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/booking"
              className="inline-flex items-center px-6 py-2 bg-white text-orange-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Book Now
              <svg 
                className="ml-2 w-4 h-4" 
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
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
