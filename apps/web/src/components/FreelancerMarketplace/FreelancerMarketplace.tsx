"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FreelancerMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", count: 24 },
    { id: "photography", name: "Photography", count: 12 },
    { id: "videography", name: "Videography", count: 8 },
    { id: "editing", name: "Editing", count: 4 }
  ];

  const images = [
    {
      id: 1,
      title: "Wedding Photography",
      category: "Photography",
      price: 3300,
      currency: "NPR",
      image: "/images/sun set.jpg",
      resolution: "4K",
      format: "JPG",
      downloads: 127,
      rating: 4.9,
      reviews: 89,
      photographer: "Rajesh Sharma",
      verified: true,
      featured: true
    },
    {
      id: 2,
      title: "Portrait Session",
      category: "Photography",
      price: 2000,
      currency: "NPR",
      image: "/images/photography.jpg",
      resolution: "4K",
      format: "JPG",
      downloads: 203,
      rating: 4.8,
      reviews: 156,
      photographer: "Priya Gurung",
      verified: true,
      featured: false
    },
    {
      id: 3,
      title: "Event Coverage",
      category: "Photography",
      price: 2650,
      currency: "NPR",
      image: "/images/event-management.jpg",
      resolution: "4K",
      format: "JPG",
      downloads: 94,
      rating: 4.7,
      reviews: 78,
      photographer: "Amit Thapa",
      verified: true,
      featured: false
    },
    {
      id: 4,
      title: "Commercial Shoot",
      category: "Photography",
      price: 4000,
      currency: "NPR",
      image: "/images/creative-shop.jpg",
      resolution: "4K",
      format: "JPG",
      downloads: 156,
      rating: 4.9,
      reviews: 127,
      photographer: "Sita Maharjan",
      verified: true,
      featured: true
    },
    {
      id: 5,
      title: "Drone Footage",
      category: "Videography",
      price: 5300,
      currency: "NPR",
      image: "/images/videography.jpeg",
      resolution: "4K",
      format: "MP4",
      downloads: 78,
      rating: 4.6,
      reviews: 45,
      photographer: "Bikram Singh",
      verified: false,
      featured: false
    },
    {
      id: 6,
      title: "Online Photography",
      category: "Photography",
      price: 2400,
      currency: "NPR",
      image: "/images/online-photography.jpg",
      resolution: "4K",
      format: "JPG",
      downloads: 203,
      rating: 4.8,
      reviews: 94,
      photographer: "Anita Tamang",
      verified: true,
      featured: false
    }
  ];

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(image => 
        image.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Marketplace Description */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-black max-w-4xl mx-auto leading-relaxed">
              Discover a marketplace where moments meet opportunities. Whether you&apos;re looking to purchase stunning, high-quality images for your projects or sell your own creative captures, our platform makes it simple, secure, and rewarding.
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Buy Premium
            <span className="block" style={{ color: '#FB7F33' }}>
              Images
            </span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Purchase high-quality photography and videography content. 
            Download instantly in 4K resolution for your projects.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'text-white'
                    : 'text-black hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? '#FB7F33' : 'transparent'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Featured Badge */}
              {image.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span 
                    className="px-3 py-1 text-xs font-semibold rounded-full text-white"
                    style={{ backgroundColor: '#FB7F33' }}
                  >
                    Featured
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={image.image}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Resolution Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                    {image.resolution}
                  </div>
                </div>

                {/* Download Count */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center text-white text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    {image.downloads}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
              
               
               

                {/* Image Details */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-black rounded-full">
                      {image.format}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-black rounded-full">
                      {image.resolution}
                    </span>
                    {image.verified && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-black">₨{image.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm"> {image.currency}</span>
                  </div>
                  <motion.button
                    className="px-6 py-2 text-white text-sm font-semibold rounded-full transition-all duration-300"
                    style={{ backgroundColor: '#FB7F33' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E06B2A'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FB7F33'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>
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
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-black mb-4">
              Sell Your Images
            </h3>
            <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
              Join our marketplace and start earning by selling your photography and videography content to buyers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#FB7F33' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E06B2A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FB7F33'}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(251, 127, 51, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Selling
              </motion.button>
              <motion.button
                className="px-8 py-4 text-black text-lg font-semibold rounded-full border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreelancerMarketplace;
