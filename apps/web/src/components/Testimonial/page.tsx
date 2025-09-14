'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Your testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Anita Sharma',
    role: 'Bride, Wedding at Pokhara',
    content:
      "Mero Tasbir captured every emotion of our wedding day perfectly. The photos are stunning, and the highlight video brought tears to our eyes.",
    rating: 5,
    image: '/images/testimonial1.jpg',
  },
  {
    id: 2,
    name: 'Rajesh Karki',
    role: 'Student, Photography Course',
    content:
      "I joined Mero Tasbir's photography class with zero experience. In just 3 months, I learned composition, lighting, editing, and even got hands-on event shooting practice.",
    rating: 5,
    image: '/images/testimonial2.jpg',
  },
  {
    id: 3,
    name: 'Sunita Thapa',
    role: 'Event Organizer, Kathmandu',
    content:
      "We’ve hired Mero Tasbir for 5 corporate events now. Their team is always on time, unobtrusive, and delivers high-quality photos and videos within 48 hours.",
    rating: 5,
    image: '/images/testimonial3.jpg',
  },
];

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Customer Testimonials</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600">
          Real stories from couples, students, and clients who trust us.
        </p>
      </div>

      {/* Marquee Container */}
      <div
        className="relative mt-12 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Scroll Track - Left to Right */}
        <div
          className="flex animate-marquee-ltr whitespace-nowrap"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {/* Render twice for seamless loop */}
          {testimonials.concat(testimonials).map((testimonial) => (
            <div
              key={testimonial.id}
              className="mx-4 w-80 flex-shrink-0 rounded-xl border border-orange-500 bg-white p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="mb-4 text-sm italic text-gray-700 leading-relaxed text-wrap">
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="flex items-start space-x-3">
                {testimonial.image && (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 text-wrap">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}