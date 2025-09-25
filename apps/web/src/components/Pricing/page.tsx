'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BookingModal from '../BookingModal/BookingModal';

interface Package {
  name: string;
  originalPrice: string;
  price: string;
  discount: string;
  description?: string;
  features: string[];
  popular?: boolean;
  type: 'photography' | 'catering' | 'equipment' | 'custom';
  buttonText?: string;
  buttonColor?: string;
  borderColor?: string;
  isPopular?: boolean;
}

export default function EventPackages() {
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const packages: Package[] = [
    {
      name: 'Basic',
      originalPrice: 'NPR 20,000',
      price: 'NPR 15,000',
      discount: '25% OFF',
      description: 'Perfect for small events and gatherings',
      features: [
        '4 hours of coverage',
        '1 Photographer',
        '300+ edited high-resolution photos',
        'Digital delivery within 7 days',
        'Online gallery access',
        'Travel within city included',
      ],
      buttonText: 'Book Basic Package',
      buttonColor: 'bg-gray-800 hover:bg-gray-900 text-white',
      borderColor: 'border border-gray-200',
      type: 'photography',
    },
    {
      name: 'Standard',
      originalPrice: 'NPR 35,000',
      price: 'NPR 25,000',
      discount: '30% OFF',
      description: 'Most popular choice for weddings & parties',
      features: [
        '8 hours of coverage',
        '2 Photographers',
        '600+ edited high-resolution photos + 5-min highlight video',
        'Digital delivery within 5 days',
        'Online gallery with download rights',
        'Pre-wedding shoot (1 hour)',
        'Travel within 50 km included',
      ],
      buttonText: 'Book Standard Package',
      buttonColor: 'text-white',
      borderColor: 'border-2',
      isPopular: true,
      type: 'photography',
    },
    {
      name: 'Premium',
      originalPrice: 'NPR 60,000',
      price: 'NPR 40,000',
      discount: '35% OFF',
      description: 'Complete experience for large events',
      features: [
        '12+ hours of coverage (full day)',
        '3 Photographers + 1 Videographer',
        '1000+ edited photos + 3-minute cinematic video',
        'Same-day teaser video',
        'Photo book (20 pages)',
        'Drone shots (weather permitting)',
        'Priority editing (within 3 days)',
      ],
      buttonText: 'Book Premium Package',
      buttonColor: 'bg-gray-800 hover:bg-gray-900 text-white',
      borderColor: 'border border-gray-200',
      type: 'photography',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-black">“Every love story we capture is unique — and the next unforgettable one could be yours.”</h1>
        <h4 className='text-lg text-black mt-10'>Discover the perfect photography package for your special event.</h4>
        
      </div>

      {/* Event Photography Packages Highlight Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Wedding Photography
            <span className="block" style={{ color: '#FB7F33' }}>
              Packages
            </span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Choose the perfect photography package for your special event. 
            Professional coverage tailored to your needs and budget.
          </p>
        </motion.div>
      </div>

      <div 
  className="flex justify-center items-center gap-6 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 pt-4" 
  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
>
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 shadow-lg transition-all duration-300 flex-shrink-0 w-80 md:w-auto ${
              pkg.borderColor
            } ${
              pkg.isPopular ? 'transform scale-105' : ''
            } 
            hover:scale-105 hover:shadow-xl focus:outline-none focus:ring`}
            style={{ 
              borderColor: pkg.isPopular ? '#FB7F33' : '#E5E7EB',
              '--tw-ring-color': '#FB7F33'
            } as React.CSSProperties}
            tabIndex={0} // Makes it focusable for keyboard users
          >
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-black">{pkg.name}</h3>
              {pkg.isPopular && (
                <span className="mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: 'rgba(251, 127, 51, 0.1)', color: '#E06B2A' }}>
                  Most Popular
                </span>
              )}
              <p className="mt-2 text-sm text-black">{pkg.description}</p>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-sm text-gray-500 line-through">
                    {pkg.originalPrice}
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#FB7F33' }}>
                    {pkg.discount}
                  </span>
                </div>
                <span className="text-3xl font-bold" style={{ color: '#FB7F33' }}>
                  {pkg.price}
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-green-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-black">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => {
                setSelectedPackage(pkg);
                setIsBookingModalOpen(true);
              }}
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${pkg.buttonColor}`}
              style={{ 
                backgroundColor: pkg.isPopular ? '#FB7F33' : '#1F2937',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = pkg.isPopular ? '#E06B2A' : '#111827';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = pkg.isPopular ? '#FB7F33' : '#1F2937';
              }}
            >
              {pkg.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Discover Other Packages Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">Discover Other Packages</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Explore our additional photography and videography services tailored for different occasions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weaving Photography */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Weaving Photography</h3>
            <p className="text-gray-600 mb-4">Complete weaving coverage with party photography.</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold" style={{ color: '#FB7F33' }}>NPR 20,000</span>
              <button 
                onClick={() => router.push('/booking')}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-orange-600 transition-colors" 
                style={{ backgroundColor: '#FB7F33' }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Corporate Events */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Corporate Events</h3>
            <p className="text-gray-600 mb-4">Professional coverage for conferences, meetings, and corporate gatherings.</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold" style={{ color: '#FB7F33' }}>NPR 30,000</span>
              <button 
                onClick={() => router.push('/booking')}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-orange-600 transition-colors" 
                style={{ backgroundColor: '#FB7F33' }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Portrait Sessions */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Portrait Sessions</h3>
            <p className="text-gray-600 mb-4">Professional headshots and personal portrait photography sessions.</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold" style={{ color: '#FB7F33' }}>NPR 8,000</span>
              <button 
                onClick={() => router.push('/booking')}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-orange-600 transition-colors" 
                style={{ backgroundColor: '#FB7F33' }}
              >
                Learn More
              </button>
            </div>
          </div>
          
          {/* Video Production */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Video Production</h3>
            <p className="text-gray-600 mb-4">Cinematic video production for events and promotional content.</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold" style={{ color: '#FB7F33' }}>NPR 35,000</span>
              <button 
                onClick={() => router.push('/booking')}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-orange-600 transition-colors" 
                style={{ backgroundColor: '#FB7F33' }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Custom Package */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-lg border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-orange-200 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Custom Package</h3>
            <p className="text-gray-600 mb-4">Tailored photography and videography solutions for your specific needs.</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold" style={{ color: '#FB7F33' }}>Quote</span>
              <button 
                onClick={() => router.push('/booking')}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-orange-600 transition-colors" 
                style={{ backgroundColor: '#FB7F33' }}
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        packageDetails={selectedPackage}
      />
    </div>
  );
}