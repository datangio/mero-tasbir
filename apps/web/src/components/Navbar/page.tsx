"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/icons/logo.svg"
              alt="Mero Tasbir Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            {/* <span className="ml-2 text-xl font-bold text-gray-900">Mero Tasbir</span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden space-x-8 md:flex">
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-orange-500"
            >
              Home
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-500"
            >
              Services
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-500"
            >
              Learning Hub
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-500"
            >
              Marketplace
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-500"
            >
              For Freelancer
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-500"
            >
              Career
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-500"
            >
              Contact Us
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" aria-label="Shopping Cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 transition-colors hover:text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10a2 2 0 002-2V5.42a2 2 0 00-.56-1.41l-5.4-5.4A2 2 0 0012.9 3H3m0 0v12a2 2 0 002 2h6a2 2 0 002-2V3"
                />
              </svg>
            </a>
            <a href="#" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 transition-colors hover:text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </a>
            <a href="#" aria-label="Profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 transition-colors hover:text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </a>
            <button className="rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Get Rented
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-orange-500 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-500"
              >
                Home
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-orange-500"
              >
                Services
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-orange-500"
              >
                Learning Hub
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-orange-500"
              >
                Marketplace
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-orange-500"
              >
                For Freelancer
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-orange-500"
              >
                Career
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-orange-500"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
