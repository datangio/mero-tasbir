"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLearningHubOpen, setIsLearningHubOpen] = useState(false);

  // Toggle Learning Hub menu on click
  const toggleLearningHub = () => {
    setIsLearningHubOpen(!isLearningHubOpen);
  };

  // Close when clicking outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (!e.currentTarget.contains(e.target as Node)) {
      setIsLearningHubOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
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
          </div>

          {/* Desktop Navigation */}
          <div className="hidden space-x-8 md:flex">
            {[
              { label: "Home", href: "/" },
              { label: "Service", href: "/services" },
              { label: "Marketplace", href: "/marketplace" },
              { label: "For Freelancer", href: "/freelancer" },
              { label: "Career", href: "/career" },
              { label: "Contact Us", href: "/contact" },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-orange-500"
              >
                {item.label}
              </a>
            ))}

            {/* Learning Hub with Dropdown */}
            <div
              className="group relative"
              onMouseEnter={() => setIsLearningHubOpen(true)}
              onMouseLeave={() => setIsLearningHubOpen(false)}
              onClick={toggleLearningHub}
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isLearningHubOpen}
            >
              <button
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isLearningHubOpen ? "text-orange-500" : "text-gray-700"
                }`}
              >
                Learning Hub
              </button>

              {/* Full-Width Dropdown */}
              <div
                className={`absolute left-0 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-in-out ${
                  isLearningHubOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                }`}
                style={{ top: "100%" }}
                onClick={e => e.stopPropagation()} // Prevent closing on click
              >
                <div className="grid grid-cols-2 gap-6 p-6">
                  <div>
                    <h3 className="font-semibold text-gray-900">Photography</h3>
                    <ul className="mt-2 space-y-1">
                      <li>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-orange-500"
                        >
                          Portrait
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-orange-500"
                        >
                          Wedding
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-orange-500"
                        >
                          Event
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Videography</h3>
                    <ul className="mt-2 space-y-1">
                      <li>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-orange-500"
                        >
                          Cinematic
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-orange-500"
                        >
                          Event
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-orange-500"
                        >
                          Editing
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Icons & CTA */}
            <div className="flex items-center space-x-4">
              <a
                href="#cart"
                aria-label="Shopping Cart"
                className="rounded p-1 text-gray-600 transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.327 2H1.75v2h1.389l3.339 11.687A2.5 2.5 0 008.88 17.5h8.988a2.5 2.5 0 002.403-1.813l2.475-8.662a1 1 0 00-.961-1.275H5.719l-.71-2.48A1.75 1.75 0 003.328 2zm5.074 13.137L6.29 7.75h14.17l-2.11 7.387a.5.5 0 01-.482.363H8.882a.5.5 0 01-.48-.363z"
                    fill="#0F0F0F"
                  />
                  <path
                    d="M8.5 21.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.25 21.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    fill="#0F0F0F"
                  />
                </svg>
              </a>

              <a
                href="#search"
                aria-label="Search"
                className="rounded p-1 text-gray-600 transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

              <a
                href="#profile"
                aria-label="Profile"
                className="rounded p-1 text-gray-600 transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

              <button
                className="rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Get Rented"
              >
                Get Rented
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded p-1 text-gray-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
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
          <div
            id="mobile-menu"
            className="border-t border-gray-200 bg-white md:hidden"
            role="menu"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {[
                "Home",
                "Service",
                "Marketplace",
                "For Freelancer",
                "Career",
                "Contact Us",
                "Learning Hub",
              ].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  role="menuitem"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
