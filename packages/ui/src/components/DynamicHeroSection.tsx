"use client";

import React from "react";
import { HeroSection } from "./wedding/HeroSection";
import { useHeroSection } from "../hooks/useHeroSection";
import { LoadingSpinner } from "./LoadingSpinner";

interface DynamicHeroSectionProps {
  onGetStarted: () => void;
}

export const DynamicHeroSection: React.FC<DynamicHeroSectionProps> = ({ onGetStarted }) => {
  const { heroSection, isLoading, error } = useHeroSection();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    console.error("Error loading hero section:", error);
    // Fall back to default hero section if there's an error
  }

  // Convert the hero section data to the format expected by HeroSection
  const heroData = heroSection ? {
    title: heroSection.title,
    subtitle: heroSection.subtitle,
    description: heroSection.description,
    backgroundImage: heroSection.backgroundImage,
    ctaText: heroSection.ctaText,
    rotatingTexts: heroSection.rotatingTexts || ["Wedding", "Pasni", "Event", "Anniversary"]
  } : undefined;

  return (
    <HeroSection 
      onGetStarted={onGetStarted} 
      heroData={heroData ? {
        ...heroData,
        ctaText: heroData.ctaText || 'Get Started'
      } : undefined}
    />
  );
};

