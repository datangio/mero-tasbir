"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Menu, Phone, Mail, Calendar, MapPin, Clock, Users } from "lucide-react";
import { BottomNavigator } from "./BottomNavigator";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { HowItWorks } from "./HowItWorks";
import { BookingCategories } from "./BookingCategories";
import { PricingSection } from "./PricingSection";
import { useBookingForm } from "../../hooks/useBookingForm";

interface HeroSectionProps {
  onGetStarted: () => void;
  heroData?: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage?: string;
    ctaText: string;
    rotatingTexts: string[];
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, heroData }) => {

  const {
    openBookingForm,
   
  } = useBookingForm();
  // Default data if no heroData is provided
  const defaultHeroData = {
    title: "Every Moment of Your",
    subtitle: "Beautifully Captured",
    description: "The tools you need to build your photography business. Get started - like, right now.",
    backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ctaText: "Get Started",
    rotatingTexts: ["Wedding", "Pasni", "Event", "Anniversary"]
  };

  const data = heroData || defaultHeroData;
  
  // Wedding type rotation
  const weddingTypes = data.rotatingTexts;
  const [currentWeddingType, setCurrentWeddingType] = React.useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const [isImageFullscreen, setIsImageFullscreen] = React.useState(false);
  
  // Refs for scroll effects
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Simple values for image effects (no scroll animation)
  const imageScale = 1;
  const imageOpacity = 1;

  // Events data
  const events = [
    
    {
      id: 2,
      title: "Corporate Event Photography",
      date: "2024-04-20",
      location: "Pokhara, Nepal",
      time: "9:00 AM - 6:00 PM",
      guests: "200+",
      description: "Professional corporate event documentation with high-quality photography services. Perfect for conferences, seminars, product launches, and company celebrations.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "Pasni Ceremony Photography",
      date: "2024-05-10",
      location: "Lalitpur, Nepal",
      time: "10:00 AM - 4:00 PM",
      guests: "80+",
      description: "Traditional Pasni ceremony photography capturing the cultural significance and joy of this important milestone in a child's life. We respect and document traditional customs beautifully.",
      image: "https://images.unsplash.com/photo-1529626465617-a207a7bb2348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeddingType(prevIndex => (prevIndex + 1) % weddingTypes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative min-h-(calc(100vh-400px)) overflow-hidden bg-gradient-to-br from-gray-50 to-white title-regular"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
  

      <motion.div
        className="flex flex-col lg:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Left Section - Content */}
        <div className="flex w-full lg:w-[60%] items-start justify-center px-4 sm:px-8 lg:pr-0 pt-8 sm:pt-12 lg:pt-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-none"
          >
            {/* Main Headline - Full Width Layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -2, 0],
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
              className="mb-6 sm:mb-8 w-full px-2 text-center"
            >
              <h1 className="mb-2 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
                {data.title},
                <br />
              </h1>
              <h1 className="mb-2 ml-0 sm:ml-8 md:ml-16 lg:ml-32 max-w-2xl overflow-hidden text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium italic leading-tight text-gray-900">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWeddingType}
                    initial={{ opacity: 1, x: -800 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 1, x: 1500 }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                    }}
                    className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ballmain-regular"
                  >
                    {weddingTypes[currentWeddingType]}
                  </motion.span>
                </AnimatePresence>
                <br /> {data.subtitle}
              </h1>
            </motion.div>

            {/* Description - Full Width Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="mb-8 sm:mb-10 w-full px-2 sm:px-4"
            >
              <p className="text-center text-base sm:text-lg md:text-xl leading-relaxed text-gray-600">
                {data.description}
              </p>
            </motion.div>

            {/* Action Buttons - Full Width Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              className="w-full px-2 sm:px-4 text-center"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onGetStarted}
                  className="w-full sm:w-auto rounded-lg bg-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl uppercase"
                >
                  {data.ctaText}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-full sm:w-auto rounded-lg border-2 border-black bg-transparent px-6 sm:px-8 lg:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black shadow-lg transition-all duration-300 hover:bg-black hover:text-white"
                >
                  HOW IT WORKS
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Section - Single Image */}
        <div className="relative w-full lg:w-[40%] overflow-hidden mt-8 lg:mt-0">
          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Single Static Image */}
            <div className="relative h-[50vh] sm:h-[60vh] lg:h-[80vh] w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${data.backgroundImage}')`,
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Booking Categories Section */}
      <BookingCategories 
        onCategorySelect={(categoryId) => {
          console.log('Selected category:', categoryId);
          // You can add navigation or other logic here
        }}
      />


<div className="bg-white text-black py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ballmain-regular"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Book Your Event
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Capturing life's most precious moments through professional photography services. 
            From weddings to corporate events, we document your special occasions with artistic excellence.
          </motion.p>
        </div>
      </div>


      <PricingSection onSelectPlan={openBookingForm}   />

      {/* Events Content */}
      <div ref={containerRef} className="relative">
        {events.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Text Content */}
            <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8">
              <div className="container mx-auto max-w-6xl">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Text Content */}
                  <motion.div
                    className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <motion.h2
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {event.title}
                    </motion.h2>
                    
                    <motion.p
                      className="text-base sm:text-lg text-black mb-6 sm:mb-8 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {event.description}
                    </motion.p>

                    {/* Event Details */}
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{ color: '#FB7F33' }} />
                        <span className="text-sm sm:text-base text-black">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{ color: '#FB7F33' }} />
                        <span className="text-sm sm:text-base text-black">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{ color: '#FB7F33' }} />
                        <span className="text-sm sm:text-base text-black">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{ color: '#FB7F33' }} />
                        <span className="text-sm sm:text-base text-black">{event.guests} guests</span>
                      </div>
                    </motion.div>

                    <motion.button
                      className="text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base"
                      style={{ backgroundColor: '#FB7F33' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E06B2A'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FB7F33'}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book This Event
                    </motion.button>
                  </motion.div>

                  {/* Image Content */}
                  <motion.div
                    ref={index === 1 ? imageRef : null}
                    className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`relative overflow-hidden rounded-2xl shadow-2xl ${
                        isImageFullscreen && index === 1 
                          ? 'fixed inset-0 z-50 rounded-none' 
                          : 'h-64 sm:h-80 md:h-96 lg:h-[500px]'
                      }`}
                      style={{
                        scale: index === 1 ? imageScale : 1,
                        opacity: index === 1 ? imageOpacity : 1
                      }}
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Close button for fullscreen */}
                      {isImageFullscreen && index === 1 && (
                        <motion.button
                          className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                          onClick={() => setIsImageFullscreen(false)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

         


            {/* Divider */}
            {index < events.length - 1 && (
              <div className="border-b border-gray-200 mx-4 sm:mx-8" />
            )}
          </div>
        ))}
      </div>

          {/* Call to Action */}
          <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="mb-6 text-lg text-gray-600">
            Can't find what you're looking for? We offer custom photography packages!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-3 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            Contact Us for Custom Packages
          </motion.button>
        </motion.div>

    

      

      {/* Wedding Photos Section */}
      <motion.div
        className="relative w-full overflow-hidden bg-white px-8 py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.h2
            className="title-regular relative mb-8 text-3xl  md:text-5xl font-bold leading-tight text-gray-900 md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Photos That Shine for
            <br />
            Every{" "}
            <span className="relative inline-block h-12 rounded-md px-2 py-1" style={{ color: '#FB7F33' }}>
              Ocassions
              {/* black wavy underline */}
              <motion.div
                className="absolute -bottom-6 left-0 right-0 h-3"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              >
                <svg
                  viewBox="0 0 200 20"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 Q8,0 16,10 Q24,20 32,10 Q40,0 48,10 Q56,20 64,10 Q72,0 80,10 Q88,20 96,10 Q104,0 112,10 Q120,20 128,10 Q136,0 144,10 Q152,20 160,10 Q168,0 176,10 Q184,20 192,10 Q200,0 200,10"
                    stroke="#000000"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto mb-12 max-w-3xl text-justify text-lg lg:text-2xl leading-relaxed text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Every special moment deserves to be captured beautifully — whether
            it’s a wedding, birthday, family gathering, or corporate event. Book
            your Mero Tasbir photographer today and let your memories live
            forever in perfect photos.
          </motion.p>

          <BottomNavigator />
        </div>
      </motion.div>

      {/* How It Works Section */}
      <HowItWorks />


      {/* Story Section - Client Testimonials */}
      <motion.div
        className="w-full bg-gray-50 px-8 py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.h2 className="text-3xl md:text-6xl font-bold uppercase text-gray-900">
              Recent <br /> Projects
            </motion.h2>

            <motion.div className="max-w-md text-right text-black">
              Capturing beautiful moments for our amazing clients
            </motion.div>
          </motion.div>

          {/* Client Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {/* Project 1 */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
              whileHover={{ y: -8, scale: 1.02 }}
            >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Wedding Project"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                        <img
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                          alt="Sarah Johnson"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Sarah & Michael</h3>
                        <p className="text-white/80 text-sm">Wedding Photography</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Project 2 */}
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1529626465617-a207a7bb2348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Pasni Project"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                          alt="Rajesh Sharma"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Rajesh & Family</h3>
                        <p className="text-white/80 text-sm">Pasni Ceremony</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Project 3 */}
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Event Project"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                          alt="Priya Singh"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Priya & Company</h3>
                        <p className="text-white/80 text-sm">Corporate Event</p>
                      </div>
                    </div>
                  </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />


        {/* Call to Action */}
        <motion.div
        className="bg-[#E08E45] text-white py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Capture Your Event?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Let us help you preserve the memories of your special occasion with our professional photography services.
          </p>
          <motion.button
            className="text-white px-12 py-4 rounded-full text-lg font-semibold transition-colors duration-300"
            style={{ backgroundColor: '#FB7F33' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E06B2A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FB7F33'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.div>
    

          {/* Footer Section */}
          <motion.footer
            className="w-full bg-gray-900 text-white py-12 sm:py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {/* Company Info */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                  <motion.h3
                    className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 ballmain-regular"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    Mero Tasbir
                  </motion.h3>
                  <motion.p
                    className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    Capturing life's most precious moments with artistic vision and professional excellence. 
                    Every photograph tells a story, and we're here to help you tell yours.
                  </motion.p>
                  <div className="flex space-x-3 sm:space-x-4">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-800 text-white transition-colors hover:bg-gray-700"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-800 text-white transition-colors hover:bg-gray-700"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-800 text-white transition-colors hover:bg-gray-700"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-800 text-white transition-colors hover:bg-gray-700"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <motion.h4
                    className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    Quick Links
                  </motion.h4>
                  <motion.ul
                    className="space-y-1 sm:space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <li><a href="#about" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#services" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Services</a></li>
                    <li><a href="#portfolio" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Portfolio</a></li>
                    <li><a href="#pricing" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="#contact" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Contact</a></li>
                  </motion.ul>
                </div>

                {/* Contact Info */}
                <div>
                  <motion.h4
                    className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    Contact Info
                  </motion.h4>
                  <motion.div
                    className="space-y-2 sm:space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-300">+977 9841234567</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-300">info@merotasbir.com</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="text-xs sm:text-sm text-gray-300">Kathmandu, Nepal</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Bar */}
              <motion.div
                className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <p className="text-xs sm:text-sm text-gray-400">
                  © 2024 Mero Tasbir. All rights reserved. | Crafted with ❤️ in Nepal
                </p>
              </motion.div>
            </div>
          </motion.footer>

      {/* Chat Support Icon - Bottom Right */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-yellow-400 shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative mx-4 w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Video Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                <video
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  poster="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Play Button Overlay (shown when video is paused) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur-sm"
                  >
                    <Play className="ml-1 h-8 w-8" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
