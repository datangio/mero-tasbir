'use client';

import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate subscription
    console.log('Subscribing:', email);
    setIsSubmitted(true);
    setError(null); // Clear error on success

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left Side: Text */}
        <div className="w-full max-w-lg text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Professional{' '}
            <span className="text-orange-700">Photography Solutions</span>{' '}
            for You
          </h2>
        </div>

        {/* Right Side: Form */}
        <div className="w-full max-w-md">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Subscribe to Our Newsletter</h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null); // Clear error as user types
              }}
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
              required
            />
            <button
              type="submit"
              disabled={isSubmitted}
              className="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70 transition-colors"
            >
              {isSubmitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <p className="mt-2 text-sm text-orange-600 animate-fade-in">
              Thank you for subscribing!
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p className="mt-2 text-sm text-red-600 animate-fade-in">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}