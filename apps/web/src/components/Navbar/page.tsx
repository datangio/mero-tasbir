"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, AlignLeft, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartModal from "../CartModal/CartModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLearningHubOpen, setIsLearningHubOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();

  // Toggle Learning Hub menu on click
  const toggleLearningHub = () => {
    setIsLearningHubOpen(!isLearningHubOpen);
  };

  // Toggle Service menu on click
  const toggleService = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  // Toggle Search bar
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus on search input when opening
      setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
      // For now, just close the search bar
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };


  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center">
          {/* Mobile Hamburger Menu Button - Left Side */}
          <div className="lg:hidden flex items-center mr-2">
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
            <Image
              src="/images/MeroTasbir-logo.png"
              alt="Mero Tasbir Logo"
              width={120}
              height={120}
              className="h-24 w-24 lg:h-28 lg:w-28"
            />
          </div>

          {/* Spacer to push right side icons to the right */}
          <div className="flex-1"></div>

          {/* Desktop Navigation */}
          <div className="hidden nav-item space-x-5 xl:space-xl-3 text-black">
            {[
              { label: "Home", href: "/" },
              { label: "Marketplace", href: "/marketplace" },
              { label: "For Freelancer", href: "/freelancer" },
              { label: "Career", href: "/career" },
              { label: "Contact Us", href: "/contact" },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                className="px-2 py-2 text-sm xl:text-base font-medium text-black transition-colors hover:opacity-80 whitespace-nowrap"
                onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
              >
                {item.label}
              </a>
            ))}

            {/* Service Dropdown */}
            <div
              className="group relative"
              onMouseEnter={() => setIsServiceOpen(true)}
              onMouseLeave={() => setIsServiceOpen(false)}
              onClick={toggleService}
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isServiceOpen}
            >
              <button
                className={`px-2 py-2 text-sm xl:text-base font-medium transition-colors whitespace-nowrap ${
                  isServiceOpen ? "" : "text-black"
                }`}
                style={{ color: isServiceOpen ? '#FB7F33' : '#000000' }}
              >
                Service
              </button>

              {/* Service Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-in-out ${
                  isServiceOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                }`}
                style={{ top: "100%" }}
                onClick={e => e.stopPropagation()}
              >
                <div className="py-2 min-w-[200px]">
                  <a
                    href="/booking"
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                  >
                    Photography
                  </a>
                  <a
                    href="/events"
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                  >
                    Events
                  </a>
                </div>
              </div>
            </div>

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
                className={`px-2 py-2 text-sm xl:text-base font-medium transition-colors whitespace-nowrap ${
                  isLearningHubOpen ? "" : "text-black"
                }`}
                style={{ color: isLearningHubOpen ? '#FB7F33' : '#000000' }}
              >
                Learning Hub
              </button>

              {/* Full-Width Dropdown */}
              {/* <div
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
                    <h3 className="font-semibold text-black">Photography</h3>
                    <ul className="mt-2 space-y-1">
                      <li>
                      <a
                        href="#"
                        className="text-sm text-black hover:opacity-80"
                        onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                      >
                        Portrait
                      </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-black hover:opacity-80"
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                        >
                          Wedding
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-black hover:opacity-80"
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                        >
                          Event
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Videography</h3>
                    <ul className="mt-2 space-y-1">
                      <li>
                        <a
                          href="#"
                          className="text-sm text-black hover:opacity-80"
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                        >
                          Cinematic
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-black hover:opacity-80"
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                        >
                          Event
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-black hover:opacity-80"
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                        >
                          Editing
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>

          </div>

          {/* Desktop Icons & CTA */}
          <div className="hidden nav-item items-center space-x-2 xl:space-x-3 ml-6">
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping Cart"
                className="relative rounded p-1 text-black transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
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

              <button
                className="rounded-full bg-orange-500 px-3 py-2 text-sm xl:text-base font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 whitespace-nowrap"
                aria-label="Get Rented"
              >
                Get Rented
              </button>
          </div>

         


         

          {/* Mobile Navigation - Right Side Icons */}
          <div className="mobile-nav-icons lg:hidden flex items-center space-x-2">
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
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
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
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-white lg:hidden"
            role="menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeInOut"
              }}
          >
            {/* Top Bar */}
            <div className="flex h-20 items-center px-4 border-b border-gray-200">
              {/* Close Button - Same position as hamburger */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="rounded p-1 text-black hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 mr-2"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="flex items-center">
                <Image
                  src="/images/MeroTasbir-logo.png"
                  alt="Mero Tasbir Logo"
                  width={120}
                  height={120}
                  className="h-24 w-24"
                />
              </div>
              
              {/* Spacer to push right side icons to the right */}
              <div className="flex-1"></div>
              
              {/* Top Right Icons */}
              <div className="flex items-center space-x-3">
                {/* Get Rented Button */}
                <button
                  className="rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Get Rented
                </button>
                
                {/* User Icon */}
                <a
                  href="/auth"
                  aria-label="Profile"
                  className="rounded p-1 text-black transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <User className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Navigation Content */}
            <motion.div 
              className="flex-1 overflow-y-auto px-4 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              <div className="space-y-1">
              {[
                { label: "Home", href: "/" },
                { label: "Marketplace", href: "/marketplace" },
                { label: "For Freelancer", href: "/freelancer" },
                { label: "Career", href: "/career" },
                { label: "Contact Us", href: "/contact" },
                { label: "Learning Hub", href: "/course" },
                ].map((item, index) => (
                  <motion.a
                  key={item.label}
                  href={item.href}
                    className="block rounded-md px-3 py-3 text-lg font-medium text-black hover:bg-gray-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ color: '#000000' }}
                  role="menuitem"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                >
                  {item.label}
                  </motion.a>
              ))}
              </div>
              
              {/* Service Mobile Menu */}
              <motion.div 
                className="px-3 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              >
                  <div className="text-lg font-medium text-black mb-2">Service</div>
                <div className="ml-4 space-y-1">
                  <motion.a
                    href="/booking"
                      className="block rounded-md px-3 py-3 text-base text-black hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    style={{ color: '#000000' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
                  >
                    Photography
                  </motion.a>
                  <motion.a
                    href="/events"
                      className="block rounded-md px-3 py-3 text-base text-black hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    style={{ color: '#000000' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
                  >
                    Events
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
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
              className="absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg"
            >
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSearch} className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <input
                      id="search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for photographers, videographers, services..."
                      className="w-full px-4 py-3 pr-12 text-base text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-orange-500 transition-colors"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </form>
                
                {/* Quick Search Suggestions */}
                <div className="mt-4">
                  <p className="text-sm text-black mb-2">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Wedding Photography",
                      "Event Videography", 
                      "Portrait Photography",
                      "Corporate Events",
                      "Drone Photography"
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          // Focus back on input
                          setTimeout(() => {
                            const searchInput = document.getElementById('search-input');
                            if (searchInput) searchInput.focus();
                          }, 100);
                        }}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-orange-100 text-black hover:text-orange-700 rounded-full transition-colors"
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
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
      </div>
    </nav>
  );
}