"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Briefcase,
  ShoppingCart,
  FileText,
  Camera,
  PartyPopper,
  Heart,
  Baby,
  Building,
  Cake,
  User,
  Search,
  Calendar,
} from "lucide-react";

interface HeaderProps {
  logo?: string;
  onCheckAvailability?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo = "Mero Tasbir",
  className = "",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  // Animation variants for subcategory items
  const subcategoryItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    }),
  };

  const subcategoryTitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <header className={`relative ${className} bg-gray-100`}>
      {/* Main Header */}
      <div className="bg-gray-100 px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo with Menu Trigger */}
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              onClick={toggleMenu}
              className="text-gray-800 transition-colors hover:text-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
            <h1 className="text-2xl font-bold text-gray-800">{logo}</h1>
          </motion.div>

          {/* Search Bar */}
          <div className="mx-8 max-w-2xl flex-1">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type="text"
                placeholder="Photography"
                className="block w-full rounded-lg border border-gray-200 bg-white py-4 pl-12 pr-4 text-lg leading-5 placeholder-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            <motion.a
              href="/login"
              className="text-lg font-medium text-gray-800 transition-colors hover:text-gray-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Log in
            </motion.a>
            <motion.a
              href="/signup"
              className="text-lg font-medium text-gray-800 transition-colors hover:text-gray-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.a>
          </div>
        </div>
      </div>

      {/* Sub Navigation Menu - Awwwards Style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
            className="absolute left-1/2 top-20 z-50 max-h-[50vh] min-h-[500px] w-[95vw] max-w-[80vw] -translate-x-1/2 rounded-lg bg-gray-100 shadow-2xl"
          >
            <div className="mx-auto px-8 py-12">
              {/* Top Bar with Logo, Search, and Actions */}
              <div className="mb-12 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-gray-900">
                    Mero Tasbir
                  </span>
                </div>

                {/* Search Bar */}
                <div className="mx-8 max-w-md flex-1">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Photography"
                      className="block w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <a
                    href="/login"
                    className="text-gray-700 transition-colors hover:text-gray-900"
                  >
                    Log in
                  </a>
                  <a
                    href="/signup"
                    className="text-gray-700 transition-colors hover:text-gray-900"
                  >
                    Sign Up
                  </a>
                </div>
              </div>

              {/* Main Menu Content */}
              <div
                className={`grid gap-8 ${selectedSubCategory ? "grid-cols-1 lg:grid-cols-6" : "grid-cols-1 lg:grid-cols-6"}`}
              >
                {/* Left Column - Categories */}
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    <div
                      className={`flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-200 p-3 transition-colors ${
                        selectedCategory === "services"
                          ? "bg-white"
                          : "hover:bg-white"
                      }`}
                      onClick={() => handleCategoryClick("services")}
                    >
                      <Trophy className="h-5 w-5 text-gray-600" />
                      <span className="font-semibold text-gray-900">
                        Services
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div
                        className={`flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-colors ${
                          selectedCategory === "jobs"
                            ? "bg-white"
                            : "hover:bg-white"
                        }`}
                        onClick={() => handleCategoryClick("jobs")}
                      >
                        <Briefcase className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">Jobs</span>
                      </div>
                      <div
                        className={`flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-colors ${
                          selectedCategory === "marketplace"
                            ? "bg-white"
                            : "hover:bg-white"
                        }`}
                        onClick={() => handleCategoryClick("marketplace")}
                      >
                        <ShoppingCart className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">Market Place</span>
                      </div>
                      <div
                        className={`flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-colors ${
                          selectedCategory === "blogs"
                            ? "bg-white"
                            : "hover:bg-white"
                        }`}
                        onClick={() => handleCategoryClick("blogs")}
                      >
                        <FileText className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">Blogs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Column - Dynamic Content */}
                <div
                  className={`${selectedSubCategory ? "lg:col-span-2" : "lg:col-span-2"}`}
                >
                  {selectedCategory === "services" && (
                    <div className="space-y-4">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Services
                      </h3>
                      <div className="space-y-3">
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "photography"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("photography")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Photography</span>
                            <Camera className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "event-planner"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() =>
                            handleSubCategoryClick("event-planner")
                          }
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Event Planner</span>
                            <PartyPopper className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedSubCategory === "event-planner" && (
                    <div className="space-y-4">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Event Planning Services
                      </h3>
                      <div className="space-y-3">
                        <a
                          href="/events/wedding"
                          className="block rounded-lg p-3 transition-colors hover:bg-white"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">
                              Wedding Planning
                            </span>
                            <Heart className="h-4 w-4 text-gray-500" />
                          </div>
                        </a>
                        <a
                          href="/events/corporate"
                          className="block rounded-lg p-3 transition-colors hover:bg-white"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">
                              Corporate Events
                            </span>
                            <span className="text-sm text-gray-500">🏢</span>
                          </div>
                        </a>
                        <a
                          href="/events/birthday"
                          className="block rounded-lg p-3 transition-colors hover:bg-white"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">
                              Birthday Parties
                            </span>
                            <Cake className="h-4 w-4 text-gray-500" />
                          </div>
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedCategory === "jobs" && (
                    <div className="space-y-4">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Job Categories
                      </h3>
                      <div className="space-y-3">
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "creative"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("creative")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Creative</span>
                            <Camera className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "management"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("management")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Management</span>
                            <Briefcase className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "support"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("support")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Support</span>
                            <User className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedCategory === "marketplace" && (
                    <div className="space-y-4">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Marketplace Categories
                      </h3>
                      <div className="space-y-3">
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "equipment"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("equipment")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Equipment</span>
                            <Camera className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "venues"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("venues")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Venues</span>
                            <Building className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "services"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("services")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Services</span>
                            <Briefcase className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedCategory === "blogs" && (
                    <div className="space-y-4">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Blog Categories
                      </h3>
                      <div className="space-y-3">
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "tutorials"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("tutorials")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Tutorials</span>
                            <Camera className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "guides"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("guides")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Guides</span>
                            <FileText className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        <div
                          className={`block cursor-pointer rounded-lg p-3 transition-colors ${
                            selectedSubCategory === "news"
                              ? "bg-white"
                              : "hover:bg-white"
                          }`}
                          onClick={() => handleSubCategoryClick("news")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">News</span>
                            <FileText className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!selectedCategory && (
                    <div className="space-y-4">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Welcome to Mero Tasbir
                      </h3>
                      <div className="space-y-3">
                        <div className="block rounded-lg bg-white p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">
                              Select a category to explore our services
                            </span>
                            <User className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Subcategories */}
                <AnimatePresence mode="wait">
                  {selectedSubCategory && (
                    <motion.div
                      key={selectedSubCategory}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="lg:col-span-2"
                    >
                      {selectedSubCategory === "photography" && (
                        <div className="space-y-4">
                          <motion.h3
                            variants={subcategoryTitleVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-4 text-lg font-semibold text-gray-900"
                          >
                            Photography Services
                          </motion.h3>
                          <div className="space-y-3">
                            <a
                              href="/photography/wedding"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Wedding Photography
                                </span>
                                <Heart className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/booking"
                              className="block rounded-lg border border-pink-200 bg-pink-50 p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-pink-700">
                                  Book Wedding Photography
                                </span>
                                <Calendar className="h-4 w-4 text-pink-500" />
                              </div>
                            </a>
                            <a
                              href="/photography/pasni"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Pasni Photography
                                </span>
                                <Baby className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/photography/inauguration"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Inauguration Photography
                                </span>
                                <Building className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "event-planner" && (
                        <div className="space-y-4">
                          <motion.h3
                            variants={subcategoryTitleVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-4 text-lg font-semibold text-gray-900"
                          >
                            Event Planning Services
                          </motion.h3>
                          <div className="space-y-3">
                            <motion.a
                              href="/events/wedding"
                              variants={subcategoryItemVariants}
                              initial="hidden"
                              animate="visible"
                              custom={0}
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Wedding Planning
                                </span>
                                <Heart className="h-4 w-4 text-gray-500" />
                              </div>
                            </motion.a>
                            <motion.a
                              href="/events/corporate"
                              variants={subcategoryItemVariants}
                              initial="hidden"
                              animate="visible"
                              custom={1}
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Corporate Events
                                </span>
                                <Building className="h-4 w-4 text-gray-500" />
                              </div>
                            </motion.a>
                            <motion.a
                              href="/events/birthday"
                              variants={subcategoryItemVariants}
                              initial="hidden"
                              animate="visible"
                              custom={2}
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Birthday Parties
                                </span>
                                <Cake className="h-4 w-4 text-gray-500" />
                              </div>
                            </motion.a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "creative" && (
                        <div className="space-y-4">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Creative Jobs
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="/jobs/photographer"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Photographer
                                </span>
                                <Camera className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/jobs/videographer"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Videographer
                                </span>
                                <Camera className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/jobs/designer"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Graphic Designer
                                </span>
                                <FileText className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "management" && (
                        <div className="space-y-4">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Management Jobs
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="/jobs/event-coordinator"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Event Coordinator
                                </span>
                                <Briefcase className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/jobs/project-manager"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Project Manager
                                </span>
                                <Briefcase className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/jobs/team-lead"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">Team Lead</span>
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "support" && (
                        <div className="space-y-4">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Support Jobs
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="/jobs/customer-service"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Customer Service
                                </span>
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/jobs/technical-support"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Technical Support
                                </span>
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/jobs/administrative"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Administrative Assistant
                                </span>
                                <FileText className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "equipment" && (
                        <div className="space-y-4">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Photography Equipment
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="/marketplace/cameras"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">Cameras</span>
                                <Camera className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/marketplace/lenses"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">Lenses</span>
                                <Camera className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/marketplace/accessories"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Accessories
                                </span>
                                <Camera className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "venues" && (
                        <div className="space-y-4">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Event Venues
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="/marketplace/wedding-venues"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Wedding Venues
                                </span>
                                <Heart className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/marketplace/corporate-venues"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Corporate Venues
                                </span>
                                <Building className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/marketplace/outdoor-venues"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Outdoor Venues
                                </span>
                                <Building className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "services" && (
                        <div className="space-y-4">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Professional Services
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="/marketplace/photography-services"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Photography Services
                                </span>
                                <Camera className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/marketplace/event-planning"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Event Planning
                                </span>
                                <PartyPopper className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/marketplace/catering"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Catering Services
                                </span>
                                <Cake className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "tutorials" && (
                        <div className="space-y-4">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Photography Tutorials
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="/blogs/photography-basics"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Photography Basics
                                </span>
                                <Camera className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/blogs/editing-tutorials"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Photo Editing
                                </span>
                                <FileText className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/blogs/equipment-guides"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Equipment Guides
                                </span>
                                <Camera className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "guides" && (
                        <div className="space-y-4">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Event Planning Guides
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="/blogs/wedding-planning"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Wedding Planning
                                </span>
                                <Heart className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/blogs/corporate-events"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Corporate Events
                                </span>
                                <Building className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/blogs/budget-planning"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Budget Planning
                                </span>
                                <FileText className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedSubCategory === "news" && (
                        <div className="space-y-4">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Industry News
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="/blogs/industry-updates"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Industry Updates
                                </span>
                                <FileText className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/blogs/technology-news"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Technology News
                                </span>
                                <Camera className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                            <a
                              href="/blogs/market-trends"
                              className="block rounded-lg p-3 transition-colors hover:bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                  Market Trends
                                </span>
                                <FileText className="h-4 w-4 text-gray-500" />
                              </div>
                            </a>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};
