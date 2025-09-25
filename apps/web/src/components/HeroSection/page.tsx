
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ServiceModal } from "../ServiceModal";

const HeroSection = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const handleExploreServices = () => {
    setIsServiceModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsServiceModalOpen(false);
  };

  return (
    <section className="relative py-5  overflow-hidden">
      {/* Background Pattern */}
       <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='40' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div> 

      <div className="relative mx-auto max-w-7xl px-4 pt-0 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Nepal's #1 
              <span className="block text-orange-500">
                Media Event Platform
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-black mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From photography and videography to catering and equipment rental. 
              Buy and sell premium images, book event services, and access everything 
              you need for your special occasions in one platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={handleExploreServices}
                className="w-full sm:w-fit px-8 py-4 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 bg-orange-500"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(224, 142, 69, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Services
              </motion.button>

              <motion.button
                className="w-full sm:w-fit px-8 py-4 text-black text-lg font-semibold rounded-full border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Marketplace
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 grid grid-cols-3 gap-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div>
                <div className="text-3xl font-bold text-black">10K+</div>
                <div className="text-sm text-black">Images Sold</div>
            </div>
              <div>
                <div className="text-3xl font-bold text-black">500+</div>
                <div className="text-sm text-black">Events Booked</div>
          </div>
              <div>
                <div className="text-3xl font-bold text-black">4.9★</div>
                <div className="text-sm text-black">Platform Rating</div>
        </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/photography.jpg"
                  alt="Professional Photography"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <svg className="w-6 h-6" style={{ color: '#E08E45' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
                </motion.div>

                <motion.div
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="text-sm font-semibold text-black">Premium Images</div>
                  <div className="text-xs text-black">Available Now</div>
                </motion.div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-black">Live Now</span>
                </div>
                <div className="text-xs text-black mt-1">Catering Service</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold text-black">500+</div>
                <div className="text-xs text-black">Equipment Items</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
};

export default HeroSection;
