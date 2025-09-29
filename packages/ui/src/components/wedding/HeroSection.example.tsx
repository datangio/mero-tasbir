// Example usage of HeroSection component with props
import React from 'react';
import { HeroSection } from './HeroSection';

export const HeroSectionExample = () => {
  const handleGetStarted = () => {
    console.log('Get started clicked!');
  };

  const heroData = {
    title: "Every Moment of Your",
    subtitle: "Beautifully Captured",
    description: "The tools you need to build your photography business. Get started - like, right now.",
    backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ctaText: "Get Started",
    rotatingTexts: ["Wedding", "Pasni", "Event", "Anniversary"]
  };

  // Pass image URLs as props - these can be from your app's public folder
  const eventImages = {
    corporateEvent: "/images/corporate-event.png", // Your app's public folder
    pasniCeremony: "/images/pasni.jpg" // Your app's public folder
  };

  return (
    <HeroSection 
      onGetStarted={handleGetStarted}
      heroData={heroData}
      eventImages={eventImages} // Pass the image URLs as props
    />
  );
};

// Alternative: Use with external URLs (no dependency on public folder)
export const HeroSectionWithExternalImages = () => {
  const handleGetStarted = () => {
    console.log('Get started clicked!');
  };

  const eventImages = {
    corporateEvent: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    pasniCeremony: "https://images.unsplash.com/photo-1529626465617-a207a7bb2348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  };

  return (
    <HeroSection 
      onGetStarted={handleGetStarted}
      eventImages={eventImages} // External URLs work anywhere
    />
  );
};

// Alternative: Use without eventImages (will use default external URLs)
export const HeroSectionWithDefaults = () => {
  const handleGetStarted = () => {
    console.log('Get started clicked!');
  };

  return (
    <HeroSection 
      onGetStarted={handleGetStarted}
      // No eventImages prop - will use default external URLs
    />
  );
};
