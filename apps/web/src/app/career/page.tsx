'use client';

import React, { useState } from 'react';

import Image from "next/image";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";


// Sample job data
const featuredJobs = [
  {
    id: 1,
    company: 'Mero Tasbir Creative Network',
    title: 'Photographer',
    location: 'Kathmandu, Nepal',
    daysLeft: 'Open Application',
    type: 'Freelance',
    schedule: 'Flexible',
    salary: 'NPR 25,000 - NPR 70,000 / month (project-based)',
    rating: 4.5,
    isSaved: false,
  },
  {
    id: 2,
    company: 'Mero Tasbir Creative Network',
    title: 'Videographer',
    location: 'Pokhara, Nepal',
    daysLeft: 'Open Application',
    type: 'Freelance',
    schedule: 'On-site & Remote',
    salary: 'NPR 30,000 - NPR 80,000 / month (event-based)',
    rating: 4.6,
    isSaved: false,
  },
  {
    id: 3,
    company: 'Mero Tasbir Creative Network',
    title: 'Video Editor',
    location: 'Remote (Nepal)',
    daysLeft: 'Open Application',
    type: 'Freelance',
    schedule: 'Remote',
    salary: 'NPR 20,000 - NPR 60,000 / month (per project or hourly)',
    rating: 4.4,
    isSaved: false,
  },
  {
    id: 4,
    company: 'Mero Tasbir Creative Network',
    title: 'VFX Artist',
    location: 'Biratnagar, Nepal',
    daysLeft: 'Open Application',
    type: 'Freelance',
    schedule: 'Remote',
    salary: 'NPR 35,000 - NPR 90,000 / month (based on complexity)',
    rating: 4.7,
    isSaved: false,
  },
  {
    id: 5,
    company: 'Mero Tasbir Studios',
    title: 'Podcast Set Technician',
    location: 'Lalitpur, Nepal',
    daysLeft: 'Open Application',
    type: 'Contract',
    schedule: 'Hybrid',
    salary: 'NPR 18,000 - NPR 40,000 / month + per booking bonus',
    rating: 4.2,
    isSaved: false,
  },
  {
    id: 6,
    company: 'Mero Tasbir Events',
    title: 'Event Management Coordinator',
    location: 'Kathmandu, Nepal',
    daysLeft: 'Open Application',
    type: 'Full-time / Part-time',
    schedule: 'On-site',
    salary: 'NPR 25,000 - NPR 50,000 / month',
    rating: 4.3,
    isSaved: false,
  }
];

// Job categories
const jobCategories = [
  { name: 'Photography', icon: '📸' },
  { name: 'Videography', icon: '🎥' },
  { name: 'Video Editing', icon: '✂️' },
  { name: 'VFX (Visual Effects)', icon: '✨' },
  { name: 'Podcast Set Booking', icon: '🎙️' },
  { name: 'Event Management', icon: '🎉' },
  { name: 'Creative Training & Courses', icon: '🎓' },
  { name: 'Equipment Rental', icon: '📽️' },
];


export default function CareerPage() {

    const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All Location');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query, location);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

<section className="relative h-[600px] overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/career-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Find The Job That Fits Your Life</h1>
            <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
We’re looking for people to join the team who are as excited as we are to help build the platform that empowers the future generation of creators to be successful online.            </p>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative rounded-lg border border-gray-300 bg-white p-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Job title, key words or company"
                    className="pl-6 pr-4 py-3 w-full text-black"
                  />
                </div>
                <div className="relative rounded-lg bg-white  p-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-6 pr-4 py-3 w-full text-black"
                  >
                    <option value="All Location">All Location</option>
                    <option value="Kathmandu">Kathmandu Valley</option>
                    <option value="Birgung">Birgung</option>
                    <option value="Pokhara">Pokhara</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-orange-600 px-6 py-3 text-white hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  Find Jobs
                </button>
              </div>
            </form>

            {/* Job Categories */}
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              {jobCategories.map((category) => (
                <div key={category.name} className="flex flex-col items-center space-y-2">
                  <div className="rounded-full bg-white/20 p-3 text-white">
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Side: Images */}
            <div className="space-y-4">
              <div className="h-90 w-150 relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/laptop_show.jpg"
                  alt="Photographer holding camera"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Side: Content */}
            <div>
              <h1 className="mb-4 text-3xl font-bold text-orange-500">
                JOIN OUT TEAM
              </h1>
              <p className="mb-6 leading-relaxed text-black">
                We’re looking for people to join the team who are as excited as
                we are to help build the platform that empowers the future
                generation of creators to be successful online.
              </p>
              <button className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                JOIN US
              </button>
            </div>
          </div>
        </div>
      </section>

     {/* Trusted By Section */}
<section className="bg-orange-500 py-12">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
    <p className="text-white mb-6">
      Empowering 1,000+ Creatives Across Nepal with Smarter Booking & Collaboration
    </p>
    <div className="flex flex-wrap justify-center gap-12">
      {[
        { name: 'Risma Motion Pictures', icon: 'risma' },
        { name: 'Kantipur Media Group', icon: 'kantipur' },
        { name: 'Image Studio', icon: 'image-studio' },
        { name: 'Lumbini Films', icon: 'lumbini-films' },
        { name: 'Himalaya VFX Lab', icon: 'himalaya-vfx' },
      ].map((partner) => (
        <div key={partner.name} className="flex items-center space-x-2">
          <div className="w-8 h-8">
            <Image 
              src={`/icons/${partner.icon}.svg`} 
              alt={partner.name} 
              width={32} 
              height={32} 
              className="invert" // Optional: helps white icons show clearly
            />
          </div>
          <span className="text-white font-medium">{partner.name}</span>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Featured Jobs */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">Featured Jobs</h2>
          <p className="mt-4 text-black">Find the right career opportunity for you</p>
        </div>

        <div className="mt-8 space-y-4">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className={`border border-gray-200 rounded-xl p-6 transition-all ${
                job.isSaved ? 'border-orange-500 bg-orange-50' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Image src="/icons/company.svg" alt="Company" width={24} height={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-black">{job.title}</h3>
                  </div>
                  <p className="text-sm text-black">{job.company}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    <span>{job.daysLeft}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{job.type}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{job.schedule}</span>
                    <div className="flex items-center gap-1">
                      {job.salary}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-700 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
