"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, ShoppingBag, Users, BookOpen, Calendar, Heart } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  {
    id: "photographer-booking",
    title: "Photographer Booking",
    description: "Book professional photographers for your special events",
    icon: Camera,
    href: "/booking"
  },
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Buy and sell premium images and photography services",
    icon: ShoppingBag,
    href: "/marketplace"
  },
  {
    id: "freelancer",
    title: "Freelancer",
    description: "Connect with talented photographers and videographers",
    icon: Users,
    href: "/freelancer"
  },
  {
    id: "learning-hub",
    title: "Learning Hub",
    description: "Master photography and videography skills",
    icon: BookOpen,
    href: "/course"
  },
  {
    id: "events",
    title: "Events",
    description: "Discover and book photography for various events",
    icon: Calendar,
    href: "/events"
  },
  {
    id: "wedding",
    title: "Wedding",
    description: "Specialized wedding photography and videography",
    icon: Heart,
    href: "/wedding"
  }
];

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "-30px", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white rounded-t-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 30px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Choose Your Service</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">Select the service you&apos;d like to explore</p>
            </div>

            {/* Services Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <motion.a
                      key={service.id}
                      href={service.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative bg-white border border-gray-200 rounded-lg p-6 hover:border-orange-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                            <IconComponent className="w-6 h-6 text-orange-600" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                            {service.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex-shrink-0">
                          <motion.div
                            className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors duration-300"
                            initial={{ x: 0 }}
                            whileHover={{ x: 2 }}
                          >
                            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Can&apos;t find what you&apos;re looking for?{" "}
                  <a href="/contact" className="text-orange-600 hover:text-orange-700 font-medium">
                    Contact us
                  </a>{" "}
                  for custom services.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
