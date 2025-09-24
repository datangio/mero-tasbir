'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

// Sample data for trending images
const trendingImages = [
  {
    id: 1,
    src: '/images/trending1.jpg',
    alt: 'AI Art - Fantasy Woman',
    title: 'Wonderful fantasy world',
    price: 'Free',
  },
  {
    id: 2,
    src: '/images/trending2.jpg',
    alt: 'AI Art - Nature Portrait',
    title: 'Natural beauty',
    price: 'Free',
  },
  {
    id: 3,
    src: '/images/trending3.jpg',
    alt: 'AI Art - Floral Portrait',
    title: 'Floral dream',
    price: 'Free',
  },
];

// Sample data for theme collections
const themeCollections = [
  {
    id: 1,
    src: '/images/theme1.jpg',
    alt: 'Reimagine Creativity',
    title: 'Reimagine Creativity',
    price: '240',
    tag: 'New',
  },
  {
    id: 2,
    src: '/images/theme2.jpg',
    alt: 'Instant Art',
    title: 'Instant Art',
    price: '230',
    tag: 'Free',
  },
  {
    id: 3,
    src: '/images/theme3.jpg',
    alt: 'Turn Thoughts Into Art',
    title: 'Turn Thoughts Into Art',
    price: '640',
    tag: 'Pro',
  },
  {
    id: 4,
    src: '/images/theme4.jpg',
    alt: 'Instant Images',
    title: 'Instant Images',
    price: '450',
    tag: 'Free',
  },
];

export default function PhotoGallery() {
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);

  const nextTrending = () => {
    setCurrentTrendingIndex((prev) => (prev + 1) % trendingImages.length);
  };

  const prevTrending = () => {
    setCurrentTrendingIndex((prev) => (prev - 1 + trendingImages.length) % trendingImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Trending Now */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Trending Now</h2>
            <div className="flex space-x-2">
              <button
                onClick={prevTrending}
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTrending}
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex animate-scroll whitespace-nowrap"
              style={{
                transform: `translateX(-${currentTrendingIndex * 100}%)`,
              }}
            >
              {trendingImages.map((image) => (
                <div key={image.id} className="flex-shrink-0 w-32 mx-2">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={128}
                    height={128}
                    className="rounded-lg object-cover"
                  />
                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-800">{image.title}</p>
                    <span className="inline-block rounded-full bg-orange-600 px-2 py-1 text-xs text-gray-700">
                      {image.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="mb-12">
          <div className="bg-gray-600 rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div>
                <h3 className="text-2xl font-bold text-orange-700">50% Off Storewide</h3>
                <p className="text-purple-200">Buy 4, Get 1 Free!</p>
                <p className="text-purple-200 text-sm mt-2">Unbeatable Savings</p>
                <button className="mt-4 rounded-lg bg-orange-600 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-purple-700 transition-colors">
                  Limited time event
                </button>
              </div>
              <div className="flex-1">
                <Image
                  src="/images/promo.jpg"
                  alt="Promo"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Theme Collections */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Theme Collections</h2>
            <div className="flex items-center space-x-2">
              <select className="rounded-full  px-3 py-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="all">All</option>
                <option value="trending">Trending</option>
                <option value="portrait">Portrait</option>
                <option value="natural">Natural</option>
                <option value="fashion">Fashion</option>
                <option value="outdoor">Outdoor</option>
                <option value="artistic">Artistic</option>
                <option value="sport">Sport</option>
              </select>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search AI photos"
                  className="rounded-full px-4 py-2 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {themeCollections.map((collection) => (
              <div
                key={collection.id}
                className="rounded-xl bg-gray-800 p-4 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={collection.src}
                    alt={collection.alt}
                    width={300}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 rounded-lg bg-black/30 opacity-0 hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-2 left-2">
                    <span className="rounded-full bg-green-400 px-2 py-1 text-xs text-gray-700">
                      {collection.tag}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-medium text-orange-700">{collection.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-yellow-400">${collection.price}</span>
                    <button className="rounded-full bg-orange-500 px-3 py-1 text-xs text-gray-700 hover:bg-orange-700 transition-colors">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}