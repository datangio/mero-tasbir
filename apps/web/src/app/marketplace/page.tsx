"use client";

import React, { useState } from "react";
import Image from "next/image";

import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

// Full Equipment Data
const marketplaceItems = [
  {
    id: 1,
    title: "Sony A7 III Full-Frame Camera",
    category: "Camera",
    type: "Rental",
    price: "Rs. 5,000 / day",
    location: "Kathmandu",
    image: "/images/equipment/sony-a7iii.jpg",
    specs: "24.2MP, Mirrorless, 4K Video",
  },
  {
    id: 2,
    title: "Canon EF 50mm f/1.8 STM Lens",
    category: "Lens",
    type: "Sale",
    price: "Rs. 18,000",
    location: "Pokhara",
    image: "/images/equipment/canon-50mm.jpg",
    specs: "Prime lens, f/1.8 aperture, perfect for portraits",
  },
  {
    id: 3,
    title: "DJI Mavic Air 2 Drone",
    category: "Drone",
    type: "Sale",
    price: "Rs. 95,000",
    location: "Biratnagar",
    image: "/images/equipment/dji-mavic.jpg",
    specs: "4K camera, 34min flight time, remote included",
  },
  {
    id: 4,
    title: "Rode VideoMic Pro+ Shotgun Microphone",
    category: "Audio",
    type: "Rental",
    price: "Rs. 800 / day",
    location: "Bhaktapur",
    image: "/images/equipment/rodemic.jpg",
    specs: "Directional mic, ideal for vlogs and interviews",
  },
  {
    id: 5,
    title: "Neewer RGB LED Panel (Bi-Color)",
    category: "Lighting",
    type: "Rental",
    price: "Rs. 1,200 / day",
    location: "Lalitpur",
    image: "/images/equipment/neewer-light.jpg",
    specs: "Adjustable color temp, dimmable, stand included",
  },
  {
    id: 6,
    title: "Manfrotto Tripod with Fluid Head",
    category: "Tripod",
    type: "Rental",
    price: "Rs. 600 / day",
    location: "Kathmandu",
    image: "/images/equipment/tripod.jpg",
    specs: "Aluminum build, supports up to 8kg",
  },
  {
    id: 7,
    title: "Nikon D850 DSLR Camera",
    category: "Camera",
    type: "Sale",
    price: "Rs. 180,000",
    location: "Kathmandu",
    image: "/images/equipment/nikon-d850.jpg",
    specs: "45.7MP, Full-frame, 4K video support",
  },
  {
    id: 8,
    title: "Gitzo Traveler Carbon Fiber Tripod",
    category: "Tripod",
    type: "Rental",
    price: "Rs. 1,000 / day",
    location: "Pokhara",
    image: "/images/equipment/gitzo-tripod.jpg",
    specs: "Lightweight, durable, max height 160cm",
  },
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Filter items based on selections
  const filteredItems = marketplaceItems.filter((item) => {
    return (
      (selectedCategory === "" || item.category === selectedCategory) &&
      (selectedType === "" || item.type === selectedType) &&
      (selectedLocation === "" || item.location === selectedLocation)
    );
  });

  // Unique options for filters
  const categories = ["Camera", "Lens", "Tripod", "Audio", "Lighting", "Drone"];
  const locations = ["Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur", "Biratnagar"];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Marketplace Section */}
      <section className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Equipment Marketplace</h1>
            <p className="mt-4 text-lg text-gray-600">
              Rent or buy professional photography and videography gear from trusted freelancers across Nepal.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
              <label className="block text-sm font-medium text-gray-800 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="">All Types</option>
                <option value="Rental">Rental</option>
                <option value="Sale">For Sale</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Showing <span className="font-semibold">{filteredItems.length}</span> result(s)
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="h-48 w-full object-cover rounded-t-xl"
                  />
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 text-lg truncate" title={item.title}>
                      {item.title}
                    </h3>
                    <div className="flex justify-between mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.type === "Rental" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-sm text-gray-500">📍 {item.location}</span>
                    </div>
                    <p className="mt-2 text-lg font-bold text-gray-800">{item.price}</p>
                    <p className="mt-2 text-xs text-gray-600 italic line-clamp-2">{item.specs}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No equipment found matching your filters. Try adjusting your search.
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Are you a freelancer? <span className="font-semibold">List your gear and earn extra income!</span> 
              Contact us to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}