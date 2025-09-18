import React from "react";
import { HeroSection } from "./wedding/HeroSection";
import { PricingSection } from "./wedding/PricingSection";
import { BookingForm } from "./wedding/BookingForm";
import { useBookingForm } from "../hooks/useBookingForm";

export const WeddingBookingRefactored: React.FC = () => {
  const {
    showBookingForm,
    bookingStep,
    formData,
    openBookingForm,
    closeBookingForm,
    updateFormData,
    nextStep,
    prevStep,
    canProceed,
  } = useBookingForm();

  const handleHowItWorks = () => {
    // TODO: Implement how it works functionality
    console.log("How it works clicked");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        onGetStarted={openBookingForm}
        onHowItWorks={handleHowItWorks}
      />

      {/* Pricing Section */}
      <PricingSection onLearnMore={openBookingForm} />

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={showBookingForm}
        step={bookingStep}
        formData={formData}
        onClose={closeBookingForm}
        onNext={nextStep}
        onPrev={prevStep}
        onUpdateData={updateFormData}
        canProceed={canProceed}
      />
    </div>
  );
};
