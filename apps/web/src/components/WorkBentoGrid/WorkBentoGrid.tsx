"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const WorkBentoGrid = () => {
  const workItems = [
    {
      id: 1,
      image: "/images/bento-grid-1.jpg",
      size: "large"
    },
    {
      id: 2,
      image: "/images/bento-grid-2.jpg",
      size: "medium"
    },
    {
      id: 3,
      image: "/images/bento-grid-3.jpg",
      size: "small"
    },
    {
      id: 4,
      image: "/images/bento-grid-4.jpg",
      size: "medium"
    },
    {
      id: 5,
      image: "/images/bento-grid-5.jpg",
      size: "small"
    },
    {
      id: 6,
      image: "/images/bento-grid-2.jpg",
      size: "large"
    },
    {
      id: 7,
      image: "/images/bento-grid-3.jpg",
      size: "small"
    },
    {
      id: 8,
      image: "/images/bento-grid-5.jpg",
      size: "small"
    }
  ];

  const getGridClasses = (size: string) => {
    const baseClasses = "relative overflow-hidden rounded-2xl group cursor-pointer";
    
    switch (size) {
      case "large":
        return `${baseClasses} col-span-2 row-span-2 md:col-span-2 md:row-span-2`;
      case "medium":
        return `${baseClasses} col-span-1 row-span-2 md:col-span-1 md:row-span-2`;
      case "small":
        return `${baseClasses} col-span-1 row-span-1 md:col-span-1 md:row-span-1`;
      default:
        return `${baseClasses} col-span-1 row-span-1 md:col-span-1 md:row-span-1`;
    }
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Our Captured
            <span className="block text-orange-500">
            Moments
            </span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
          Step into a collection of timeless moments and artistic storytelling. From candid emotions to cinematic visuals, our portfolio reflects the passion and creativity we bring to every project.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[240px] md:auto-rows-[300px]">
          {workItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={getGridClasses(item.size)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={item.image}
                alt={`Work ${item.id}`}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300"
            style={{ backgroundColor: '#E08E45' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D07A3A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E08E45'}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(224, 142, 69, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Memories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkBentoGrid;
