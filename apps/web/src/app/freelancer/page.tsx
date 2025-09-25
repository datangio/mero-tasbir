'use client'; // ←← This line makes it a Client Component

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from "../../components/Footer/page";


const FreelancerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 text-center">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Empower Your Creative Career
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join Nepal’s #1 platform for photographers & videographers. Showcase your work, get booked, rent gear, and grow with training — all in one place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/signup">
            <button className="px-8 py-4 bg-[#E08E45] hover:bg-[#D07A3A] text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Become a Freelancer
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features for Freelancers */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What You Can Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Create Your Profile',
                desc: 'Showcase your portfolio, set rates, and highlight your expertise.',
              },
              {
                title: 'Get Booked Easily',
                desc: 'Clients can browse your packages and book you directly.',
              },
              {
                title: 'Sell & Rent Gear',
                desc: 'List cameras, lenses, or offer equipment rentals.',
              },
              {
                title: 'Find Jobs',
                desc: 'Browse and apply for local photography & videography gigs.',
              },
              {
                title: 'Learn & Improve',
                desc: 'Access free editing tutorials and skill-building resources.',
              },
              {
                title: 'Get Paid Securely',
                desc: 'Receive payments via Khalti — fast, safe, and hassle-free.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Grow?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Start getting discovered, booked, and paid — all through Mero Tasbir.
          </p>
          <Link href="/signup">
            <button className="px-8 py-4 bg-[#FB7F33] hover:bg-[#E06B2A] text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Sign Up as Freelancer
            </button>
          </Link>
        </motion.div>
      </section>

        <Footer />
      
    </div>
  );
};

export default FreelancerPage;