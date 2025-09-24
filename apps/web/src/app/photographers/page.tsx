'use client';

import React from 'react';
import Image from 'next/image';

// Sample data for photographers
type Photographer = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  image: string;
  promotion?: string; // Optional
};

const photographers: Photographer[] = [
  {
    id: 1,
    name: 'Videocrafts',
    rating: 5.0,
    reviews: 7,
    location: 'Sector 9, Chandigarh',
    price: '₹1,25,000',
    image: '/images/photographer1.jpg',
    promotion: 'Early bird',
  },
  {
    id: 2,
    name: 'Central Studio',
    rating: 4.8,
    reviews: 12,
    location: 'Salem City, Salem',
    price: '₹50,000',
    image: '/images/photographer2.jpg',
  },
  // ... others
];

export default function PhotographersPage() {

  const nextSlide = () => {
    // Navigation logic
  };

  const prevSlide = () => {
    // Navigation logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative h-[300px] overflow-hidden rounded-xl shadow-lg">
          <Image
            src="/images/wedding-hero.jpg"
            alt="Wedding photography"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-start p-6 md:p-10">
            <div className="w-full max-w-md rounded-xl bg-white/90 backdrop-blur-sm p-6 shadow-xl">
              <h1 className="text-2xl font-bold text-gray-900">Wedding photographers</h1>
              <p className="mt-2 text-gray-700">
                Discover the top photographers near you who will immortalise your wedding&apos;s most precious moments.
              </p>
              <button className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors">
                Find photographers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Photographer Cards */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel */}
          <div className="flex space-x-4 overflow-x-auto pb-6 scroll-smooth">
            {photographers.map((photo) => (
              <div
                key={photo.id}
                className="flex-shrink-0 w-72 rounded-xl border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={photo.image}
                    alt={photo.name}
                    width={288}
                    height={192}
                    className="h-full w-full object-cover"
                  />
                  <button
                    className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-gray-600 hover:bg-white focus:outline-none"
                    aria-label="Save"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{photo.name}</h3>
                  <div className="mt-1 flex items-center text-xs text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="ml-1">{photo.rating} ({photo.reviews})</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{photo.location}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="ml-1">From {photo.price}</span>
                  </div>
                  {photo.promotion && (
                    <div className="mt-1 flex items-center text-xs text-orange-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="ml-1">{photo.promotion} promotion</span>
                    </div>
                  )}
                  <button className="mt-4 block w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors">
                    REQUEST PRICING
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}