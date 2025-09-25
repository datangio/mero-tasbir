'use client';

import React from 'react';
import Image from 'next/image';

import Footer from '../../components/Footer/page';

// Services offered by Mero Tasbir
const services = [
  {
    id: 1,
    title: 'Photography',
    description: 'Book professional photographers for weddings, Pasni, receptions, and personal events across Nepal.',
    icon: '📸',
  },
  {
    id: 2,
    title: 'Videography',
    description: 'Hire skilled videographers to capture cinematic moments of your special occasions.',
    icon: '🎥',
  },
  {
    id: 3,
    title: 'Video Editing & VFX',
    description: 'Get expert editing and visual effects to turn raw footage into stunning stories.',
    icon: '✂️',
  },
  {
    id: 4,
    title: 'Podcast Set Booking',
    description: 'Reserve fully equipped podcast studios for high-quality audio and video recordings.',
    icon: '🎙️',
  },
  {
    id: 5,
    title: 'Event Management',
    description: 'End-to-end planning and execution for cultural, social, and corporate events.',
    icon: '🎉',
  },
  {
    id: 6,
    title: 'Equipment Rental',
    description: 'Rent cameras, lights, drones, and audio gear from verified freelancers nationwide.',
    icon: '📷',
  },
];

// Stats data aligned with Mero Tasbir vision
const stats = [
  { value: '1,000+', label: 'Creative Professionals Connected' },
  { value: '50,000+', label: 'Events Booked Across Nepal' },
  { value: '98%', label: 'Client Satisfaction Rate' },
];

// Process steps for using Mero Tasbir
const processSteps = [
  {
    title: 'Sign Up & Browse',
    description: 'Create your free Mero Tasbir account. Explore top-rated photographers, videographers, and services near you.',
    icon: '👤',
  },
  {
    title: 'Send Booking Request',
    description: 'Choose a service, check availability, and send a booking request with secure payment via Khalti.',
    icon: '📅',
  },
  {
    title: 'Collaborate & Capture',
    description: 'Work directly with creatives to bring your vision to life — from wedding shoots to podcast sessions.',
    icon: '✨',
  },
];

export default function Service() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Left Side: Text */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Creative Services Made Easy
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Mero Tasbir connects you with Nepal’s best photographers, videographers, editors, and event experts. 
              From weddings to podcasts, find trusted professionals and book them seamlessly — all in one place.
            </p>
            <button className="mt-8 rounded-lg bg-orange-600 px-6 py-3 text-white hover:bg-orange-700 transition-colors">
              Get Started →
            </button>
          </div>

          {/* Right Side: Image */}
          <div className="w-full md:w-1/2">
            <Image
              src="/images/Banner.webp"
              alt="Mero Tasbir - Photography & Videography Platform"
              width={600}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 text-orange-600 mb-4">
                <span className="text-xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Strengths */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left: Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Empowering Creatives, Simplifying Access</h2>
            <p className="text-gray-600">
              Mero Tasbir bridges the gap between clients and Nepal’s talented media professionals. We make it easy to discover, book, and collaborate — while helping freelancers grow their careers.
            </p>
          </div>

          {/* Middle: Testimonial */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-sm text-gray-600">(5.0 Rating)</span>
            </div>
            <p className="text-gray-600 text-center mb-4">
              “Found an amazing photographer for my sister’s wedding in just 2 days. The booking was smooth and payment secure with Khalti. Highly recommend!”
            </p>
            <div className="flex items-center space-x-3">
              <Image
                src="/images/testimonial-user.jpg"
                alt="Bikash K."
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">Bikash K.</p>
                <p className="text-sm text-gray-600">Client, Kathmandu</p>
              </div>
            </div>
          </div>

          {/* Right: Chart Illustration */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Growth Since Launch</h3>
            <p className="text-gray-600 mb-4">Rapid adoption across Nepal’s creative community.</p>
            <div className="relative h-40 w-full">
              <svg viewBox="0 0 400 120" className="absolute inset-0">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.3" /> {/* Orange gradient */}
                    <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Line graph simulating growth */}
                <path
                  d="M0,100 L50,90 L100,70 L150,60 L200,40 L250,30 L300,20 L350,15 L400,10"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2"
                />
                <path
                  d="M0,100 L50,90 L100,70 L150,60 L200,40 L250,30 L300,20 L350,15 L400,10"
                  fill="url(#gradient)"
                />
                <circle cx="400" cy="10" r="4" fill="#F97316" />
                <text x="400" y="5" fontSize="12" fill="#F97316" textAnchor="middle">↑ 1K+ Users</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 rounded-lg bg-white p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600">
                <span className="text-xl">
                  {index === 0 && '🧑‍🎨'}
                  {index === 1 && '📅'}
                  {index === 2 && '⭐'}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">How Mero Tasbir Works</h2>
        <p className="text-center text-gray-600 mb-12">
          A simple, seamless experience for clients and creatives alike.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm border-l-4 border-orange-500"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                <span className="text-xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}