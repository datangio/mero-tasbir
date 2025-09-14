'use client';

import React from 'react';

export default function EventPackages() {
  const packages = [
    {
      name: 'Basic',
      price: 'Rs. 15,000',
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
    },
    {
      name: 'Standard',
      price: 'Rs. 25,000',
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
      buttonColor: 'bg-orange-500 hover:bg-orange-600 text-white',
      borderColor: 'border-2 border-orange-500',
      isPopular: true,
    },
    {
      name: 'Premium',
      price: 'Rs. 40,000',
      description: 'Complete experience for large events',
      features: [
        '12+ hours of coverage (full day)',
        '3 Photographers + 1 Videographer',
        '1000+ edited photos + 3-minute cinematic video',
        'Same-day teaser video',
        'Photo book (20 pages)',
        'Drone shots (weather permitting)',
        'Priority editing (within 3 days)',
        'Travel anywhere in Nepal included',
      ],
      buttonText: 'Book Premium Package',
      buttonColor: 'bg-gray-800 hover:bg-gray-900 text-white',
      borderColor: 'border border-gray-200',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Event Photography Packages</h1>
        <p className="mt-4 text-lg text-gray-600">
          Capture every moment of your special event with our professional photography services.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
              pkg.borderColor
            } ${
              pkg.isPopular ? 'transform scale-105' : ''
            } 
            hover:scale-105 hover:shadow-xl focus:outline-none focus:ring focus:ring-orange-500`}
            tabIndex={0} // Makes it focusable for keyboard users
          >
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
              {pkg.isPopular && (
                <span className="mt-1 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                  Most Popular
                </span>
              )}
              <p className="mt-2 text-sm text-gray-600">{pkg.description}</p>
              <div className="mt-4">
                <span className="text-3xl text-orange-500 font-bold">{pkg.price}</span>
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
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${pkg.buttonColor}`}
            >
              {pkg.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">Can I customize my package?</h3>
            <p className="mt-1 text-gray-600">Yes! We offer fully customizable packages based on your event needs.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">How soon will I receive the photos?</h3>
            <p className="mt-1 text-gray-600">Delivery time varies by package — from same-day teasers to 7 days for full edits.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Do you travel outside Kathmandu?</h3>
            <p className="mt-1 text-gray-600">Yes, we cover all locations in Nepal. Travel fees may apply for remote areas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}