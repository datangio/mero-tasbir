import React from "react";
import { HeroSection } from "./wedding/HeroSection";
import { BookingCategories } from "./wedding/BookingCategories";
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

  const handleGetStarted = () => {
    openBookingForm();
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log('Selected category:', categoryId);
    // You can add navigation or other logic here
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        onGetStarted={handleGetStarted}
      />

  

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={showBookingForm}
        step={bookingStep}
        formData={formData}
        onClose={closeBookingForm}
        onNext={nextStep}
        onPrev={prevStep}
        onUpdateData={updateFormData}
        canProceed={canProceed()}
      />
    </div>
  );
};
