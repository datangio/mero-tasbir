"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Events() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState('snacks');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'events', 'packages', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const menuData = {
    snacks: [
      { name: "Chicken Tikka", price: "NPR 800", description: "Tender chicken marinated in spices and grilled" },
      { name: "Vegetable Samosa", price: "NPR 400", description: "Crispy pastry filled with spiced vegetables" },
      { name: "Paneer Tikka", price: "NPR 700", description: "Cottage cheese marinated and grilled to perfection" },
      { name: "Chicken Wings", price: "NPR 900", description: "Spicy buffalo wings with ranch dip" },
      { name: "Fish Fingers", price: "NPR 600", description: "Crispy fried fish with tartar sauce" }
    ],
    dinner: [
      { name: "Butter Chicken", price: "NPR 1,500", description: "Creamy tomato curry with tender chicken" },
      { name: "Biryani Rice", price: "NPR 1,200", description: "Fragrant basmati rice with aromatic spices" },
      { name: "Dal Makhani", price: "NPR 1,000", description: "Rich black lentils cooked with cream" },
      { name: "Tandoori Roti", price: "NPR 300", description: "Fresh baked flatbread from clay oven" },
      { name: "Mixed Vegetable Curry", price: "NPR 1,100", description: "Seasonal vegetables in spiced tomato gravy" }
    ],
    dessert: [
      { name: "Gulab Jamun", price: "NPR 500", description: "Soft milk dumplings in rose syrup" },
      { name: "Ras Malai", price: "NPR 600", description: "Cottage cheese dumplings in sweetened milk" },
      { name: "Kheer", price: "NPR 400", description: "Traditional rice pudding with nuts" },
      { name: "Ice Cream", price: "NPR 300", description: "Vanilla, chocolate, or strawberry" },
      { name: "Fruit Salad", price: "NPR 500", description: "Fresh seasonal fruits with honey" }
    ],
    'pizza-counter': [
      { name: "Margherita Pizza", price: "NPR 1,200", description: "Fresh tomato, mozzarella, and basil" },
      { name: "Pepperoni Pizza", price: "NPR 1,500", description: "Classic pepperoni with mozzarella" },
      { name: "Vegetarian Supreme", price: "NPR 1,400", description: "Mixed vegetables and cheese" },
      { name: "Chicken BBQ", price: "NPR 1,600", description: "BBQ chicken with red onions" },
      { name: "Custom Pizza", price: "NPR 1,300+", description: "Build your own with choice of toppings" }
    ],
    'panipuri-counter': [
      { name: "Classic Pani Puri", price: "NPR 600", description: "Crispy shells with spiced water and potatoes" },
      { name: "Dahi Puri", price: "NPR 700", description: "Puri filled with yogurt and chutneys" },
      { name: "Sev Puri", price: "NPR 500", description: "Flat puri with vegetables and sev" },
      { name: "Bhel Puri", price: "NPR 600", description: "Puffed rice with tangy tamarind sauce" },
      { name: "Ragda Pattice", price: "NPR 800", description: "Potato patties with spicy white peas curry" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
     
      {/* Full Screen Header with Video Background */}
      <div id="home" className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/Video-171.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="container mx-auto px-8 text-center">
            <motion.h1
              className="text-6xl font-bold mb-6 ballmain-regular text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Events
            </motion.h1>
            <motion.p
              className="text-3xl text-white max-w-6xl mx-auto mt-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Creating unforgettable dining experiences for life&apos;s most precious moments. 
              From weddings to corporate events, we cater your special occasions with culinary excellence.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Events Showcase Section */}
      <div id="events" className="py-20 px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-black mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Featured Events
            </motion.h2>
            <motion.p 
              className="text-lg text-black max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discover our portfolio of memorable events and special occasions we&apos;ve had the privilege to cater.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Wedding Celebrations",
                description: "Creating unforgettable dining experiences for your special day with elegant cuisine and impeccable service.",
                image: "/images/bento-grid-2.jpg",
               
              },
              {
                title: "Corporate Events",
                description: "Professional catering for your business gatherings, conferences, and corporate milestones with premium service.",
                image: "/images/bento-grid-3.jpg",
              
              },
              {
                title: "Private Parties",
                description: "Birthday celebrations, anniversaries, and intimate gatherings with customized menus and personal touch.",
                image: "/images/bento-grid-4.jpg",
              
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="h-48 bg-gray-200 relative overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom right, rgba(251, 127, 51, 0.2), rgba(224, 107, 42, 0.2))' }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <motion.h3 
                    className="text-xl font-semibold text-black mb-3 transition-colors duration-300"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#E08E45'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                    whileHover={{ x: 5 }}
                  >
                    {event.title}
                  </motion.h3>
                  <motion.p 
                    className="text-black leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {event.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div id="packages" className="py-20 px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-black mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Event Catering Packages
            </motion.h2>
            <motion.p 
              className="text-lg text-black max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Choose the perfect catering package for your special event. All packages include professional service, quality ingredients, and memorable dining experiences.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Essential Package",
                price: "NPR 2,500",
                duration: "per person",
                features: [
                  "Appetizers & main course",
                  "Soft drinks & water",
                  "Basic table setup",
                  "Professional serving staff",
                  "Cleanup service",
                  "Up to 50 guests"
                ],
                popular: false,
                icon: "🥘"
              },
              {
                name: "Premium Package",
                price: "NPR 4,500",
                duration: "per person",
                features: [
                  "Full 3-course meal",
                  "Premium beverages",
                  "Elegant table decor",
                  "Professional serving staff",
                  "Event coordination",
                  "Cleanup service",
                  "Up to 100 guests",
                  "Custom menu options"
                ],
                popular: true,
                icon: "🍽️"
              },
              {
                name: "Luxury Package",
                price: "NPR 7,500",
                duration: "per person",
                features: [
                  "Gourmet 4-course meal",
                  "Premium bar service",
                  "Luxury table settings",
                  "Dedicated event manager",
                  "Professional serving staff",
                  "Full event coordination",
                  "Cleanup service",
                  "Up to 200 guests",
                  "Custom menu design",
                  "Live cooking stations"
                ],
                popular: false,
                icon: "👑"
              }
            ].map((pkg, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group ${
                  pkg.popular ? 'ring-2' : ''
                }`}
                style={{ '--tw-ring-color': pkg.popular ? '#FB7F33' : undefined } as React.CSSProperties}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: pkg.popular ? 1.05 : 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {pkg.popular && (
                  <motion.div 
                    className="absolute top-0 right-0 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg z-10"
                    style={{ backgroundColor: '#FB7F33' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                  >
                    Most Popular
                  </motion.div>
                )}
                
                <motion.div 
                  className="p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className="text-center mb-6">
                    <motion.div 
                      className="text-6xl mb-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: index * 0.2 + 0.4, 
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {pkg.icon}
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-bold text-black mb-2 transition-colors duration-300"
                      style={{ color: '#000000' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FB7F33'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                      whileHover={{ x: 5 }}
                    >
                      {pkg.name}
                    </motion.h3>
                    <motion.div 
                      className="text-4xl font-bold mb-2"
                      style={{ color: '#FB7F33' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: index * 0.2 + 0.6, 
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {pkg.price}
                    </motion.div>
                    <div className="text-black">
                      {pkg.duration}
                    </div>
                  </div>
                  
                  <motion.ul 
                    className="space-y-3 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {pkg.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-center text-black"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.2 + 0.7 + featureIndex * 0.1,
                          duration: 0.3
                        }}
                        whileHover={{ x: 5, color: "#f97316" }}
                      >
                        <motion.svg 
                          className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  <motion.button
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-colors duration-300 ${
                      pkg.popular
                        ? 'text-white hover:opacity-90'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                    style={{ backgroundColor: pkg.popular ? '#FB7F33' : undefined }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.8 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Catering
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* See Menu Section */}
      <div className="py-20 px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-black mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Menu
            </motion.h2>
            <motion.p 
              className="text-lg text-black max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore our diverse culinary offerings. From traditional favorites to live cooking stations, 
              we have something to satisfy every palate.
            </motion.p>
            <motion.button
              onClick={() => setIsMenuModalOpen(true)}
              className="text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300 text-lg relative overflow-hidden group"
              style={{ backgroundColor: '#FB7F33' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E06B2A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FB7F33'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to right, #FB7F33, #E06B2A)' }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">View Full Menu</span>
            </motion.button>
          </motion.div>

          {/* Menu Preview Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Snacks & Appetizers", icon: "🥘", count: "5+ items", color: "from-red-400 to-red-600" },
              { title: "Main Course", icon: "🍽️", count: "5+ items", color: "from-blue-400 to-blue-600" },
              { title: "Desserts", icon: "🍰", count: "5+ items", color: "from-pink-400 to-pink-600" },
              { title: "Live Pizza Counter", icon: "🍕", count: "5+ varieties", color: "from-yellow-400 to-yellow-600" },
              { title: "Pani Puri Counter", icon: "🥟", count: "5+ varieties", color: "from-green-400 to-green-600" },
              { title: "Custom Options", icon: "✨", count: "Available", color: "from-purple-400 to-purple-600" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group relative overflow-hidden"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="text-6xl mb-4 relative z-10"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: index * 0.1 + 0.3, 
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                >
                  {item.icon}
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-semibold text-black mb-2 transition-colors duration-300 relative z-10"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#E08E45'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                  whileHover={{ x: 5 }}
                >
                  {item.title}
                </motion.h3>
                
                <motion.p 
                  className="text-black relative z-10"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.count}
                </motion.p>
                
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: 'linear-gradient(to right, #FB7F33, #E06B2A)' }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Rental Section */}
      <div className="py-20 px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-black mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Equipment & Utensil Rental
            </motion.h2>
            <motion.p 
              className="text-lg text-black max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Complete your event setup with our premium rental equipment. From tableware to serving stations, 
              we provide everything you need for a perfect event.
            </motion.p>
          </motion.div>

          {/* Rental Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Tableware & Cutlery",
                icon: "🍽️",
                items: [
                  { name: "Premium Dinner Plates", price: "NPR 200/plate", description: "Elegant ceramic dinner plates" },
                  { name: "Silver Cutlery Set", price: "NPR 150/set", description: "Complete knife, fork, and spoon set" },
                  { name: "Crystal Glassware", price: "NPR 100/glass", description: "High-quality drinking glasses" },
                  { name: "Table Napkins", price: "NPR 50/piece", description: "Linen napkins in various colors" }
                ]
              },
              {
                title: "Serving Equipment",
                icon: "🍴",
                items: [
                  { name: "Chafing Dishes", price: "NPR 1,500/unit", description: "Keep food warm during service" },
                  { name: "Serving Platters", price: "NPR 800/platter", description: "Large decorative serving dishes" },
                  { name: "Serving Spoons & Tongs", price: "NPR 200/set", description: "Professional serving utensils" },
                  { name: "Beverage Dispensers", price: "NPR 1,200/unit", description: "Self-serve drink stations" }
                ]
              },
              {
                title: "Table Setup",
                icon: "🪑",
                items: [
                  { name: "Round Tables (8-seater)", price: "NPR 2,500/table", description: "Elegant round dining tables" },
                  { name: "Chairs", price: "NPR 300/chair", description: "Comfortable dining chairs" },
                  { name: "Table Linens", price: "NPR 800/table", description: "Premium tablecloths and runners" },
                  { name: "Centerpieces", price: "NPR 1,500/piece", description: "Decorative table centerpieces" }
                ]
              },
              {
                title: "Kitchen Equipment",
                icon: "👨‍🍳",
                items: [
                  { name: "Commercial Stoves", price: "NPR 5,000/day", description: "Professional cooking equipment" },
                  { name: "Refrigeration Units", price: "NPR 4,000/day", description: "Food storage and cooling" },
                  { name: "Food Processors", price: "NPR 2,000/day", description: "Preparation equipment" },
                  { name: "Coffee Machines", price: "NPR 3,000/day", description: "Professional coffee service" }
                ]
              },
              {
                title: "Audio & Lighting",
                icon: "🎵",
                items: [
                  { name: "Sound System", price: "NPR 8,000/day", description: "Complete PA system with microphones" },
                  { name: "LED Lighting", price: "NPR 6,000/day", description: "Ambient and decorative lighting" },
                  { name: "Spotlights", price: "NPR 4,000/day", description: "Stage and area lighting" },
                  { name: "DJ Equipment", price: "NPR 10,000/day", description: "Complete DJ setup" }
                ]
              },
              {
                title: "Specialty Items",
                icon: "✨",
                items: [
                  { name: "Photo Booth", price: "NPR 15,000/day", description: "Complete photo booth setup" },
                  { name: "Backdrop & Props", price: "NPR 5,000/day", description: "Decorative backgrounds" },
                  { name: "Tent & Canopy", price: "NPR 8,000/day", description: "Outdoor event coverage" },
                  { name: "Generator", price: "NPR 6,000/day", description: "Power supply for outdoor events" }
                ]
              }
            ].map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-black">{category.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-black text-sm">{item.name}</h4>
                          <p className="text-xs text-black mt-1">{item.description}</p>
                        </div>
                        <div className="text-sm font-bold ml-2" style={{ color: '#FB7F33' }}>
                          {item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rental Packages */}
          <motion.div
            className="rounded-2xl p-8"
            style={{ background: 'linear-gradient(to right, rgba(251, 127, 51, 0.05), rgba(251, 127, 51, 0.1))' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-black mb-6 text-center">
              Complete Rental Packages
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Basic Setup",
                  price: "NPR 20,000",
                  description: "Perfect for small gatherings",
                  includes: [
                    "Tableware for 25 guests",
                    "Basic table setup",
                    "Serving equipment",
                    "Cleanup service"
                  ]
                },
                {
                  name: "Premium Setup",
                  price: "NPR 40,000",
                  description: "Ideal for medium events",
                  includes: [
                    "Tableware for 50 guests",
                    "Complete table setup",
                    "Serving equipment",
                    "Audio system",
                    "Cleanup service"
                  ]
                },
                {
                  name: "Luxury Setup",
                  price: "NPR 80,000",
                  description: "Perfect for large celebrations",
                  includes: [
                    "Tableware for 100+ guests",
                    "Premium table setup",
                    "Complete serving equipment",
                    "Audio & lighting system",
                    "Photo booth",
                    "Full event coordination"
                  ]
                }
              ].map((pkg, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <h4 className="text-xl font-bold text-black mb-2">{pkg.name}</h4>
                  <div className="text-3xl font-bold mb-2" style={{ color: '#FB7F33' }}>{pkg.price}</div>
                  <p className="text-black mb-4">{pkg.description}</p>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-black">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    className="w-full mt-4 text-white py-2 px-4 rounded-full font-semibold transition-colors duration-300"
                    style={{ backgroundColor: '#FB7F33' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E06B2A'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FB7F33'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Rent Package
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Rental Terms */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-sm text-black mb-4">
              * All rental items include delivery, setup, and pickup service within 20km radius
            </p>
            <p className="text-sm text-black">
              * Minimum rental period: 1 day | Security deposit required | Damage policy applies
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-black mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-black mb-8 leading-relaxed">
              Ready to book your event catering? Contact us today to discuss your requirements 
              and let us create memorable dining experiences for your special occasions.
            </p>
            <motion.button
              className="text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
              style={{ backgroundColor: '#FB7F33' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E06B2A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FB7F33'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Catering
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Menu Modal */}
      <AnimatePresence>
        {isMenuModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMenuModalOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Modal Header */}
              <div className="text-white p-6" style={{ backgroundColor: '#FB7F33' }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Our Complete Menu</h2>
                  <button
                    onClick={() => setIsMenuModalOpen(false)}
                    className="text-white hover:text-black transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { id: 'snacks', label: 'Snacks', icon: '🥘' },
                    { id: 'dinner', label: 'Dinner', icon: '🍽️' },
                    { id: 'dessert', label: 'Desserts', icon: '🍰' },
                    { id: 'pizza-counter', label: 'Pizza Counter', icon: '🍕' },
                    { id: 'panipuri-counter', label: 'Pani Puri Counter', icon: '🥟' }
                  ].map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveMenuCategory(category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          activeMenuCategory === category.id
                            ? 'bg-white'
                            : 'text-white hover:opacity-90'
                        }`}
                        style={{ 
                          color: activeMenuCategory === category.id ? '#FB7F33' : undefined,
                          backgroundColor: activeMenuCategory === category.id ? undefined : '#FB7F33'
                        }}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid gap-4">
                  {menuData[activeMenuCategory as keyof typeof menuData]?.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-black">{item.name}</h3>
                        <p className="text-sm text-black mt-1">{item.description}</p>
                      </div>
                        <div className="text-lg font-bold ml-4" style={{ color: '#FB7F33' }}>
                        {item.price}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 p-6 border-t">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-black">
                    * Prices may vary based on event size and customization
                  </p>
                    <motion.button
                      onClick={() => setIsMenuModalOpen(false)}
                      className="text-white px-6 py-2 rounded-full font-semibold transition-colors"
                      style={{ backgroundColor: '#FB7F33' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E06B2A'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FB7F33'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                    Close Menu
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}