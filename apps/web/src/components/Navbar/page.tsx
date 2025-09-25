"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, AlignLeft, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartModal from "../CartModal/CartModal";
import SignupModal from "../SignupModal/SignupForm";
import { useRouter } from "next/navigation"; // For App Router

import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const [isModalOpen, setIsSignupOpen] = useState(false);


  // Toggle Service menu on click
  const toggleService = () => {
    setIsServiceOpen(!isServiceOpen);
  };
  const toggleLearning = () => {
    setIsLearningOpen(!isLearningOpen);
  };

  const router = useRouter();

  // Close mobile menu after navigation
  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsServiceOpen(false);
    setIsLearningOpen(false);
  };
  // Toggle Search bar
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus on search input when opening
      setTimeout(() => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Add your search logic here
      // For now, just close the search bar
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const services = [
    { name: "Photography", href: "/booking" },
    { name: "Videography", href: "/events" },
  ];

  const courses = [
    { name: "Photography", href: "/photography" },
    { name: "Videography", href: "/videography" },
    { name: "VFX Editing", href: "/vfx" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center">
          {/* Mobile Hamburger Menu Button - Left Side */}
          <div className="mr-2 flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hamburger-menu rounded p-1 text-black hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <AlignLeft className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}

          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/MeroTasbir-logo.png"
                alt="Mero Tasbir Logo"
                width={120}
                height={120}
                className="h-24 w-24 cursor-pointer lg:h-28 lg:w-28"
                priority
              />
            </Link>
          </div>

          {/* Spacer to push right side icons to the right */}
          <div className="flex-1"></div>

          {/* Desktop Navigation */}
          {/* CORRECTED: ADDED `items-center` CLASS HERE */}
          <div className="nav-item relative hidden items-center space-x-5 text-black xl:space-x-3 lg:flex">
            {/* 1. Home */}
            <a
              href="/"
              className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black transition-colors hover:text-orange-500 xl:text-base"
              onMouseEnter={e => (e.currentTarget.style.color = "#FB7F33")}
              onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
            >
              Home
            </a>

            {/* 2. Service Dropdown */}
            {/* CORRECTED: REMOVED `inline-block` HERE, ADDED `self-center` to fix misalignment*/}
            <div
              className="group relative self-center"
              onMouseEnter={() => setIsServiceOpen(true)}
              onMouseLeave={() => setIsServiceOpen(false)}
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isServiceOpen}
            >
              {/* Main Services Link */}
              <a
                href="/services" // Fallback for SEO & non-JS
                className={`whitespace-nowrap px-2 py-2 text-sm font-medium transition-colors xl:text-base ${
                  isServiceOpen ? "text-orange-500" : "text-black"
                }`}
                style={{ color: isServiceOpen ? "#FB7F33" : "#000000" }}
                onClick={e => {
                  e.preventDefault();
                  router.push("/services");
                }}
              >
                Services
              </a>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 top-full z-50 rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-in-out ${
                  isServiceOpen
                    ? "visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-2 opacity-0"
                }`}
                onMouseLeave={() => setIsServiceOpen(false)}
              >
                <div className="min-w-[200px] py-2">
                  {services.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-black transition-colors hover:bg-gray-100 hover:text-orange-500"
                      style={{ color: "#000000" }}
                      onClick={e => {
                        e.preventDefault();
                        router.push(item.href);
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = "#FB7F33";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = "#000000";
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Marketplace */}
            <a
              href="/marketplace"
              className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black transition-colors hover:text-orange-500 xl:text-base"
              onMouseEnter={e => (e.currentTarget.style.color = "#FB7F33")}
              onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
            >
              Marketplace
            </a>

            {/* 4. Learning Hub Dropdown */}
            {/* CORRECTED: REMOVED `mt-1.5` AND `inline-block` HERE, ADDED `self-center` */}
            <div
              className="group relative self-center"
              onMouseEnter={() => setIsLearningOpen(true)}
              onMouseLeave={() => setIsLearningOpen(false)}
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isLearningOpen}
            >
              <a
                href="/course"
                className={`whitespace-nowrap px-2 py-2 text-sm font-medium transition-colors xl:text-base ${
                  isLearningOpen ? "text-orange-500" : "text-black"
                }`}
                style={{ color: isLearningOpen ? "#FB7F33" : "#000000" }}
                onClick={e => {
                  e.preventDefault();
                  router.push("/course");
                }}
              >
                Learning Hub
              </a>

              <div
                className={`absolute left-0 top-full z-50 rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-in-out ${
                  isLearningOpen
                    ? "visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-2 opacity-0"
                }`}
                onMouseLeave={() => setIsLearningOpen(false)}
              >
                <div className="min-w-[200px] py-2">
                  {courses.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-black transition-colors hover:bg-gray-100 hover:text-orange-500"
                      style={{ color: "#000000" }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = "#FB7F33";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = "#000000";
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Career */}
            <a
              href="/career"
              className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black transition-colors hover:text-orange-500 xl:text-base"
              onMouseEnter={e => (e.currentTarget.style.color = "#FB7F33")}
              onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
            >
              Career
            </a>

            {/* 6. Contact Us */}
            <a
              href="/contact"
              className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black transition-colors hover:text-orange-500 xl:text-base"
              onMouseEnter={e => (e.currentTarget.style.color = "#FB7F33")}
              onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
            >
              Contact Us
            </a>
          </div>

          {/* Desktop Icons & CTA */}
          <div className="nav-item ml-6 hidden items-center space-x-2 xl:space-x-3">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative rounded p-1 text-black transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleSearch}
              aria-label="Search"
              className="rounded p-1 text-black transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <Search className="h-6 w-6" />
            </button>

            <a
              href="/auth"
              aria-label="Profile"
              className="rounded p-1 text-black transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <User className="h-6 w-6" />
            </a>

            {/* For Freelancer Button */}

            <button
              onClick={() => setIsSignupOpen(true)}
              className="whitespace-nowrap rounded-full bg-orange-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 xl:text-base"
            >
              For Freelancer
            </button>
            <SignupModal
              isOpen={isModalOpen}
              onClose={() => setIsSignupOpen(false)}
            />
          </div>

          {/* Mobile Navigation - Right Side Icons */}
          <div className="mobile-nav-icons flex items-center space-x-2 lg:hidden">
            {/* Search Button */}
            <button
              onClick={toggleSearch}
              aria-label="Search"
              className="rounded p-1 text-black transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative rounded p-1 text-black transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* User Button */}
            <a
              href="/auth"
              aria-label="Profile"
              className="rounded p-1 text-black transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <User className="h-6 w-6" />
            </a>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                role="dialog"
                aria-modal="true"
              >
                {/* Top Bar */}
                <div className="flex h-20 items-center justify-between border-b border-gray-200 px-4">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded p-1 text-black hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>

                  <Link
                    href="/"
                    onClick={handleNavClick}
                    className="flex items-center"
                  >
                    <Image
                      src="/images/MeroTasbir-logo.png"
                      alt="Mero Tasbir Logo"
                      width={120}
                      height={120}
                      className="h-24 w-24"
                    />
                  </Link>

                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                  >
                    For Freelancer
                  </button>
                </div>

                {/* Scrollable Menu */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  {/* Main Links */}
                  <div className="space-y-1">
                    {[
                      { label: "Home", href: "/" },
                      { label: "Marketplace", href: "/marketplace" },
                      { label: "Career", href: "/career" },
                      { label: "Contact Us", href: "/contact" },
                    ].map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={handleNavClick}
                        className="block rounded-md px-3 py-3 text-lg font-medium text-black hover:bg-gray-100 hover:text-orange-500"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        {item.label}
                      </motion.a>
                    ))}

                    {/* Services Accordion */}
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={toggleService}
                        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-lg font-medium text-black hover:bg-gray-100"
                      >
                        <span>Services</span>
                        <svg
                          className={`h-5 w-5 transform transition-transform ${isServiceOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {isServiceOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-6 space-y-1 border-l-2 border-gray-200 pl-4">
                              {services.map((item, idx) => (
                                <motion.a
                                  key={item.name}
                                  href={item.href}
                                  onClick={handleNavClick}
                                  className="block rounded-md py-2 text-base text-black hover:bg-gray-100 hover:text-orange-500"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                  {item.name}
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Learning Hub Accordion */}
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={toggleLearning}
                        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-lg font-medium text-black hover:bg-gray-100"
                      >
                        <span>Learning Hub</span>
                        <svg
                          className={`h-5 w-5 transform transition-transform ${isLearningOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {isLearningOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-6 space-y-1 border-l-2 border-gray-200 pl-4">
                              {courses.map((item, idx) => (
                                <motion.a
                                  key={item.name}
                                  href={item.href}
                                  onClick={handleNavClick}
                                  className="block rounded-md py-2 text-base text-black hover:bg-gray-100 hover:text-orange-500"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                  {item.name}
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Bar Overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-0 right-0 top-full z-50 border-b border-gray-200 bg-white shadow-lg"
              >
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center space-x-4"
                  >
                    <div className="relative flex-1">
                      <input
                        id="search-input"
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search for photographers, videographers, services..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-base text-black transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 transition-colors hover:text-orange-500"
                      >
                        <Search className="h-5 w-5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="px-4 py-3 text-gray-500 transition-colors hover:text-gray-700"
                      aria-label="Close search"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </form>

                  {/* Quick Search Suggestions */}
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-black">Popular searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Wedding Photography",
                        "Event Videography",
                        "Portrait Photography",
                        "Corporate Events",
                        "Drone Photography",
                      ].map(suggestion => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            // Focus back on input
                            setTimeout(() => {
                              const searchInput =
                                document.getElementById("search-input");
                              if (searchInput) searchInput.focus();
                            }, 100);
                          }}
                          className="rounded-full bg-gray-100 px-3 py-1 text-sm text-black transition-colors hover:bg-orange-100 hover:text-orange-700"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cart Modal */}
          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>
    </nav>
  );
}