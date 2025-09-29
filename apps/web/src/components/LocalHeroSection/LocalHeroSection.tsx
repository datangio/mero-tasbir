"use client";

import React from 'react';
import { HeroSection } from "@repo/ui";

interface LocalHeroSectionProps {
  onGetStarted: () => void;
}

export const LocalHeroSection: React.FC<LocalHeroSectionProps> = ({ onGetStarted }) => {
  // Custom hero data with local background image
  const heroData = {
    title: "Every Moment of Your",
    subtitle: "Beautifully Captured",
    description: "The tools you need to build your photography business. Get started - like, right now.",
    backgroundImage: "/images/photography.jpg", // Using local image from web app
    ctaText: "Get Started",
    rotatingTexts: ["Wedding", "Pasni", "Event", "Anniversary"]
  };

  return (
    <HeroSection 
      onGetStarted={onGetStarted}
      heroData={heroData}
      // eventImages will use default images from UI package public folder
    />
  );
};
