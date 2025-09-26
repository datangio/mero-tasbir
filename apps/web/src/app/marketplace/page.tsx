
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import MarketplaceModal from "../../components/MarketplaceModal/MarketplaceModal";

// Full Equipment Data
const marketplaceItems = [
  {
    id: 1,
    title: "Sony A7 III Full-Frame Camera",
    category: "Camera",
    type: "Rental",
    price: "NPR 5,000 / day",
    image: "/images/equipment/sony-a7iii.jpg",
    specs: "24.2MP, Mirrorless, 4K Video",
    condition: "Excellent",
    availability: "Available",
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    title: "Canon EF 50mm f/1.8 STM Lens",
    category: "Lens",
    type: "Sale",
    price: "NPR 18,000",
    image: "/images/equipment/canon-50mm.jpg",
    specs: "Prime lens, f/1.8 aperture, perfect for portraits",
    condition: "Like New",
    availability: "Available",
    rating: 4.9,
    reviews: 18
  },
  {
    id: 3,
    title: "DJI Mavic Air 2 Drone",
    category: "Drone",
    type: "Sale",
    price: "NPR 95,000",
    image: "/images/equipment/dji-mavic.jpg",
    specs: "4K camera, 34min flight time, remote included",
    condition: "Good",
    availability: "Available",
    rating: 4.7,
    reviews: 31
  },
  {
    id: 4,
    title: "Rode VideoMic Pro+ Shotgun Microphone",
    category: "Audio",
    type: "Rental",
    price: "NPR 800 / day",
    image: "/images/equipment/rodemic.jpg",
    specs: "Directional mic, ideal for vlogs and interviews",
    condition: "Excellent",
    availability: "Available",
    rating: 4.6,
    reviews: 12
  },
  {
    id: 5,
    title: "Neewer RGB LED Panel (Bi-Color)",
    category: "Lighting",
    type: "Rental",
    price: "NPR 1,200 / day",
    image: "/images/equipment/neewer-light.jpg",
    specs: "Adjustable color temp, dimmable, stand included",
    condition: "Good",
    availability: "Available",
    rating: 4.5,
    reviews: 8
  },
  {
    id: 6,
    title: "Manfrotto Tripod with Fluid Head",
    category: "Tripod",
    type: "Rental",
    price: "NPR 600 / day",
    image: "/images/equipment/tripod.jpg",
    specs: "Aluminum build, supports up to 8kg",
    condition: "Excellent",
    availability: "Available",
    rating: 4.8,
    reviews: 15
  },
  {
    id: 7,
    title: "Nikon D850 DSLR Camera",
    category: "Camera",
    type: "Sale",
    price: "NPR 180,000",
    image: "/images/equipment/nikon-d850.jpg",
    specs: "45.7MP, Full-frame, 4K video support",
    condition: "Like New",
    availability: "Available",
    rating: 4.9,
    reviews: 42
  },
  {
    id: 8,
    title: "Gitzo Traveler Carbon Fiber Tripod",
    category: "Tripod",
    type: "Rental",
    price: "NPR 1,000 / day",
    image: "/images/equipment/gitzo-tripod.jpg",
    specs: "Lightweight, durable, max height 160cm",
    condition: "Excellent",
    availability: "Available",
    rating: 4.7,
    reviews: 19
  },
  {
    id: 9,
    title: "Sony FE 24-70mm f/2.8 GM Lens",
    category: "Lens",
    type: "Rental",
    price: "NPR 2,500 / day",
    image: "/images/equipment/sony-24-70.jpg",
    specs: "Professional zoom lens, f/2.8 constant aperture",
    condition: "Excellent",
    availability: "Available",
    rating: 4.9,
    reviews: 28
  },
  {
    id: 10,
    title: "Godox AD600 Pro Studio Flash",
    category: "Lighting",
    type: "Sale",
    price: "NPR 45,000",
    image: "/images/equipment/godox-flash.jpg",
    specs: "600W studio flash, wireless control, modeling light",
    condition: "Good",
    availability: "Available",
    rating: 4.6,
    reviews: 14
  }
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof marketplaceItems[0] | null>(null);

  // Filter items based on selections
  const filteredItems = marketplaceItems.filter((item) => {
    const categoryMatch = selectedCategory === "" || item.category === selectedCategory;
    const typeMatch = selectedType === "" || item.type === selectedType;
    const tabMatch = activeTab === "all" || item.type.toLowerCase() === activeTab;
    
    return categoryMatch && typeMatch && tabMatch;
  });

  // Separate rental and sale items
  const rentalItems = marketplaceItems.filter(item => item.type === "Rental");
  const saleItems = marketplaceItems.filter(item => item.type === "Sale");

  // Unique options for filters
  const categories = ["Camera", "Lens", "Tripod", "Audio", "Lighting", "Drone"];

  const handleRentBuy = (item: typeof marketplaceItems[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      

      {/* Hero Section */}
      <section className="relative py-20" style={{ background: 'linear-gradient(to right, #FB7F33, #E06B2A)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Equipment Marketplace</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover premium photography and videography equipment. Rent for your projects or buy to own professional gear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { id: "all", label: "All Equipment", count: marketplaceItems.length },
                { id: "rental", label: "Rentals", count: rentalItems.length },
                { id: "sale", label: "For Sale", count: saleItems.length }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white shadow-sm"
                      : "text-black hover:text-black"
                  }`}
                  style={{ color: activeTab === tab.id ? '#FB7F33' : undefined }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-200 text-black px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-3">Filter by Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-black border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 transition-all duration-200"
                  style={{ '--tw-ring-color': '#FB7F33', '--tw-border-color': '#FB7F33' } as React.CSSProperties}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-3">Filter by Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full text-black border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 transition-all duration-200"
                  style={{ '--tw-ring-color': '#FB7F33', '--tw-border-color': '#FB7F33' } as React.CSSProperties}
                >
                  <option value="">All Types</option>
                  <option value="Rental">Rental</option>
                  <option value="Sale">For Sale</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-2xl font-bold text-black">
                {activeTab === "all" ? "All Equipment" : activeTab === "rental" ? "Rental Equipment" : "Equipment for Sale"}
              </h2>
              <p className="text-black mt-1">
                Showing <span className="font-semibold" style={{ color: '#FB7F33' }}>{filteredItems.length}</span> items
              </p>
            </div>
          </motion.div>

          {/* Equipment Cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.type === "Rental" 
                          ? "bg-blue-500 text-white" 
                          : "bg-green-500 text-white"
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    {/* Condition Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/90 text-black text-xs font-medium rounded-full">
                        {item.condition}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-black text-lg mb-2 line-clamp-2 transition-colors group-hover:opacity-80"
                        
                    >
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-black mb-4 line-clamp-2">
                      {item.specs}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating) ? "text-yellow-400" : "text-black"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-black">
                        {item.rating} ({item.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold" style={{ color: '#FB7F33' }}>
                        {item.price}
                      </span>
                      <span className="text-sm text-green-600 font-medium flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {item.availability}
                      </span>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      onClick={() => handleRentBuy(item)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        item.type === "Rental"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.type === "Rental" ? "Rent Now" : "Buy Now"}
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-black mb-2">No equipment found</h3>
                <p className="text-black">Try adjusting your filters to find what you&apos;re looking for.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16" style={{ background: 'linear-gradient(to right, #FB7F33, #E06B2A)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">List Your Equipment</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Are you a freelancer? List your gear and earn extra income by renting or selling your equipment.
            </p>
            <motion.button
              className="bg-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              style={{ color: '#FB7F33' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Marketplace Modal */}
      <MarketplaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}