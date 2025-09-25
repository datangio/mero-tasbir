"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BookingModal from '../BookingModal/BookingModal';
import MenuModal from '../MenuModal/MenuModal';

interface Package {
  name: string;
  originalPrice: string;
  price: string;
  discount: string;
  description?: string;
  features: string[];
  popular: boolean;
  type: 'photography' | 'catering' | 'equipment' | 'custom';
}

export default function CateringPackages() {
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const packages: Package[] = [
    {
      name: 'Basic Catering',
      originalPrice: 'NPR 15,000',
      price: 'NPR 12,000',
      discount: '20% OFF',
      features: [
        'Up to 50 guests',
        'Basic menu selection',
        'Buffet style service',
        'Basic table setup',
        '2 staff members',
        'Cleanup included'
      ],
      popular: false,
      type: 'catering'
    },
    {
      name: 'Premium Catering',
      originalPrice: 'NPR 25,000',
      price: 'NPR 20,000',
      discount: '20% OFF',
      features: [
        'Up to 100 guests',
        'Premium menu selection',
        'Plated service option',
        'Elegant table setup',
        '4 staff members',
        'Full cleanup service',
        'Menu customization'
      ],
      popular: true,
      type: 'catering'
    },
    {
      name: 'Luxury Catering',
      originalPrice: 'NPR 40,000',
      price: 'NPR 32,000',
      discount: '20% OFF',
      features: [
        'Up to 200 guests',
        'Gourmet menu selection',
        'Multiple service styles',
        'Premium table decor',
        '6 staff members',
        'Complete event management',
        'Custom menu design',
        'Wine pairing options'
      ],
      popular: false,
      type: 'catering'
    }
  ];

  const additionalPackages = [
    {
      icon: '🍽️',
      title: 'Corporate Events',
      description: 'Professional catering for business meetings, conferences, and corporate gatherings.',
      price: 'NPR 8,000',
      features: ['Coffee breaks', 'Lunch service', 'Professional setup']
    },
    {
      icon: '🎂',
      title: 'Birthday Parties',
      description: 'Fun and delicious catering for birthday celebrations of all ages.',
      price: 'NPR 6,000',
      features: ['Custom cake', 'Party snacks', 'Decorations']
    },
    {
      icon: '💒',
      title: 'Wedding Catering',
      description: 'Complete wedding catering services with traditional and modern options.',
      price: 'NPR 50,000',
      features: ['Multi-course meals', 'Traditional dishes', 'Wedding cake']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Catering Packages Highlight Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Catering
              <span className="block" style={{ color: '#FB7F33' }}>Packages</span>
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Delicious food and professional service for your special events. From intimate gatherings to grand celebrations.
            </p>
          </motion.div>
        </div>

        {/* Main Catering Packages */}
        <div 
  className="flex justify-center items-center gap-6 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 " 
  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
>
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl shadow-lg overflow-hidden ${
                pkg.popular ? 'ring-2 ring-orange-500' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-black mb-2">{pkg.name}</h3>
                  
                  {/* Pricing with strikethrough */}
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-sm text-gray-500 line-through">{pkg.originalPrice}</span>
                    <span className="text-xs font-bold px-2 py-1 rounded-full text-white" 
                          style={{ backgroundColor: '#FB7F33' }}>
                      {pkg.discount}
                    </span>
                  </div>
                  <span className="text-3xl font-bold" style={{ color: '#FB7F33' }}>
                    {pkg.price}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-black">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setIsBookingModalOpen(true);
                  }}
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? 'text-white'
                      : 'text-orange-500 border-2 border-orange-500 hover:bg-orange-500'
                  }`}
                  style={{ 
                    backgroundColor: pkg.popular ? '#FB7F33' : 'transparent'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Choose Plan
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Discover Other Catering Packages */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Discover Other Catering Services</h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Explore our additional catering services tailored for different occasions and events.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalPackages.map((pkg, index) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{pkg.icon}</div>
                <h3 className="text-xl font-bold text-black mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="space-y-2 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-black">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold" style={{ color: '#FB7F33' }}>
                    {pkg.price}
                  </span>
                  <motion.button
                    onClick={() => router.push('/events')}
                    className="px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Available Menus Section */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center"
          >
            <div className="text-6xl mb-6">🍽️</div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              View All Available
              <span className="block" style={{ color: '#FB7F33' }}>Menus</span>
            </h2>
            <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
              Explore our complete menu collection featuring traditional Nepali cuisine, international dishes, 
              and custom options for every taste and dietary requirement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🥘</div>
                <h3 className="text-lg font-semibold text-black mb-2">Traditional Nepali</h3>
                <p className="text-sm text-gray-600">Dal Bhat, Momo, Newari Cuisine</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🍕</div>
                <h3 className="text-lg font-semibold text-black mb-2">International</h3>
                <p className="text-sm text-gray-600">Continental, Asian, Fusion</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌱</div>
                <h3 className="text-lg font-semibold text-black mb-2">Special Diets</h3>
                <p className="text-sm text-gray-600">Vegetarian, Vegan, Gluten-free</p>
              </div>
            </div>
            <motion.button
              onClick={() => setIsMenuModalOpen(true)}
              className="px-8 py-4 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300"
              style={{ backgroundColor: '#FB7F33' }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px rgba(251, 127, 51, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Browse All Menus
            </motion.button>
          </motion.div>
        </div>

        {/* Equipment Rental Section */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <div className="text-6xl mb-6">🎤</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional
              <span className="block" style={{ color: '#FB7F33' }}>Equipment Rental</span>
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Complete your event with our professional audio-visual equipment, lighting, 
              sound systems, and photography gear. Everything you need for a perfect event.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🎵</div>
                <h3 className="text-lg font-semibold mb-2">Sound Systems</h3>
                <p className="text-sm opacity-80">Professional audio equipment</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="text-lg font-semibold mb-2">Lighting</h3>
                <p className="text-sm opacity-80">Stage and ambient lighting</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📹</div>
                <h3 className="text-lg font-semibold mb-2">Video Equipment</h3>
                <p className="text-sm opacity-80">Cameras and projectors</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🪑</div>
                <h3 className="text-lg font-semibold mb-2">Furniture</h3>
                <p className="text-sm opacity-80">Tables, chairs, and decor</p>
              </div>
            </div>
            <motion.a
              href="/events"
              className="inline-block px-8 py-4 text-black text-lg font-semibold rounded-full shadow-lg transition-all duration-300"
              style={{ backgroundColor: '#FB7F33' }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px rgba(251, 127, 51, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Rent Equipment Now
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        packageDetails={selectedPackage}
      />

      {/* Menu Modal */}
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </section>
  );
}
