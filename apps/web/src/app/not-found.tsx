"use client";

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-[Inter] p-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-orange-600 tracking-wider animate-bounce">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="mt-8">
          <Link href="/" className="inline-block px-6 py-3 text-sm font-medium text-white bg-orange-600 rounded-full shadow-lg transition-transform hover:bg-orange-700 hover:scale-105">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
