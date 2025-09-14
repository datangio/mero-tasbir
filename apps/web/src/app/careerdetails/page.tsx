'use client';

import React, { useState } from 'react';

import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

// Sample job data
const job = {
  title: 'Digital Content Creator',
  location: 'Sydney',
  type: 'Permanent / Full Time',
  posted: 'About 4 days ago',
  description: `
    Ready to transform your creativity into captivating content?

    We're searching for a Digital Content Creator to join our energetic team! If you're passionate about storytelling, social media trends, and all things visual, this is your moment to shine ✨

    🌟 What You'll Do:
    - Craft engaging short-form videos and visual content for Instagram, TikTok, and YouTube
    - Collaborate with our marketing team to brainstorm and develop innovative campaign ideas
    - Write compelling, attention-grabbing captions and scripts
    - Analyze performance metrics to optimize reach and engagement
    - Ensure brand consistency across all platforms

    ✅ What You'll Need:
    - A strong flair for design and storytelling
    - Experience with editing tools like Canva, CapCut, or Premiere Pro
    - Up-to-date knowledge of social media trends and best practices
    - A self-starter attitude with excellent time management skills
    - A sense of humor and a love for memes is a huge plus 😄

    💡 What You'll Get:
    - Freedom to create and experiment
    - Work remotely with a fun, friendly, and ambitious team
    - Flexible hours and wellness days
    - Real growth opportunities – we want to help you level up!
  `,
  tags: ['Canva', 'CapCut', 'caption writing', 'performance metrics', 'Premiere Pro', 'script writing'],
};

export default function CareerDetails() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: null,
    coverNote: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Applying:', formData);
    // In production, send to API
  };

  return (
        <div className="min-h-screen bg-white">
          {/* Navbar */}
          <Navbar />
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">


      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Side: Job Details */}
        <div className="md:col-span-2">
          <div className="mb-6 flex items-center space-x-4 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{job.location}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{job.type}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{job.posted}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Apply Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Apply for this job:</h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+977 XXXX XXXX"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                  Resume *
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".doc,.docx,.pdf,.ppt,.pptx"
                  onChange={handleFileChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">.doc, .docx, .pdf, .ppt, .pptx</p>
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                  Cover letter
                </label>
                <input
                  type="file"
                  id="coverLetter"
                  name="coverLetter"
                  accept=".doc,.docx,.pdf,.ppt,.pptx"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">.doc, .docx, .pdf, .ppt, .pptx</p>
              </div>

              <div>
                <label htmlFor="coverNote" className="block text-sm font-medium text-gray-700 mb-1">
                  Cover note
                </label>
                <textarea
                  id="coverNote"
                  name="coverNote"
                  value={formData.coverNote}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us why you're the perfect fit for this role..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 transition-colors font-medium"
              >
                APPLY NOW
              </button>

              
            </div>
          </form>
        </div>
      </div>

      
    </section>
            <Footer />

    </div>
  );
}